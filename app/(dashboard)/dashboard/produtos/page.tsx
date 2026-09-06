'use client'
import { useState } from 'react'
import { MOCK_PRODUCTS } from '@/lib/store-data'
export default function Produtos(){
  const [list,setList]=useState(MOCK_PRODUCTS)
  return (
    <div>
      <div className="flex justify-between"><h1 className="text-2xl font-black">Produtos - Marinho Lanches</h1><button className="px-4 py-2 rounded-full bg-zinc-900 text-white font-bold">+ Novo Produto</button></div>
      <div className="mt-6 grid gap-3">
        {list.map(p=> (
          <div key={p.id} className="bg-white p-3 rounded-2xl border flex gap-3 items-center">
            <img src={p.image} className="w-16 h-16 rounded-xl object-cover"/>
            <div className="flex-1"><div className="font-bold">{p.name}</div><div className="text-sm text-zinc-500">R$ {p.price.toFixed(2).replace('.',',')} • {p.isActive?'Ativo':'Inativo'}</div></div>
            <button className="px-3 py-1 rounded-full border text-sm">Editar</button>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-orange-50 rounded-xl text-sm">Conecte com API: POST /api/products com restaurantId = isolamento multi-tenant no servidor.</div>
    </div>
  )
}
