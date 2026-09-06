import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
export async function POST(req:NextRequest){
  try{
    const body = await req.json()
    const {slug, items, ...orderData} = body
    let restaurant
    try{ restaurant = await prisma.restaurant.findUnique({where:{slug}}) }catch{ return NextResponse.json({error:'DB não configurado', ...orderData, items}, {status:200}) }
    if(!restaurant) return NextResponse.json({error:'Loja não encontrada'}, {status:404})
    const products = await prisma.product.findMany({where:{restaurantId:restaurant.id}})
    const productMap = new Map(products.map(p=>[p.id,p]))
    let subtotal=0
    for(const it of items){
      const p = productMap.get(it.productId)
      if(!p) continue
      let addonsTotal = it.addons?.reduce((s:any,a:any)=>s+a.price*a.qty,0) || 0
      subtotal += (p.price+addonsTotal)*it.quantity
    }
    if(subtotal < restaurant.minOrder) return NextResponse.json({error:`Pedido mínimo R$ ${restaurant.minOrder}`},{status:400})
    let discount=0
    if(body.couponCode){
      const coupon = await prisma.coupon.findFirst({where:{restaurantId:restaurant.id, code:body.couponCode.toUpperCase(), isActive:true}})
      if(coupon && (!coupon.expiresAt || coupon.expiresAt>new Date())){
        discount = coupon.type==='percentual' ? subtotal*(coupon.value/100) : coupon.value
      }
    }
    const order = await prisma.order.create({
      data:{
        restaurantId:restaurant.id,
        customerName:orderData.customerName,
        customerPhone:orderData.customerPhone,
        address:orderData.address,
        number:orderData.number,
        neighborhood:orderData.neighborhood,
        complement:orderData.complement,
        reference:orderData.reference,
        paymentMethod:orderData.paymentMethod,
        changeFor:orderData.changeFor,
        subtotal,
        deliveryFee:restaurant.deliveryFee,
        discount,
        total: subtotal + restaurant.deliveryFee - discount,
        status:'aguardando',
        items:{create: items.map((it:any)=>({
          productId: it.productId,
          productName: it.productName,
          quantity: it.quantity,
          unitPrice: productMap.get(it.productId)?.price || it.unitPrice,
          subtotal: (productMap.get(it.productId)?.price || it.unitPrice)*it.quantity,
          addons:{create: (it.addons||[]).map((a:any)=>({addonName:a.addonName, price:a.price}))}
        }))}
      }, include:{items:{include:{addons:true}}}
    })
    return NextResponse.json(order)
  }catch(e:any){ return NextResponse.json({error:e.message},{status:500}) }
}
