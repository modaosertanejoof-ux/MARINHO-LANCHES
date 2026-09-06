'use client'
import { MOCK_RESTAURANT } from '@/lib/store-data'
export default function Loja(){
  return (
    <div><h1 className="text-2xl font-black">Minha Loja - Marinho Lanches</h1>
      <div className="mt-6 bg-white p-6 rounded-2xl border grid gap-3">
        <input defaultValue={MOCK_RESTAURANT.name} placeholder="Nome" className="px-4 py-3 rounded-xl border"/>
        <input defaultValue={MOCK_RESTAURANT.slug} placeholder="Slug" className="px-4 py-3 rounded-xl border"/>
        <input defaultValue={MOCK_RESTAURANT.whatsapp} placeholder="WhatsApp" className="px-4 py-3 rounded-xl border"/>
        <input defaultValue={MOCK_RESTAURANT.address} placeholder="Endereço" className="px-4 py-3 rounded-xl border"/>
        <div className="grid grid-cols-2 gap-3">
          <input defaultValue={MOCK_RESTAURANT.deliveryFee} placeholder="Taxa entrega" className="px-4 py-3 rounded-xl border"/>
          <input defaultValue={MOCK_RESTAURANT.minOrder} placeholder="Pedido mínimo" className="px-4 py-3 rounded-xl border"/>
        </div>
        <textarea defaultValue={MOCK_RESTAURANT.description} placeholder="Descrição SEO" className="px-4 py-3 rounded-xl border h-24"/>
        <button className="py-3 rounded-full bg-zinc-900 text-white font-black">Salvar loja</button>
      </div>
    </div>
  )
}
