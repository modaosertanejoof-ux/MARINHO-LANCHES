import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
export async function GET(req:NextRequest){
  const slug = req.nextUrl.searchParams.get('slug')||''
  const code = (req.nextUrl.searchParams.get('code')||'').toUpperCase()
  try{
    const restaurant = await prisma.restaurant.findUnique({where:{slug}})
    if(!restaurant) return NextResponse.json({valid:false, message:'Loja não encontrada'})
    const coupon = await prisma.coupon.findFirst({where:{restaurantId:restaurant.id, code}})
    if(!coupon || !coupon.isActive) return NextResponse.json({valid:false, message:'Cupom inválido'})
    if(coupon.expiresAt && coupon.expiresAt < new Date()) return NextResponse.json({valid:false, message:'Cupom expirado'})
    return NextResponse.json({valid:true, discount:coupon.value, type:coupon.type, value:coupon.value})
  }catch{
    if(code==='MARINHO10') return NextResponse.json({valid:true, discount:5, type:'fixo', value:5})
    return NextResponse.json({valid:false, message:'Cupom inválido (fallback)'})
  }
}
