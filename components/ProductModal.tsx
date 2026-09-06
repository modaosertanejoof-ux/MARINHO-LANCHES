'use client'
import { useState } from 'react'
import { MOCK_ADDONS } from '@/lib/store-data'
export function ProductModal({product, addons, onClose, onAdd}:{product:any, addons:any[], onClose:()=>void, onAdd:(qty:number, selected:any[])=>void}){
  const [qty,setQty]=useState(1)
  const [sel,setSel]=useState<any[]>([])
  const toggle = (a:any)=>{
    setSel(s=>{
      const ex=s.find(x=>x.id===a.id)
      if(ex) return s.filter(x=>x.id!==a.id)
      return [...s,{...a, qty:1}]
    })
  }
  const total = (product.price + sel.reduce((s,a)=>s+a.price*a.qty,0))*qty
  return (
    <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}/>
      <div className="relative bg-white w-full md:max-w-lg rounded-t-[2rem] md:rounded-2xl max-h-[90vh] overflow-auto">
        <img src={product.image} className="w-full h-56 object-cover"/>
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white grid place-items-center">✕</button>
        <div className="p-5">
          <h2 className="text-2xl font-black">{product.name}</h2>
          <p className="text-zinc-600 mt-1">{product.description}</p>
          <div className="mt-4"><h3 className="font-bold">Adicionais</h3>
            <div className="mt-2 space-y-2">
              {(addons||MOCK_ADDONS).map((a:any)=> {
                const active = sel.find(x=>x.id===a.id)
                return (
                  <label key={a.id} className={`flex justify-between items-center p-3 rounded-xl border cursor-pointer ${active?'border-orange-500 bg-orange-50':''}`}>
                    <span className="flex items-center gap-2"><input type="checkbox" checked={!!active} onChange={()=>toggle(a)}/>{a.name}</span>
                    <span className="font-bold">+ R$ {a.price.toFixed(2).replace('.',',')}</span>
                  </label>
                )
              })}
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center gap-2 border rounded-full px-2 py-1">
              <button onClick={()=>setQty(Math.max(1,qty-1))} className="w-8 h-8 grid place-items-center">-</button>
              <span className="font-bold w-6 text-center">{qty}</span>
              <button onClick={()=>setQty(qty+1)} className="w-8 h-8 grid place-items-center">+</button>
            </div>
            <button onClick={()=>onAdd(qty,sel)} className="flex-1 py-3 rounded-full bg-zinc-900 text-white font-black">Adicionar • R$ {total.toFixed(2).replace('.',',')}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
