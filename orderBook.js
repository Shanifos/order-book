function reconcileOrder(existingBook, incomingOrder) {
  if (existingBook.length === 0) {
    existingBook.push(incomingOrder)
  } else {
    existingBook.forEach(existingOrders => {
      if (existingOrders.type !== incomingOrder.type) {
        if (existingOrders.quantity === incomingOrder.quantity) {
          if (existingOrders.price < incomingOrder.price) {
            existingBook.push(incomingOrder)
          } else {
            existingBook.pop(existingOrders)
          }
        } else if (existingOrders.price === incomingOrder.price) {
          if (incomingOrder.quantity < existingOrders.quantity) {
            existingOrders.quantity =
              existingOrders.quantity - incomingOrder.quantity
          } else {
            incomingOrder.quantity =
              incomingOrder.quantity - existingOrders.quantity
            existingBook.pop(existingOrders) && existingBook.push(incomingOrder)
          }
        } else {
          existingBook.push(incomingOrder)
        }
      } else {
        existingBook.push(incomingOrder)
      }
    })
  }
  return existingBook
}

module.exports = reconcileOrder
