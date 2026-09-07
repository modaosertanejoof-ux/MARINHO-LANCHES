'use client'
import { useState } from 'react'

export default function Page(){
  const [cart,setCart]=useState<any[]>([])
  const products = [
    {id:1, name:'X-Salada', price:21.90, desc:'Pão brioche, burger 160g, queijo, salada'},
    {id:2, name:'X-Bacon', price:24.90, desc:'Com bacon crocante'},
    {id:3, name:'X-Tudo', price:29.90, desc:'2 carnes, queijo, bacon, ovo'},
  ]
  const add = (p:any)=> setCart([...cart,p])
  const total = cart.reduce((s,i)=>s+i.price,0)
  return (
    <main style={{fontFamily:'sans-serif', padding:20, maxWidth:600, margin:'0 auto', background:'#fffaf5', minHeight:'100vh'}}>
      <h1 style={{fontSize:32, fontWeight:900}}>🦐 Marinho Lanches</h1>
      <p>Seu lanche. Seu momento. Seu Marinho.</p>
      <div style={{background:'#22c55e', color:'white', display:'inline-block', padding:'4px 12px', borderRadius:20, fontSize:12, marginTop:8}}>Aberto • Entrega R$ 6,00</div>
      <div style={{marginTop:24, display:'grid', gap:12}}>
        {products.map(p=> (
          <div key={p.id} style={{background:'white', border:'1px solid #eee', borderRadius:16, padding:16, display:'flex', justifyContent:'space-between'}}>
            <div><b>{p.name}</b><div style={{fontSize:12, color:'#666'}}>{p.desc}</div><div style={{fontWeight:900, color:'#ea580c', marginTop:4}}>R$ {p.price.toFixed(2).replace('.',',')}</div></div>
            <button onClick={()=>add(p)} style={{background:'#111', color:'white', borderRadius:20, padding:'8px 16px', height:36}}>Adicionar</button>
          </div>
        ))}
      </div>
      {cart.length>0 && (
        <div style={{position:'fixed', bottom:16, left:16, right:16, background:'#111', color:'white', borderRadius:24, padding:16, display:'flex', justifyContent:'space-between', fontWeight:900}}>
          <span>{cart.length} itens</span><span>R$ {(total+6).toFixed(2).replace('.',',')}</span>
        </div>
      )}
    </main>
  )
}
