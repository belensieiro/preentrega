const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./src/productRoutes');
const cartRoutes = require('./src/cartroutes');
const ProductManager = require('./src/productsmanager'); 

const app = express()
const port = 8080

app.use(bodyParser.json())

const productsManager = new ProductManager() 

app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)

app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`)
})

