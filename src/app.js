const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const socketIo = require('socket.io');

const productRoutes = require('./productsRoutes');
const cartRoutes = require('./cartroutes');
const ProductManager = require('./productsmanager'); 

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


// Configurar Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views'); // Directorio de vistas

app.get('/', (req, res) => {
    res.render('home', {products: productsManager.getProducts(), title: "Home"});
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts' , {products: productsManager.getProducts(), title: "Productos en Tiempo Real"});
});

io.on('connection', (socket) => {
    console.log("Nuevo cliente ID: " + socket.id);

    // Escucha eventos desde el cliente
    socket.on('updateProduct', (operation) => {
        if (operation.action == 'add') {
            productsManager.addProduct(operation.product.title, operation.product.description, operation.product.price, operation.product.thumbnail, operation.product.code, operation.product.stock)

        }else if (operation.action == 'delete') {
            productsManager.deleteProduct(Number(operation.Id))
            io.emit('deleteProduct', Number(operation.Id))
        }
    });
});


const productsManager = new ProductManager()
app.use('/api/products', productRoutes(productsManager))
app.use('/api/carts', cartRoutes)

const port = 8080;
server.listen(port, () => {
    console.log(`http:localhost:${port}`)
})