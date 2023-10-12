const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./productsRoutes');
const cartRoutes = require('./cartroutes');
const ProductManager = require('./productsmanager'); 

const app = express();
const port = 808

app.use(bodyParser.json())

const productsManager = new ProductManager()

app.use('/api/products', productRoutes(productsManager))
app.use('/api/carts', cartRoutes)

app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`)
})

