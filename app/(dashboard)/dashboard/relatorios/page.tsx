'use client'
export default function Relatorios(){
  return (
    <div><h1 className="text-2xl font-black">Relatórios - Marinho Lanches</h1>
      <div className="mt-4 flex gap-2">
        <button className="px-4 py-2 rounded-full bg-zinc-900 text-white text-sm">Hoje</button>
        <button className="px-4 py-2 rounded-full border text-sm">7 dias</button>
        <button className="px-4 py-2 rounded-full border text-sm">30 dias</button>
        <button className="px-4 py-2 rounded-full border text-sm">Personalizado</button>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border"><div className="text-sm text-zinc-500">Vendas período</div><div className="text-2xl font-black">R$ 1.240,90</div></div>
        <div className="bg-white p-5 rounded-2xl border"><div className="text-sm text-zinc-500">Ticket médio</div><div className="text-2xl font-black">R$ 42,30</div></div>
        <div className="bg-white p-5 rounded-2xl border"><div className="text-sm text-zinc-500">Qtd pedidos</div><div className="text-2xl font-black">32</div></div>
        <div className="bg-white p-5 rounded-2xl border"><div className="text-sm text-zinc-500">Cancelados</div><div className="text-2xl font-black text-red-500">2</div></div>
      </div>
      <div className="mt-6 bg-white p-6 rounded-2xl border"><h3 className="font-bold">Mais vendidos</h3><div className="mt-3 space-y-2 text-sm"><div className="flex justify-between"><span>X-Bacon</span><span>14x</span></div><div className="flex justify-between"><span>Batata G</span><span>12x</span></div><div className="flex justify-between"><span>Coca-Cola</span><span>18x</span></div></div></div>
    </div>
  )
}
