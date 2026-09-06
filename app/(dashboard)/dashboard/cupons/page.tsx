'use client'
export default function Cupons(){
  return (
    <div><h1 className="text-2xl font-black">Cupons - Marinho Lanches</h1>
      <div className="mt-6 bg-white p-6 rounded-2xl border space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Código ex: MARINHO10" className="px-4 py-3 rounded-xl border"/>
          <select className="px-4 py-3 rounded-xl border"><option>Percentual</option><option>Fixo</option></select>
          <input placeholder="Valor" className="px-4 py-3 rounded-xl border"/>
          <input placeholder="Valor mínimo" className="px-4 py-3 rounded-xl border"/>
        </div>
        <button className="w-full py-3 rounded-full bg-orange-500 text-white font-black">Criar Cupom</button>
        <div className="mt-4 p-3 bg-[#fffaf5] rounded-xl text-sm">Cupom demo válido: MARINHO10 - R$ 5 off (validado no servidor em /api/coupons/validate)</div>
      </div>
    </div>
  )
}
