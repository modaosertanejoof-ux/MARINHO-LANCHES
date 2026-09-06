import './globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title:'LancheFácil - Seu cardápio online que vende pelo WhatsApp',
  description:'Tenha seu próprio cardápio digital, receba pedidos pelo celular e facilite suas vendas.',
  manifest:'/manifest.json',
}
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="pt-BR"><body>{children}</body></html>
}
