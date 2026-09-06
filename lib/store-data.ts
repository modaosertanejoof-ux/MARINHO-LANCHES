// Fallback mock data - Marinho Lanches
export const MOCK_RESTAURANT = {
  id:'mock-1', name:'Marinho Lanches', slug:'marinholanches', slogan:'Seu lanche. Seu momento. Seu Marinho.',
  description:'Lanches artesanais com sabor de mar e churrasco. Ingredientes frescos e entrega rápida.',
  logo:'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=200',
  coverImage:'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200',
  whatsapp:'5511999999999', phone:'(11) 99999-9999', address:'Av. Beira Mar, 500 - Centro, Cândido Mota - SP',
  deliveryFee:6, minOrder:25, isActive:true,
  openingHours:{seg:'18h-23h',ter:'18h-23h',qua:'18h-23h',qui:'18h-23h',sex:'18h-00h',sab:'18h-00h',dom:'18h-23h'}
}
export const MOCK_CATEGORIES = [
  {id:'c1', name:'Hambúrgueres', slug:'hamburgueres', order:1},
  {id:'c2', name:'Porções', slug:'porcoes', order:2},
  {id:'c3', name:'Bebidas', slug:'bebidas', order:3},
  {id:'c4', name:'Combos', slug:'combos', order:4},
]
export const MOCK_PRODUCTS = [
  {id:'p1', categoryId:'c1', name:'X-Salada', price:21.9, description:'Pão brioche, hambúrguer 160g, queijo, alface, tomate', image:'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=400', isActive:true},
  {id:'p2', categoryId:'c1', name:'X-Bacon', price:24.9, description:'Pão brioche, hambúrguer 160g, queijo, bacon crocante', image:'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400', isActive:true},
  {id:'p3', categoryId:'c1', name:'X-Tudo', price:29.9, description:'O brabo: 2 carnes, queijo, bacon, ovo, salada completa', image:'https://images.unsplash.com/photo-1593246049226-ded77bf90326?w=400', isActive:true},
  {id:'p4', categoryId:'c2', name:'Batata P', price:10, description:'Batata frita crocante 200g', image:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400', isActive:true},
  {id:'p5', categoryId:'c2', name:'Batata G', price:16, description:'Batata frita crocante 400g', image:'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400', isActive:true},
  {id:'p6', categoryId:'c3', name:'Coca-Cola', price:6, description:'Lata 350ml gelada', image:'https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?w=400', isActive:true},
  {id:'p7', categoryId:'c3', name:'Guaraná', price:5, description:'Lata 350ml', image:'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400', isActive:true},
  {id:'p8', categoryId:'c3', name:'Água', price:3, description:'Garrafa 500ml', image:'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400', isActive:true},
  {id:'p9', categoryId:'c4', name:'Combo X-Bacon', price:34.9, description:'X-Bacon + Batata P + Coca-Cola', image:'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400', isActive:true},
  {id:'p10', categoryId:'c4', name:'Combo X-Tudo', price:39.9, description:'X-Tudo + Batata P + Coca-Cola', image:'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=400', isActive:true},
]
export const MOCK_ADDONS = [
  {id:'a1', name:'Bacon extra', price:5},
  {id:'a2', name:'Queijo', price:3},
  {id:'a3', name:'Ovo', price:2.5},
  {id:'a4', name:'Hambúrguer extra', price:8},
]
