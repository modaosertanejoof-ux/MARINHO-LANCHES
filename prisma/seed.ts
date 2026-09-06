import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()
async function main(){
  const hashed = await bcrypt.hash('marinho123', 10)
  const restaurant = await prisma.restaurant.upsert({
    where:{slug:'marinholanches'},
    update:{},
    create:{
      name:'Marinho Lanches',
      slug:'marinholanches',
      slogan:'Seu lanche. Seu momento. Seu Marinho.',
      description:'Lanches artesanais com sabor de mar e churrasco. Ingredientes frescos e entrega rápida.',
      logo:'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=200',
      coverImage:'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200',
      whatsapp:'5511999999999',
      phone:'(11) 99999-9999',
      address:'Av. Beira Mar, 500 - Centro, Cândido Mota - SP',
      deliveryFee:6,
      minOrder:25,
      openingHours:{seg:'18h-23h',ter:'18h-23h',qua:'18h-23h',qui:'18h-23h',sex:'18h-00h',sab:'18h-00h',dom:'18h-23h'},
      seoTitle:'Marinho Lanches | Cardápio Online',
      seoDescription:'Peça seu hambúrguer artesanal no Marinho Lanches. Entrega rápida em Cândido Mota.'
    }
  })
  await prisma.user.upsert({where:{email:'dono@marinholanches.com'}, update:{}, create:{email:'dono@marinholanches.com', password:hashed, name:'Dono Marinho', role:'owner', restaurantId:restaurant.id}})
  await prisma.user.upsert({where:{email:'admin@lanchefacil.com'}, update:{}, create:{email:'admin@lanchefacil.com', password:hashed, name:'Super Admin', role:'superadmin'}})

  const cats = [
    {name:'Hambúrgueres', slug:'hamburgueres', order:1},
    {name:'Porções', slug:'porcoes', order:2},
    {name:'Bebidas', slug:'bebidas', order:3},
    {name:'Combos', slug:'combos', order:4},
  ]
  for(const c of cats){
    await prisma.category.upsert({where:{restaurantId_slug:{restaurantId:restaurant.id, slug:c.slug}}, update:{}, create:{...c, restaurantId:restaurant.id}})
  }
  const catMap = Object.fromEntries((await prisma.category.findMany({where:{restaurantId:restaurant.id}})).map(c=>[c.slug,c.id]))
  const products = [
    {name:'X-Salada', price:21.9, categoryId:catMap['hamburgueres'], description:'Pão brioche, hambúrguer 160g, queijo, alface, tomate', image:'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=400'},
    {name:'X-Bacon', price:24.9, categoryId:catMap['hamburgueres'], description:'Pão brioche, hambúrguer 160g, queijo, bacon crocante', image:'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400'},
    {name:'X-Tudo', price:29.9, categoryId:catMap['hamburgueres'], description:'O brabo: 2 carnes, queijo, bacon, ovo, salada completa', image:'https://images.unsplash.com/photo-1593246049226-ded77bf90326?w=400'},
    {name:'Batata P', price:10, categoryId:catMap['porcoes'], description:'Batata frita crocante 200g', image:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400'},
    {name:'Batata G', price:16, categoryId:catMap['porcoes'], description:'Batata frita crocante 400g', image:'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400'},
    {name:'Coca-Cola', price:6, categoryId:catMap['bebidas'], description:'Lata 350ml gelada', image:'https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?w=400'},
    {name:'Guaraná', price:5, categoryId:catMap['bebidas'], description:'Lata 350ml', image:'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400'},
    {name:'Água', price:3, categoryId:catMap['bebidas'], description:'Garrafa 500ml', image:'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400'},
    {name:'Combo X-Bacon', price:34.9, categoryId:catMap['combos'], description:'X-Bacon + Batata P + Coca-Cola', image:'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400'},
    {name:'Combo X-Tudo', price:39.9, categoryId:catMap['combos'], description:'X-Tudo + Batata P + Coca-Cola', image:'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=400'},
  ]
  for(const p of products){ await prisma.product.create({data:{...p, restaurantId:restaurant.id}}) }
  const addons = [
    {name:'Bacon extra', price:5},
    {name:'Queijo', price:3},
    {name:'Ovo', price:2.5},
    {name:'Hambúrguer extra', price:8},
  ]
  for(const a of addons){ await prisma.addon.create({data:{...a, restaurantId:restaurant.id}}) }
  console.log('Seed Marinho Lanches done')
}
main().finally(()=>prisma.$disconnect())
