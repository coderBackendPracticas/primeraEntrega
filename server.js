import express from "express";
import ProductManager from "./src/productManager.js";
import CartManager from "./src/cartManager.js";

let carts = new CartManager("./src/carts.json")
let products = new ProductManager("./src/products.json");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const routerProductos = express.Router();
const routerCarritos = express.Router();

app.use('/api/products', routerProductos);
app.use('/api/carts', routerCarritos);

//rutas para Productos
routerProductos.get('/', (req, res) =>{
    return res.json(products.getProducts());
})

routerProductos.get('/:pid', (req, res) =>{
    let pid = parseInt(req.params.pid);
    return res.json(products.getProductById(pid))
})
routerProductos.post('/', (req, res)=>{
    let producto = req.body;
    res.json(products.addProduct(producto));
})

routerProductos.put('/:pid', (req, res)=>{
    let id = parseInt(req.params.pid);
    let product = req.body;
    res.json(products.updateProduct(product, id));
})

routerProductos.delete('/:pid', (req, res)=>{
    let id = parseInt(req.params.pid);
    res.json(products.deleteProduct(id));
})

//rutas para Carritos
routerCarritos.post('/', (req, res) =>{
    let cart = req.body;
    res.json(carts.addCart(cart));
})
routerCarritos.get('/:cid', (req, res)=>{
    let cid = parseInt(req.params.cid);
    return res.json(carts.getCartById(cid));
})
/* routerCarritos.post('/:cid/product/:pid', (req, res)=>{

}) */

// Servidor
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log('Servidor ejecutandose en el puerto: ', PORT)
})
server.on('error', error => console.log('Error en el servidor: ', error))