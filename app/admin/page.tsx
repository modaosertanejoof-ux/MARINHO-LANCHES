'use client'
export default function SuperAdmin(){
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-3xl font-black">Super Admin - LancheFácil</h1>
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <div className="bg-white/10 p-5 rounded-2xl"><div className="text-sm opacity-70">Total Lojas</div><div className="text-3xl font-black">1</div><div className="text-xs mt-2">Marinho Lanches (ativa)</div></div>
        <div className="bg-white/10 p-5 rounded-2xl"><div className="text-sm opacity-70">MRR</div><div className="text-3xl font-black">R$ 89,90</div></div>
        <div className="bg-white/10 p-5 rounded-2xl"><div className="text-sm opacity-70">Pedidos hoje (plataforma)</div><div className="text-3xl font-black">12</div></div>
      </div>
      <div className="mt-8 bg-white text-zinc-900 rounded-2xl p-6">
        <h2 className="font-bold">Restaurantes</h2>
        <table className="w-full mt-4 text-sm"><thead><tr className="text-left border-b"><th>Loja</th><th>Slug</th><th>Plano</th><th>Status</th><th>Ações</th></tr></thead><tbody><tr className="border-b"><td>Marinho Lanches</td><td>/marinholanches</td><td>Profissional</td><td><span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">Ativo</span></td><td><button className="text-orange-600 font-bold">Bloquear</button></td></tr></tbody></table>
      </div>
      <div className="mt-6 p-4 bg-orange-500/20 rounded-xl text-sm">Pronto pra gateway: configure STRIPE_SECRET ou MP_ACCESS_TOKEN no .env. Arquitetura já separa planos basico/profissional/premium.</div>
      <a href="/marinholanches" className="mt-6 inline-block px-6 py-3 rounded-full bg-white text-zinc-900 font-bold">Ver loja Marinho Lanches</a>
    </main>
  )
}
