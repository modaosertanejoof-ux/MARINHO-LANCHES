'use client'
export default function Categorias(){
  return (
    <div><h1 className="text-2xl font-black">Categorias</h1>
      <div className="mt-6 bg-white p-6 rounded-2xl border">
        <div className="flex justify-between"><span>Lista com drag para ordenar (order field)</span><button className="px-4 py-2 rounded-full bg-zinc-900 text-white">+ Nova</button></div>
        <div className="mt-4 space-y-2">
          {['Hambúrgueres','Porções','Bebidas','Combos'].map(c=> <div key={c} className="flex justify-between p-3 border rounded-xl"><span>{c}</span><span className="text-sm">Ativa • Arrastar ::</span></div>)}
        </div>
      </div>
    </div>
  )
}
