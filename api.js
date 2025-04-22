const path = require('path')
const Products = require('./products')
const autoCatch = require('./lib/auto-catch')

const Orders = require('./orders')
const { resourceLimits } = require('worker_threads')
async function getProduct(req, res, next){
  const {id} = req.params
  const product = await Products.get(id)
  if(!product) {
    return next()
  }
  return res.json(product)
}
async function createProduct(req, res) {
  console.log('request body:', req.body)
  res.json(req.body)
  const product = await Products.create(req.body)
  res.json(product)
}

async function editProduct (req, res, next) {
  const change = req.body
  const product = await Products.edit(req.params.id, change)
  res.json(product)
}
async function deleteProduct (req, res, next) {
  const response = await Products.destroy(req.params.id)
  res.json(response)
}
async function createOrder (req, res, next) {
  const order = await Orders.create(req.body)
  res.json(order)
}
async function listOrders (req, res, next) {
  const { offset = 0, limit = 25, productId, status } = req.query
  const orders = await Orders.list({ 
    offset: Number(offset), 
    limit: Number(limit),
    productId, 
    status 
  })

  res.json(orders)
}
async function deleteProduct(req, res, next) {
  res.json({ success: true })
  const orders = await Orders.list({ 
    offset: Number(offset), 
    limit: Number(limit),
    productId, 
  })

  res.json(orders)
}
async function editOrder (req, res, next) {
  const change = req.body
  const order = await Orders.edit(req.params.id, change)
  res.json(order)
}
async function deleteOrder (req, res, next) {
  await Orders.destroy(req.params.id)
  res.status(204).send()  // Send a 204 No Content response
}

module.exports = autoCatch({
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  listOrders,
  createOrder,
  editOrder,
  deleteOrder
});