'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
export default function DashLayout({children}:{children:React.ReactNode}){
  const [user,setUser]=useState<any>(null)
  const router=useRouter()
  useEffect(()=>{
    const t=localStorage.getItem('lf_token'); const u=localStorage.getItem('lf_user')
    if(!t){ router.push('/login'); return }
    if(u) setUser(JSON.parse(u))
  },[])
  if(!user) return <div className="p-10">Carregando Marinho Lanches...</div>
  return (
    <div className="min-h-screen bg-[#fffaf5] flex">
      <aside className="hidden md:flex w-64 bg-zinc-900 text-white flex-col p-4 gap-2">
        <div className="font-black text-xl mb-6">🦐 Marinho Lanches - LancheFácil</div>
        {[
          {h:'Dashboard',p:'/dashboard'},
          {h:'Pedidos',p:'/dashboard/pedidos'},
          {h:'Produtos',p:'/dashboard/produtos'},
          {h:'Categorias',p:'/dashboard/categorias'},
          {h:'Adicionais',p:'/dashboard/adicionais'},
          {h:'Cupons',p:'/dashboard/cupons'},
          {h:'Minha Loja',p:'/dashboard/loja'},
          {h:'Relatórios',p:'/dashboard/relatorios'},
        ].map(l=> <Link key={l.p} href={l.p} className="px-3 py-2 rounded-lg hover:bg-white/10">{l.h}</Link>)}
        {user.role==='superadmin' && <Link href="/admin" className="px-3 py-2 rounded-lg bg-orange-600 mt-4">Super Admin</Link>}
        <div className="mt-auto text-xs opacity-60">Logado como {user.name}</div>
        <button onClick={()=>{localStorage.clear(); router.push('/login')}} className="px-3 py-2 rounded-lg bg-white/10">Sair</button>
      </aside>
      <div className="flex-1">
        <header className="md:hidden p-3 bg-zinc-900 text-white flex justify-between"><span className="font-black">Marinho Lanches</span><button onClick={()=>{localStorage.clear(); router.push('/login')}}>Sair</button></header>
        <div className="p-4 md:p-8">{children}</div>
      </div>
    </div>
  )
}
