'use client'
import { useEffect, useState } from 'react'
export default function Pedidos(){
  const [orders,setOrders]=useState<any[]>([
    {id:'1', customerName:'João', total:70.8, paymentMethod:'pix', status:'aguardando', createdAt:new Date().toISOString()},
    {id:'2', customerName:'Maria', total:39.9, paymentMethod:'dinheiro', status:'preparando', createdAt:new Date().toISOString()},
  ])
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('lf_user')||'{}')
    const slug = user.restaurant?.slug || 'marinholanches'
    fetch(`/api/orders?slug=${slug}`).then(r=>r.json()).then(d=>{ if(Array.isArray(d)&&d.length) setOrders(d) }).catch(()=>{})
  },[])
  const updateStatus = (id:string, status:string)=> setOrders(o=>o.map(x=>x.id===id?{...x,status}:x))
  return (
    <div>
      <h1 className="text-2xl font-black">Pedidos - Marinho Lanches</h1>
      <div className="mt-6 space-y-3">
        {orders.map(o=> (
          <div key={o.id} className="bg-white p-4 rounded-2xl border flex justify-between items-center">
            <div><div className="font-bold">#{o.id.slice(0,6)} - {o.customerName}</div><div className="text-sm text-zinc-500">{new Date(o.createdAt).toLocaleTimeString()} • {o.paymentMethod} • R$ {o.total}</div></div>
            <select value={o.status} onChange={e=>updateStatus(o.id, e.target.value)} className="px-3 py-2 rounded-full border text-sm font-bold">
              <option value="aguardando">Aguardando</option><option value="recebido">Recebido</option><option value="preparando">Preparando</option><option value="saiu_para_entrega">Saiu p/ entrega</option><option value="concluido">Concluído</option><option value="cancelado">Cancelado</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}
