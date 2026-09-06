import { prisma } from '@/lib/db'
import { MOCK_RESTAURANT, MOCK_CATEGORIES, MOCK_PRODUCTS, MOCK_ADDONS } from '@/lib/store-data'
import StoreClient from './StoreClient'

export async function generateMetadata({params}:{params:{slug:string}}){
  try{
    const r = await prisma.restaurant.findUnique({where:{slug:params.slug}})
    if(r) return {title:r.seoTitle||`${r.name} - Cardápio`, description:r.seoDescription, openGraph:{title:r.name, images:[r.coverImage||'']}}
  }catch{}
  return {title:`${MOCK_RESTAURANT.name} - Cardápio`}
}

export default async function Page({params}:{params:{slug:string}}){
  let restaurant:any = MOCK_RESTAURANT, categories=MOCK_CATEGORIES, products=MOCK_PRODUCTS, addons=MOCK_ADDONS
  try{
    const r = await prisma.restaurant.findUnique({where:{slug:params.slug}})
    if(r){
      restaurant=r
      categories=await prisma.category.findMany({where:{restaurantId:r.id, isActive:true}, orderBy:{order:'asc'}})
      products=await prisma.product.findMany({where:{restaurantId:r.id, isActive:true}})
      addons=await prisma.addon.findMany({where:{restaurantId:r.id, isActive:true}})
    }
  }catch(e){}
  return <StoreClient restaurant={restaurant} categories={categories} products={products} addons={addons}/>
}
