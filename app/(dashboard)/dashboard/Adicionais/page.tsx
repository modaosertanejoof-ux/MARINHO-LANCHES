'use client'
import { MOCK_ADDONS } from '@/lib/store-data'
export default function Adicionais(){
  return (
    <div><h1 className="text-2xl font-black">Adicionais - Marinho Lanches</h1>
      <div className="mt-6 grid gap-2">
        {MOCK_ADDONS.map(a=> <div key={a.id} className="bg-white p-4 rounded-xl border flex justify-between"><span>{a.name}</span><span className="font-bold">R$ {a.price.toFixed(2).replace('.',',')}</span></div>)}
      </div>
      <button className="mt-4 w-full py-3 rounded-full bg-zinc-900 text-white font-bold">+ Novo Adicional</button>
    </div>
  )
}
