'use client'
import { useState, useEffect } from 'react'
import { calcCartTotals } from '@/lib/cart'
import { buildWhatsAppMessage } from '@/lib/whatsapp'

export default function CheckoutClient({restaurant}:{restaurant:any}){
  const [cart,setCart]=useState<any[]>([])
  const [form,setForm]=useState({name:'', phone:'', address:'', number:'', neighborhood:'', complement:'', reference:'', payment:'pix', changeFor:'', coupon:''})
  const [loading,setLoading]=useState(false)
  const [discount,setDiscount]=useState(0)
  useEffect(()=>{
    const data = localStorage.getItem('lf_cart_'+restaurant.slug)
    if(data) setCart(JSON.parse(data))
  },[])
  const totals = calcCartTotals(cart, restaurant.deliveryFee, discount)
  const validate = ()=>{
    if(!form.name || !form.phone || !form.address || !form.number || !form.neighborhood) return 'Preencha todos os campos obrigatórios'
    if(cart.length===0) return 'Carrinho vazio'
    if(totals.subtotal < restaurant.minOrder) return `Pedido mínimo R$ ${restaurant.minOrder}`
    if(form.payment==='dinheiro' && !form.changeFor) return 'Informe troco para'
    return null
  }
  const handleSubmit = async ()=>{
    const err = validate()
    if(err){ alert(err); return }
    setLoading(true)
    try{
      const order = {
        restaurantId:restaurant.id,
        customerName:form.name,
        customerPhone:form.phone,
        address:form.address,
        number:form.number,
        neighborhood:form.neighborhood,
        complement:form.complement,
        reference:form.reference,
        paymentMethod:form.payment,
        changeFor:form.changeFor? parseFloat(form.changeFor):null,
        subtotal:totals.subtotal,
        deliveryFee:totals.deliveryFee,
        discount,
        total:totals.total,
        items:cart.map((it:any)=>({productId:it.productId, productName:it.name, quantity:it.quantity, unitPrice:it.price, subtotal:(it.price+it.addons.reduce((s:any,a:any)=>s+a.price*a.qty,0))*it.quantity, addons:it.addons.map((a:any)=>({addonName:a.name, price:a.price, qty:a.qty}))}))
      }
      let saved:any = order
      try{
        const res = await fetch('/api/orders', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({slug:restaurant.slug, ...order, couponCode:form.coupon})})
        if(res.ok) saved = await res.json()
      }catch{}
      const msg = buildWhatsAppMessage(saved, restaurant)
      const waUrl = `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(msg)}`
      localStorage.removeItem('lf_cart_'+restaurant.slug)
      window.open(waUrl,'_blank')
      alert('Pedido enviado! Você será redirecionado para o WhatsApp.')
      window.location.href=`/${restaurant.slug}`
    }catch(e:any){ alert('Erro: '+e.message) }
    finally{ setLoading(false) }
  }
  const applyCoupon = async ()=>{
    if(!form.coupon) return
    try{
      const res = await fetch(`/api/coupons/validate?slug=${restaurant.slug}&code=${form.coupon}`)
      const data = await res.json()
      if(data.valid){ setDiscount(data.discount); alert('Cupom aplicado!') } else alert(data.message)
    }catch{
      if(form.coupon.toLowerCase()==='marinho10'){ setDiscount(totals.subtotal*0.1); alert('Cupom MARINHO10: 10%') } else alert('Cupom inválido')
    }
  }
  return (
    <main className="min-h-screen bg-white max-w-3xl mx-auto">
      <div className="p-4 border-b flex gap-3 items-center"><a href={`/${restaurant.slug}`} className="w-9 h-9 rounded-full border grid place-items-center">←</a><h1 className="font-black text-xl">Checkout - {restaurant.name}</h1></div>
      <div className="p-4 space-y-6">
        <section className="space-y-3"><h2 className="font-bold">Dados do cliente</h2>
          <input placeholder="Nome completo *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full px-4 py-3 rounded-xl border"/>
          <input placeholder="WhatsApp *" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="w-full px-4 py-3 rounded-xl border"/>
        </section>
        <section className="space-y-3"><h2 className="font-bold">Endereço de entrega</h2>
          <input placeholder="Rua *" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} className="w-full px-4 py-3 rounded-xl border"/>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Número *" value={form.number} onChange={e=>setForm({...form,number:e.target.value})} className="w-full px-4 py-3 rounded-xl border"/>
            <input placeholder="Bairro *" value={form.neighborhood} onChange={e=>setForm({...form,neighborhood:e.target.value})} className="w-full px-4 py-3 rounded-xl border"/>
          </div>
          <input placeholder="Complemento" value={form.complement} onChange={e=>setForm({...form,complement:e.target.value})} className="w-full px-4 py-3 rounded-xl border"/>
          <input placeholder="Ponto de referência" value={form.reference} onChange={e=>setForm({...form,reference:e.target.value})} className="w-full px-4 py-3 rounded-xl border"/>
        </section>
        <section className="space-y-3"><h2 className="font-bold">Pagamento</h2>
          <div className="grid grid-cols-3 gap-2">
            {['pix','dinheiro','cartao'].map(p=> <button key={p} onClick={()=>setForm({...form,payment:p})} className={`py-3 rounded-xl border font-bold capitalize ${form.payment===p?'bg-zinc-900 text-white':'bg-white'}`}>{p}</button>)}
          </div>
          {form.payment==='dinheiro' && <input placeholder="Troco para R$ *" value={form.changeFor} onChange={e=>setForm({...form,changeFor:e.target.value})} className="w-full px-4 py-3 rounded-xl border"/>}
          <div className="flex gap-2">
            <input placeholder="Cupom" value={form.coupon} onChange={e=>setForm({...form,coupon:e.target.value})} className="flex-1 px-4 py-3 rounded-xl border"/>
            <button onClick={applyCoupon} className="px-5 rounded-xl bg-orange-500 text-white font-bold">Aplicar</button>
          </div>
        </section>
        <section className="bg-[#fffaf5] p-4 rounded-2xl space-y-2"><h2 className="font-bold">Resumo</h2>
          {cart.map((it:any)=> <div key={it.productId} className="flex justify-between text-sm"><span>{it.quantity}x {it.name}</span><span>R$ {((it.price+it.addons.reduce((s:any,a:any)=>s+a.price*a.qty,0))*it.quantity).toFixed(2).replace('.',',')}</span></div>)}
          <div className="border-t pt-2 space-y-1 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>R$ {totals.subtotal.toFixed(2).replace('.',',')}</span></div>
            <div className="flex justify-between"><span>Entrega</span><span>R$ {totals.deliveryFee.toFixed(2).replace('.',',')}</span></div>
            {discount>0 && <div className="flex justify-between text-green-600"><span>Desconto</span><span>- R$ {discount.toFixed(2).replace('.',',')}</span></div>}
            <div className="flex justify-between font-black text-lg"><span>Total</span><span>R$ {totals.total.toFixed(2).replace('.',',')}</span></div>
          </div>
        </section>
        <button onClick={handleSubmit} disabled={loading} className="w-full py-4 rounded-full bg-green-600 text-white font-black text-lg disabled:opacity-50">{loading?'Enviando...':'ENVIAR PEDIDO PELO WHATSAPP'}</button>
      </div>
    </main>
  )
}
