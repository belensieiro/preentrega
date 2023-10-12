const express = require('express');
const router = express.Router();
const { CartManager } = require('./cartmanager');

const cartManager = new CartManager()

router.post('/', (req, res) => {
    try {
        const cart = cartManager.createCart()
        res.status(201).json(cart)
    } catch (error) {
        console.error("Error al crear carrito:", error.message)
        res.status(500).json({ error: "Error al crear carrito" })
    }
})

router.get('/:cid', (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = cartManager.getCartById(cartId)
        if (cart) {
            res.json(cart.products)
        } else {
            res.status(404).json({ error: "Carrito no encontrado" })
        }
    } catch (error) {
        console.error("Error al obtener carrito:", error.message)
        res.status(500).json({ error: "Error al obtener carrito" })
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const { quantity } = req.body
        const cart = cartManager.addProductToCart(cartId, productId, quantity)
        if (cart) {
            res.json(cart)
        } else {
            res.status(404).json({ error: "Carrito no encontrado" })
        }
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error.message)
        res.status(500).json({ error: "Error al agregar producto al carrito" })
    }
})

module.exports = router


