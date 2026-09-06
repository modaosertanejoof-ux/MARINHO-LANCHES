import { prisma } from '@/lib/db'
import { MOCK_RESTAURANT } from '@/lib/store-data'
import CheckoutClient from './CheckoutClient'
export default async function Page({params}:{params:{slug:string}}){
  let restaurant:any = MOCK_RESTAURANT
  try{ const r=await prisma.restaurant.findUnique({where:{slug:params.slug}}); if(r) restaurant=r }catch{}
  return <CheckoutClient restaurant={restaurant}/>
}
