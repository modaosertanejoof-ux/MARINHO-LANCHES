'use client'
import { useState, useMemo, useEffect } from 'react'
import { ProductCard } from '@/components/ProductCard'
import { ProductModal } from '@/components/ProductModal'
import { CartDrawer } from '@/components/CartDrawer'
import { useRouter } from 'next/navigation'

export default function StoreClient({restaurant, categories, products, addons}:{restaurant:any,categories:any[],products:any[],addons:any[]}){
  const [search,setSearch]=useState('')
  const [activeCat,setActiveCat]=useState<string>('all')
  const [selected,setSelected]=useState<any>(null)
  const [cart,setCart]=useState<any[]>(()=>{
    if(typeof window!=='undefined'){ try{ return JSON.parse(localStorage.getItem('lf_cart_'+restaurant.slug)||'[]')}catch{return []} } return []
  })
  const [showCart,setShowCart]=useState(false)
  const router = useRouter()
  useEffect(()=>{ localStorage.setItem('lf_cart_'+restaurant.slug, JSON.stringify(cart)) },[cart])
  const filtered = useMemo(()=>{
    let list=products
    if(activeCat!=='all') list=list.filter((p:any)=>p.categoryId===activeCat)
    if(search) list=list.filter((p:any)=> p.name.toLowerCase().includes(search.toLowerCase()))
    return list
  },[products,activeCat,search])
  const addToCart = (product:any, qty:number, selAddons:any[])=>{
    setCart((c:any[])=>{
      const addonKey = selAddons.map(a=>a.id).sort().join(',')
      const existing = c.findIndex(it=> it.productId===product.id && it.addons.map((a:any)=>a.id).sort().join(',')===addonKey)
      if(existing>=0){
        const copy=[...c]; copy[existing].quantity+=qty; return copy
      }
      return [...c,{productId:product.id, name:product.name, price:product.price, image:product.image, quantity:qty, addons:selAddons}]
    })
    setSelected(null)
  }
  const updateQty = (id:string, d:number)=>{
    setCart(c=> c.map(it=> it.productId===id? {...it, quantity: Math.max(0,it.quantity+d)}:it).filter(it=>it.quantity>0))
  }
  const totalItems = cart.reduce((s,it)=>s+it.quantity,0)
  const subtotal = cart.reduce((s,it)=> s + (it.price + it.addons.reduce((a:any,b:any)=>a+b.price*b.qty,0))*it.quantity,0)
  return (
    <main className="min-h-screen bg-[#fffaf5] pb-24">
      <div className="relative">
        <img src={restaurant.coverImage} alt="capa" className="w-full h-48 md:h-72 object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>
        <div className="absolute bottom-4 left-4 right-4 flex gap-3 items-end">
          <img src={restaurant.logo} className="w-20 h-20 rounded-2xl border-4 border-white object-cover bg-white"/>
          <div className="text-white pb-1">
            <h1 className="text-2xl font-black leading-none">{restaurant.name}</h1>
            <p className="text-sm opacity-90">{restaurant.slogan}</p>
            <div className="mt-1 flex gap-2 text-xs"><span className="px-2 py-1 rounded-full bg-green-500 font-bold">Aberto</span><span className="px-2 py-1 rounded-full bg-white/20">Entrega R$ {restaurant.deliveryFee?.toFixed(2).replace('.',',')} • Mínimo R$ {restaurant.minOrder}</span></div>
          </div>
        </div>
      </div>
      <div className="sticky top-0 z-40 bg-[#fffaf5]/90 backdrop-blur border-b">
        <div className="max-w-3xl mx-auto px-4 py-3 flex gap-2 overflow-auto">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar no cardápio..." className="flex-1 px-4 py-2 rounded-full border bg-white outline-none"/>
          <button onClick={()=>setShowCart(true)} className="relative px-5 py-2 rounded-full bg-zinc-900 text-white font-bold">Carrinho {totalItems>0 && <span className="ml-1 bg-orange-500 text-white px-2 rounded-full text-xs">{totalItems}</span>}</button>
        </div>
        <div className="max-w-3xl mx-auto px-4 pb-3 flex gap-2 overflow-auto">
          <button onClick={()=>setActiveCat('all')} className={`px-4 py-1.5 rounded-full text-sm font-bold border whitespace-nowrap ${activeCat==='all'?'bg-zinc-900 text-white':'bg-white'}`}>Todos</button>
          {categories.map((c:any)=> <button key={c.id} onClick={()=>setActiveCat(c.id)} className={`px-4 py-1.5 rounded-full text-sm font-bold border whitespace-nowrap ${activeCat===c.id?'bg-zinc-900 text-white':'bg-white'}`}>{c.name}</button>)}
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-6 grid gap-3">
        {filtered.map((p:any)=> <ProductCard key={p.id} product={p} onAdd={()=>setSelected(p)}/>)}
      </div>
      {totalItems>0 &&!showCart && (
        <div className="fixed bottom-4 left-4 right-4 max-w-3xl mx-auto">
          <button onClick={()=>setShowCart(true)} className="w-full py-4 rounded-full bg-zinc-900 text-white font-black shadow-2xl flex justify-between px-6">
            <span>{totalItems} itens</span><span>R$ {(subtotal+restaurant.deliveryFee).toFixed(2).replace('.',',')}</span>
          </button>
        </div>
      )}
      {selected && <ProductModal product={selected} addons={addons} onClose={()=>setSelected(null)} onAdd={(q,a)=>addToCart(selected,q,a)}/>}
      {showCart && <CartDrawer items={cart} deliveryFee={restaurant.deliveryFee} onClose={()=>setShowCart(false)} onUpdateQty={updateQty} onCheckout={()=>{ setShowCart(false); router.push(`/${restaurant.slug}/checkout`) }}/>}
    </main>
  )
}
