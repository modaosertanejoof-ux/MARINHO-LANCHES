'use client'
import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const RESTAURANT = {
  id:'mock-1', name:'Marinho Lanches', slug:'marinholanches', slogan:'Seu lanche. Seu momento. Seu Marinho.',
  description:'Lanches artesanais com sabor de mar e churrasco.',
  logo:'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=200',
  coverImage:'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200',
  whatsapp:'5518997124384', deliveryFee:6, minOrder:25
}
const CATEGORIES = [
  {id:'c1', name:'Hambúrgueres'}, {id:'c2', name:'Porções'}, {id:'c3', name:'Bebidas'}, {id:'c4', name:'Combos'},
]
const PRODUCTS = [
  {id:'p1', categoryId:'c1', name:'X-Salada', price:21.9, description:'Pão brioche, hambúrguer 160g, queijo, alface, tomate', image:'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=400'},
  {id:'p2', categoryId:'c1', name:'X-Bacon', price:24.9, description:'Pão brioche, hambúrguer 160g, queijo, bacon crocante', image:'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400'},
  {id:'p3', categoryId:'c1', name:'X-Tudo', price:29.9, description:'O brabo: 2 carnes, queijo, bacon, ovo, salada', image:'https://images.unsplash.com/photo-1593246049226-ded77bf90326?w=400'},
  {id:'p4', categoryId:'c2', name:'Batata P', price:10, description:'Batata frita crocante 200g', image:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400'},
  {id:'p5', categoryId:'c2', name:'Batata G', price:16, description:'Batata frita crocante 400g', image:'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400'},
  {id:'p6', categoryId:'c3', name:'Coca-Cola', price:6, description:'Lata 350ml gelada', image:'https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?w=400'},
  {id:'p7', categoryId:'c3', name:'Guaraná', price:5, description:'Lata 350ml', image:'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400'},
  {id:'p8', categoryId:'c3', name:'Água', price:3, description:'Garrafa 500ml', image:'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400'},
  {id:'p9', categoryId:'c4', name:'Combo X-Bacon', price:34.9, description:'X-Bacon + Batata P + Coca-Cola', image:'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400'},
  {id:'p10', categoryId:'c4', name:'Combo X-Tudo', price:39.9, description:'X-Tudo + Batata P + Coca-Cola', image:'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=400'},
]
const ADDONS = [
  {id:'a1', name:'Bacon extra', price:5},
  {id:'a2', name:'Queijo', price:3},
  {id:'a3', name:'Ovo', price:2.5},
  {id:'a4', name:'Hambúrguer extra', price:8},
]

export default function MarinhoLanchesPage(){
  const [search,setSearch]=useState('')
  const [activeCat,setActiveCat]=useState('all')
  const [selected,setSelected]=useState<any>(null)
  const [cart,setCart]=useState<any[]>([])
  const [showCart,setShowCart]=useState(false)
  const [selAddons,setSelAddons]=useState<any[]>([])
  const [qty,setQty]=useState(1)
  const router = useRouter()

  useEffect(()=>{
    try{ const s=localStorage.getItem('lf_cart_marinholanches'); if(s) setCart(JSON.parse(s)) }catch{}
  },[])
  useEffect(()=>{ localStorage.setItem('lf_cart_marinholanches', JSON.stringify(cart)) },[cart])

  const filtered = useMemo(()=>{
    let list=PRODUCTS
    if(activeCat!=='all') list=list.filter(p=>p.categoryId===activeCat)
    if(search) list=list.filter(p=>p.name.toLowerCase().includes(search.toLowerCase()))
    return list
  },[activeCat,search])

  const addToCart = (product:any)=>{
    const newItem = {productId:product.id, name:product.name, price:product.price, image:product.image, quantity:qty, addons:selAddons}
    setCart(c=>[...c,newItem])
    setSelected(null); setSelAddons([]); setQty(1)
  }
  const totalItems = cart.reduce((s,i)=>s+i.quantity,0)
  const subtotal = cart.reduce((s,i)=> s + (i.price + i.addons.reduce((a:any,b:any)=>a+b.price,0))*i.quantity,0)

  return (
    <main className="min-h-screen bg-[#fffaf5] pb-24">
      <div className="relative">
        <img src={RESTAURANT.coverImage} alt="capa" className="w-full h-48 md:h-72 object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>
        <div className="absolute bottom-4 left-4 right-4 flex gap-3 items-end">
          <img src={RESTAURANT.logo} className="w-20 h-20 rounded-2xl border-4 border-white object-cover bg-white"/>
          <div className="text-white pb-1">
            <h1 className="text-2xl font-black leading-none">{RESTAURANT.name}</h1>
            <p className="text-sm opacity-90">{RESTAURANT.slogan}</p>
            <div className="mt-1 flex gap-2 text-xs"><span className="px-2 py-1 rounded-full bg-green-500 font-bold">Aberto</span><span className="px-2 py-1 rounded-full bg-white/20">Entrega R$ {RESTAURANT.deliveryFee.toFixed(2).replace('.',',')} • Mínimo R$ {RESTAURANT.minOrder}</span></div>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-40 bg-[#fffaf5]/90 backdrop-blur border-b">
        <div className="max-w-3xl mx-auto px-4 py-3 flex gap-2">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar no cardápio..." className="flex-1 px-4 py-2 rounded-full border bg-white outline-none"/>
          <button onClick={()=>setShowCart(true)} className="px-5 py-2 rounded-full bg-zinc-900 text-white font-bold">Carrinho {totalItems>0 && <span className="ml-1 bg-orange-500 px-2 rounded-full text-xs">{totalItems}</span>}</button>
        </div>
        <div className="max-w-3xl mx-auto px-4 pb-3 flex gap-2 overflow-auto">
          <button onClick={()=>setActiveCat('all')} className={`px-4 py-1.5 rounded-full text-sm font-bold border whitespace-nowrap ${activeCat==='all'?'bg-zinc-900 text-white':'bg-white'}`}>Todos</button>
          {CATEGORIES.map(c=> <button key={c.id} onClick={()=>setActiveCat(c.id)} className={`px-4 py-1.5 rounded-full text-sm font-bold border whitespace-nowrap ${activeCat===c.id?'bg-zinc-900 text-white':'bg-white'}`}>{c.name}</button>)}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 grid gap-3">
        {filtered.map(p=> (
          <div key={p.id} className="bg-white rounded-2xl border overflow-hidden flex gap-3 p-3">
            <img src={p.image} alt={p.name} className="w-20 h-20 rounded-xl object-cover shrink-0"/>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold truncate">{p.name}</h3>
              <p className="text-xs text-zinc-500 line-clamp-2">{p.description}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-black text-orange-600">R$ {p.price.toFixed(2).replace('.',',')}</span>
                <button onClick={()=>{setSelected(p); setQty(1); setSelAddons([])}} className="px-3 py-1.5 rounded-full bg-zinc-900 text-white text-xs font-bold">Adicionar</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={()=>setSelected(null)}/>
          <div className="relative bg-white w-full md:max-w-lg rounded-t-[2rem] md:rounded-2xl max-h-[90vh] overflow-auto">
            <img src={selected.image} className="w-full h-56 object-cover"/>
            <button onClick={()=>setSelected(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white grid place-items-center">✕</button>
            <div className="p-5">
              <h2 className="text-2xl font-black">{selected.name}</h2>
              <p className="text-zinc-600 mt-1">{selected.description}</p>
              <div className="mt-4"><h3 className="font-bold">Adicionais</h3>
                <div className="mt-2 space-y-2">
                  {ADDONS.map(a=>{
                    const active = selAddons.find(x=>x.id===a.id)
                    return (
                      <label key={a.id} className={`flex justify-between items-center p-3 rounded-xl border cursor-pointer ${active?'border-orange-500 bg-orange-50':''}`}>
                        <span className="flex items-center gap-2"><input type="checkbox" checked={!!active} onChange={()=> setSelAddons(s=> s.find(x=>x.id===a.id) ? s.filter(x=>x.id!==a.id) : [...s,a]) }/>{a.name}</span>
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
                <button onClick={()=>addToCart(selected)} className="flex-1 py-3 rounded-full bg-zinc-900 text-white font-black">Adicionar • R$ {((selected.price + selAddons.reduce((s,a)=>s+a.price,0))*qty).toFixed(2).replace('.',',')}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCart && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setShowCart(false)}/>
          <div className="absolute bottom-0 left-0 right-0 md:right-0 md:left-auto md:top-0 md:w-[420px] bg-white rounded-t-[2rem] md:rounded-none flex flex-col max-h-[90vh] h-full">
            <div className="p-5 border-b flex justify-between"><h2 className="font-black">Seu carrinho</h2><button onClick={()=>setShowCart(false)} className="w-8 h-8 rounded-full bg-zinc-100 grid place-items-center">✕</button></div>
            <div className="flex-1 overflow-auto p-4 space-y-3">
              {cart.map((it,i)=> <div key={i} className="border rounded-xl p-3 flex gap-3"><img src={it.image} className="w-14 h-14 rounded-lg object-cover"/><div className="flex-1"><div className="font-bold text-sm">{it.name} x{it.quantity}</div><div className="text-xs text-zinc-500">{it.addons.map((a:any)=>a.name).join(', ')}</div></div></div>)}
              {cart.length===0 && <p className="text-center py-10 text-zinc-500">Carrinho vazio</p>}
            </div>
            <div className="p-4 border-t bg-[#fffaf5] space-y-2">
              <div className="flex justify-between font-black text-lg"><span>Total</span><span>R$ {(subtotal+RESTAURANT.deliveryFee).toFixed(2).replace('.',',')}</span></div>
              <button onClick={()=>router.push('/marinholanches/checkout')} disabled={cart.length===0} className="w-full py-4 rounded-full bg-zinc-900 text-white font-black disabled:opacity-40">Continuar</button>
            </div>
          </div>
        </div>
      )}

      {totalItems>0 && !showCart && !selected && (
        <div className="fixed bottom-4 left-4 right-4 max-w-3xl mx-auto">
          <button onClick={()=>setShowCart(true)} className="w-full py-4 rounded-full bg-zinc-900 text-white font-black shadow-2xl flex justify-between px-6">
            <span>{totalItems} itens</span><span>R$ {(subtotal+RESTAURANT.deliveryFee).toFixed(2).replace('.',',')}</span>
          </button>
        </div>
      )}
    </main>
  )
}
