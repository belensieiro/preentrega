const express = require('express')
const router = express.Router()

module.exports = (productsManager) => {
    router.post('/', (req, res) => {
        const { title, description, price, thumbnail, code, stock } = req.body;
        const product = productsManager.addProduct(title, description, price, thumbnail, code, stock)
        if (product) {
            res.status(201).json(product)
        } else {
            res.status(400).json({ error: 'No se pudo agregar el producto' })
        }
    });

    router.get('/', (req, res) => {
        const products = productsManager.getProducts()
        res.json(products);
    });

    router.get('/:pid', (req, res) => {
        const productId = parseInt(req.params.pid)
        const product = productsManager.getProductById(productId)
        if (product) {
            res.json(product)
        } else {
            res.status(404).json({ error: 'Producto no encontrado' })
        }
    });

    router.put('/:pid', (req, res) => {
        const productId = parseInt(req.params.pid)
        const updatedFields = req.body;
        const product = productsManager.updateProduct(productId, updatedFields)
        if (product) {
            res.json(product);
        } else {
            res.status(400).json({ error: 'No se pudo actualizar el producto' })
        }
    });

    router.delete('/:pid', (req, res) => {
        const productId = parseInt(req.params.pid);
        const result = productsManager.deleteProduct(productId)
        if (result) {
            res.json({ message: 'Producto eliminado' })
        } else {
            res.status(400).json({ error: 'No se pudo eliminar el producto' })
        }
    });

    return router
}
