import { MOCK_RESTAURANT, MOCK_CATEGORIES, MOCK_PRODUCTS, MOCK_ADDONS } from '@/lib/store-data'
import StoreClient from '../[slug]/StoreClient'
export const metadata = { title: 'Marinho Lanches | Cardápio Online' }
export default function MarinhoPage(){
  return <StoreClient restaurant={MOCK_RESTAURANT} categories={MOCK_CATEGORIES} products={MOCK_PRODUCTS} addons={MOCK_ADDONS}/>
}
