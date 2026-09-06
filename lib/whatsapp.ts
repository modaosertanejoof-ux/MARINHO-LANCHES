export function buildWhatsAppMessage(order:any, restaurant:any){
  const itemsTxt = order.items.map((it:any)=> {
    const addons = it.addons?.length? `\n + ${it.addons.map((a:any)=>`${a.qty}x ${a.addonName}`).join(', ')}` : ''
    return `${it.quantity}x ${it.productName}${addons}`
  }).join('\n')
  return `🍔 NOVO PEDIDO - ${restaurant.name.toUpperCase()}

Cliente: ${order.customerName}
Telefone: ${order.customerPhone}

PEDIDO:
${itemsTxt}

Subtotal: R$ ${order.subtotal.toFixed(2)}
Entrega: R$ ${order.deliveryFee.toFixed(2)}${order.discount?`\nDesconto: -R$ ${order.discount.toFixed(2)}`:''}

TOTAL: R$ ${order.total.toFixed(2)}

ENTREGA:
${order.address}, ${order.number}
${order.neighborhood}${order.complement?` - ${order.complement}`:''}
${order.reference?`Ref: ${order.reference}`:''}

Pagamento: ${order.paymentMethod}${order.changeFor?` (Troco para R$ ${order.changeFor})`:''}
`.trim()
}
