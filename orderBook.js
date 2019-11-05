function reconcileOrder(existingBook, incomingOrder) {
  if (existingBook.length === 0) {
    existingBook.push(incomingOrder)
  }
  existingBook.forEach(eBook => {
    if (
      (eBook.price !== incomingOrder.price &&
        eBook.quantity !== incomingOrder.quantity) ||
      (eBook.quantity === incomingOrder.quantity &&
        eBook.price < incomingOrder.price &&
        eBook.type !== incomingOrder.type)
    ) {
      existingBook.push(incomingOrder)
    }
    if (
      incomingOrder.quantity < eBook.quantity &&
      incomingOrder.type !== eBook.type &&
      eBook.price === incomingOrder.price
    ) {
      eBook.quantity = eBook.quantity - incomingOrder.quantity
    } else if (
      incomingOrder.quantity > eBook.quantity &&
      incomingOrder.type !== eBook.type &&
      eBook.price === incomingOrder.price
    ) {
      incomingOrder.quantity = incomingOrder.quantity - eBook.quantity
      existingBook.pop(eBook) && existingBook.push(incomingOrder)
    }
    if (
      eBook.type !== incomingOrder.type &&
      eBook.quantity === incomingOrder.quantity &&
      (eBook.price === incomingOrder.price || eBook.price > incomingOrder.price)
    ) {
      existingBook.pop(eBook)
    }
  })

  return existingBook
}

module.exports = reconcileOrder
