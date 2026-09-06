'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function Login(){
  const [email,setEmail]=useState('dono@marinholanches.com')
  const [password,setPassword]=useState('marinho123')
  const [loading,setLoading]=useState(false)
  const router=useRouter()
  const submit=async()=>{
    setLoading(true)
    try{
      const res=await fetch('/api/auth/login',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email,password})})
      const data=await res.json()
      if(!res.ok) throw new Error(data.error)
      localStorage.setItem('lf_token', data.token)
      localStorage.setItem('lf_user', JSON.stringify(data.user))
      if(data.user.role==='superadmin') router.push('/admin')
      else router.push('/dashboard')
    }catch(e:any){ alert(e.message) } finally{ setLoading(false) }
  }
  return (
    <main className="min-h-screen grid place-items-center bg-[#fffaf5] p-4">
      <div className="bg-white p-8 rounded-3xl border w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-black">Entrar - Marinho Lanches</h1>
        <p className="text-sm text-zinc-600">Demo: dono@marinholanches.com / marinho123<br/>Admin: admin@lanchefacil.com / marinho123</p>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="E-mail" className="w-full px-4 py-3 rounded-xl border"/>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Senha" className="w-full px-4 py-3 rounded-xl border"/>
        <button onClick={submit} disabled={loading} className="w-full py-3 rounded-full bg-zinc-900 text-white font-black">{loading?'Entrando...':'Entrar'}</button>
      </div>
    </main>
  )
}
