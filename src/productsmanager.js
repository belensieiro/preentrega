const fs = require('fs')

class ProductManager {
    constructor() {
        this.path = 'products.json'
        this.products = []
        this.loadFromFile()
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!this.isCodeUnique(code)) {
            console.error("Error: El código ya existe en otro producto.");
            return null
        }

        const product = {
            id: this.getNextId(),
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }
        this.products.push(product)
        this.saveToFile()
        return product
    }

    isCodeUnique(code) {
        return !this.products.some((product) => product.code === code)
    }

    getProducts() {
        return this.products
    }

    getProductById(productId) {
        const product = this.products.find((product) => product.id === productId);
        if (product) {
            return product
        } else {
            console.error("Error: Producto no encontrado.")
            return null
        }
    }

    updateProduct(productId, updatedFields) {
        const productIndex = this.products.findIndex((product) => product.id === productId)

        if (productIndex !== -1) {
            if (updatedFields.code && !this.isCodeUnique(updatedFields.code)) {
                console.error("Error: El código ya existe en otro producto.")
                return null;
            }
            const updatedProduct = {
                ...this.products[productIndex],
                ...updatedFields,
                id: productId, 
            }

            this.products[productIndex] = updatedProduct

            this.saveToFile()
            return updatedProduct
        } else {
            console.error("Error: Producto no encontrado para actualizar.")
            return null
        }
    }

    deleteProduct(productId) {
        const productIndex = this.products.findIndex((product) => product.id === productId)
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1)
            this.saveToFile()
            return true
        } else {
            console.error("Error: Producto no encontrado para eliminar.")
            return false
        }
    }

    loadFromFile() {
        try {
            if (fs.existsSync(this.path)) { 
                const data = fs.readFileSync(this.path, 'utf8')
                this.products = JSON.parse(data)
            } else {
                this.products = []
            }
        } catch (error) {
            console.error("Error al cargar datos desde el archivo:", error.message)
            this.products = []
        }
    }

    saveToFile() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8')
        } catch (error) {
            console.error("Error al guardar datos en el archivo:", error.message)
        }
    }

    getNextId() {
        const maxId = Math.max(...this.products.map((product) => product.id), 0)
        return maxId + 1
    }
}

module.exports = ProductManager


