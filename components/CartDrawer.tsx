'use client'
import { calcItemSubtotal, calcCartTotals } from '@/lib/cart'
export function CartDrawer({items, deliveryFee, onClose, onUpdateQty, onCheckout}:{items:any[], deliveryFee:number, onClose:()=>void, onUpdateQty:(id:string, d:number)=>void, onCheckout:()=>void}){
  const totals = calcCartTotals(items, deliveryFee)
  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}/>
      <div className="absolute bottom-0 left-0 right-0 md:right-0 md:left-auto md:top-0 md:w-[420px] bg-white rounded-t-[2rem] md:rounded-none flex flex-col max-h-[90vh] md:max-h-none md:h-full">
        <div className="p-5 border-b flex justify-between items-center"><h2 className="font-black text-lg">Seu carrinho</h2><button onClick={onClose} className="w-8 h-8 rounded-full bg-zinc-100 grid place-items-center">✕</button></div>
        <div className="flex-1 overflow-auto p-4 space-y-3">
          {items.length===0 && <p className="text-center py-10 text-zinc-500">Carrinho vazio</p>}
          {items.map((it:any)=> (
            <div key={it.productId+JSON.stringify(it.addons)} className="border rounded-xl p-3 flex gap-3">
              <img src={it.image} className="w-14 h-14 rounded-lg object-cover"/>
              <div className="flex-1">
                <div className="font-bold text-sm">{it.name}</div>
                {it.addons?.map((a:any)=> <div key={a.id} className="text-xs text-zinc-500">{a.qty}x {a.name}</div>)}
                <div className="mt-1 flex items-center gap-2">
                  <button onClick={()=>onUpdateQty(it.productId,-1)} className="w-7 h-7 rounded-full border grid place-items-center">-</button>
                  <span className="text-sm font-bold">{it.quantity}</span>
                  <button onClick={()=>onUpdateQty(it.productId,1)} className="w-7 h-7 rounded-full border grid place-items-center">+</button>
                  <span className="ml-auto font-black text-sm">R$ {calcItemSubtotal(it).toFixed(2).replace('.',',')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t bg-[#fffaf5] space-y-2">
          <div className="flex justify-between text-sm"><span>Subtotal</span><span>R$ {totals.subtotal.toFixed(2).replace('.',',')}</span></div>
          <div className="flex justify-between text-sm"><span>Entrega</span><span>R$ {totals.deliveryFee.toFixed(2).replace('.',',')}</span></div>
          <div className="flex justify-between font-black text-lg"><span>Total</span><span>R$ {totals.total.toFixed(2).replace('.',',')}</span></div>
          <button onClick={onCheckout} disabled={items.length===0} className="w-full py-4 rounded-full bg-zinc-900 text-white font-black disabled:opacity-40">Continuar para checkout</button>
        </div>
      </div>
    </div>
  )
}
