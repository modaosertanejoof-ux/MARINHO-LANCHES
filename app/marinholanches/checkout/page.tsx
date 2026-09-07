import { MOCK_RESTAURANT } from '@/lib/store-data'
import CheckoutClient from '../../[slug]/checkout/CheckoutClient'
export default function Page(){ return <CheckoutClient restaurant={MOCK_RESTAURANT}/> }
