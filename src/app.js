const express = require('express')
const bodyParser = require('body-parser')
const { ProductManager } = require('./productsmanager')
const app = express()
const port = 3000

app.use(bodyParser.json())

const productManager = new ProductManager()

app.get('/products', (req, res) => {
    try {
        const { limit } = req.query
        const products = productManager.getProducts()
        if (limit) {
            const limitedProducts = products.slice(0, parseInt(limit))
            res.json(limitedProducts)
        } else {
            res.json(products)
        }
    } catch (error) {
        console.error("Error al obtener productos:", error.message)
        res.status(500).json({ error: "Error al obtener productos" })
    }
})

app.get('/products/:pid', (req, res) => {
    try {
        const productId = parseInt(req.params.pid)
        const product = productManager.getProductById(productId)
        if (product) {
            res.json(product)
        } else {
            res.status(404).json({ error: "Producto no encontrado" })
        }
    } catch (error) {
        console.error("Error al obtener producto:", error.message)
        res.status(500).json({ error: "Error al obtener producto" })
    }
})

app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`)
})
