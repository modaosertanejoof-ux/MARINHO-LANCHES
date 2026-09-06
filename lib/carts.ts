export type CartAddon = { id:string; name:string; price:number; qty:number }
export type CartItem = { productId:string; name:string; price:number; image?:string; quantity:number; addons:CartAddon[]; note?:string }
export function calcItemSubtotal(item:CartItem){ const addonsTotal = item.addons.reduce((s,a)=>s+a.price*a.qty,0); return (item.price+addonsTotal)*item.quantity }
export function calcCartTotals(items:CartItem[], deliveryFee:number, discount=0){ const subtotal = items.reduce((s,i)=>s+calcItemSubtotal(i),0); return {subtotal, deliveryFee, discount, total: Math.max(0, subtotal+deliveryFee-discount)} }
