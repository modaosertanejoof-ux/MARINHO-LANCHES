'use client'
export default function Dash(){
  return (
    <div>
      <h1 className="text-2xl font-black">Dashboard - Marinho Lanches</h1>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border"><div className="text-sm text-zinc-500">Pedidos hoje</div><div className="text-2xl font-black">12</div></div>
        <div className="bg-white p-5 rounded-2xl border"><div className="text-sm text-zinc-500">Faturamento hoje</div><div className="text-2xl font-black">R$ 487,60</div></div>
        <div className="bg-white p-5 rounded-2xl border"><div className="text-sm text-zinc-500">Pendentes</div><div className="text-2xl font-black text-orange-600">3</div></div>
        <div className="bg-white p-5 rounded-2xl border"><div className="text-sm text-zinc-500">Concluídos</div><div className="text-2xl font-black text-green-600">8</div></div>
        <div className="bg-white p-5 rounded-2xl border"><div className="text-sm text-zinc-500">Mais vendido</div><div className="text-xl font-black">X-Bacon</div></div>
        <div className="bg-white p-5 rounded-2xl border"><div className="text-sm text-zinc-500">Clientes</div><div className="text-2xl font-black">24</div></div>
      </div>
      <div className="mt-8 bg-white p-6 rounded-2xl border"><h3 className="font-bold">QR Code da loja</h3><p className="text-sm text-zinc-600 mt-2">Seu link: /marinholanches - gere QR Code com qrcode.react e botão BAIXAR QR CODE</p></div>
    </div>
  )
}
