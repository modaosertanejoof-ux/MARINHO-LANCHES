import Link from 'next/link'
export default function Landing(){
  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-xl"><span className="w-8 h-8 rounded-lg brand-gradient grid place-items-center text-white">L</span> LancheFácil</div>
          <div className="flex gap-2">
            <Link href="/marinholanches" className="px-4 py-2 rounded-full border font-medium">Ver demonstração</Link>
            <Link href="/cadastro" className="px-5 py-2 rounded-full bg-zinc-900 text-white font-bold">Quero meu cardápio</Link>
          </div>
        </div>
      </header>
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight">Seu cardápio online que vende pelo WhatsApp.</h1>
          <p className="mt-4 text-lg text-zinc-600">Tenha seu próprio cardápio digital, receba pedidos pelo celular e facilite suas vendas. Sem comissão por pedido.</p>
          <div className="mt-8 flex gap-3">
            <Link href="/cadastro" className="px-8 py-4 rounded-full brand-gradient text-white font-black">QUERO MEU CARDÁPIO</Link>
            <Link href="/marinholanches" className="px-8 py-4 rounded-full border-2 font-black">VER DEMONSTRAÇÃO</Link>
          </div>
          <div className="mt-6 flex gap-6 text-sm text-zinc-600"><span>✓ Sem comissão</span><span>✓ Link próprio</span><span>✓ QR Code</span></div>
        </div>
        <div className="relative">
          <div className="rounded-[2rem] overflow-hidden shadow-2xl border-[8px] border-zinc-900">
            <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=600" className="w-full h-[520px] object-cover"/>
            <div className="p-4 bg-white"><div className="h-3 w-20 bg-zinc-200 rounded mb-2"/><div className="h-3 w-full bg-zinc-100 rounded"/></div>
          </div>
        </div>
      </section>
      <section className="bg-white border-y py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {[
            {t:'Como funciona', d:'Cadastre sua loja, cardápio e receba pedidos no WhatsApp em 5 minutos.'},
            {t:'Recursos', d:'Cardápio, categorias, adicionais, cupons, QR Code, PWA e relatórios.'},
            {t:'Benefícios', d:'Mais pedidos, menos taxas, controle total e experiência mobile-first.'},
          ].map(c=> <div key={c.t} className="p-6 rounded-2xl bg-[#fffaf5] border"><h3 className="font-bold text-lg">{c.t}</h3><p className="mt-2 text-zinc-600">{c.d}</p></div>)}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-black">Planos</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            {name:'Básico', price:'59,90', feat:['1 loja','Cardápio ilimitado','Pedidos via WhatsApp','QR Code']},
            {name:'Profissional', price:'89,90', feat:['Tudo do Básico','Cupons','Relatórios','Suporte prioritário'], popular:true},
            {name:'Premium', price:'129,90', feat:['Tudo do Profissional','Domínio próprio','Múltiplos usuários','API']},
          ].map(p=> <div key={p.name} className={`p-6 rounded-3xl border-2 ${p.popular?'border-orange-500 bg-orange-50':'bg-white'}`}><h3 className="font-bold">{p.name}</h3><div className="mt-2 text-3xl font-black">R$ {p.price}<span className="text-sm font-normal">/mês</span></div><ul className="mt-4 space-y-2 text-sm">{p.feat.map(f=> <li key={f}>✓ {f}</li>)}</ul><Link href="/cadastro" className="mt-6 block text-center py-3 rounded-full bg-zinc-900 text-white font-bold">Assinar {p.name}</Link></div>)}
        </div>
      </section>
      <footer className="border-t py-8 text-center text-sm text-zinc-500">© 2026 LancheFácil - Marinho Lanches Demonstração</footer>
    </main>
  )
}
