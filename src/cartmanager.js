const fs = require('fs')

class CartManager {
    constructor() {
        this.path = 'carts.json'
        this.carts = {}
        this.loadFromFile()
    }

    createCart() {
        const cartId = generateCartId()
        this.carts[cartId] = { id: cartId, products: [] }
        this.saveToFile()
        return this.carts[cartId]
    }

    getCartById(cartId) {
        return this.carts[cartId]
    }

    addProductToCart(cartId, productId) {
        const cart = this.carts[cartId]
        if (!cart) {
            throw new Error('Carrito no encontrado')
        }

        let existingItem = cart.products.find((producto) => producto.product === productId);
        let operacionUpdate = cart.products.findIndex((producto) => producto.product === productId);
        if (operacionUpdate !== -1) {
          cart.products[operacionUpdate] = {
            product: productId,
            quantity: existingItem.quantity + 1,
          };
        } else {
          cart.products.push({
            product: productId,
            quantity: 1,
          });
        }

        this.saveToFile()
        return cart
    }

    loadFromFile() {
        try {
            if (fs.existsSync(this.path)) {
                const data = fs.readFileSync(this.path, 'utf8')
                this.carts = JSON.parse(data)
            } else {
                this.carts = {}
            }
        } catch (error) {
            console.error("Error al cargar datos desde el archivo:", error.message)
            this.carts = {}
        }
    }

    saveToFile() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2), 'utf8')
        } catch (error) {
            console.error("Error al guardar datos en el archivo:", error.message)
        }
    }
}

function generateCartId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
}

module.exports = { CartManager }
