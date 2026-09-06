'use client'
import { useState } from 'react'
export default function Cadastro(){
  const [form,setForm]=useState({name:'', email:'', phone:'', whatsapp:'', slug:'', password:'', plan:'profissional'})
  return (
    <main className="min-h-screen bg-[#fffaf5] p-4 grid place-items-center">
      <div className="bg-white p-8 rounded-3xl border w-full max-w-lg space-y-4">
        <h1 className="text-2xl font-black">Cadastre sua lanchonete</h1>
        <div className="grid gap-3">
          <input placeholder="Nome da loja" value={form.name} onChange={e=>setForm({...form,name:e.target.value, slug:e.target.value.toLowerCase().replace(/\s+/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'')})} className="w-full px-4 py-3 rounded-xl border"/>
          <input placeholder="Slug (URL): ex: marinholanches" value={form.slug} onChange={e=>setForm({...form,slug:e.target.value})} className="w-full px-4 py-3 rounded-xl border"/>
          <input placeholder="E-mail do proprietário" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full px-4 py-3 rounded-xl border"/>
          <input placeholder="WhatsApp" value={form.whatsapp} onChange={e=>setForm({...form,whatsapp:e.target.value})} className="w-full px-4 py-3 rounded-xl border"/>
          <select value={form.plan} onChange={e=>setForm({...form,plan:e.target.value})} className="w-full px-4 py-3 rounded-xl border">
            <option value="basico">Básico R$ 59,90</option><option value="profissional">Profissional R$ 89,90</option><option value="premium">Premium R$ 129,90</option>
          </select>
          <input type="password" placeholder="Senha" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="w-full px-4 py-3 rounded-xl border"/>
        </div>
        <button onClick={()=>alert('Em produção: criaria restaurante via POST /api/restaurants e geraria página /'+form.slug)} className="w-full py-3 rounded-full bg-zinc-900 text-white font-black">Criar minha loja</button>
        <p className="text-xs text-zinc-500">Após cadastro, sua página será: /{form.slug||'sua-loja'}</p>
      </div>
    </main>
  )
}
