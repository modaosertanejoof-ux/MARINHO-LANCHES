'use client'
export function ProductCard({product, onAdd}:{product:any, onAdd:()=>void}){
  return (
    <div className="bg-white rounded-2xl border overflow-hidden flex gap-3 p-3">
      <img src={product.image} alt={product.name} className="w-20 h-20 rounded-xl object-cover shrink-0"/>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold truncate">{product.name}</h3>
        <p className="text-xs text-zinc-500 line-clamp-2">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-black text-orange-600">R$ {Number(product.price).toFixed(2).replace('.',',')}</span>
          <button onClick={onAdd} className="px-3 py-1.5 rounded-full bg-zinc-900 text-white text-xs font-bold">Adicionar</button>
        </div>
      </div>
    </div>
  )
}
