import fs from "fs";
class CartManager{
    constructor (path){
        this.carts = [];
        this.path = path;
    }
    addCart(cart){
        if(fs.existsSync(this.path)){
            this.carts = JSON.parse(fs.readFileSync(this.path))
        }
        let idCart = this.carts.length +1;
        if(cart.products){
            this.carts.push({products : cart.products, id : idCart});
            fs.writeFileSync(this.path, JSON.stringify(this.carts));
            return cart
        }else return{error: "FALTAN CARACTERÍSTICAS"}
    }
    getCartById(id){
        if(fs.existsSync(this.path)){
            this.carts = JSON.parse(fs.readFileSync(this.path))
            const cartBuscado = this.carts.find(cart => cart.id === id)
            if(cartBuscado){
                return {cartBuscado}
            }else return {error: 'Producto no encontrado'}
        }else return {error: 'No hay registro de carritos'}
    }
    addProductToCart(cartId, productId){
        if(fs.existsSync(this.path)){
            this.carts = JSON.parse(fs.readFileSync(this.path));
            const cartBuscado = this.carts.find(cart => cart.id === cartId);
            let indexCart = this.carts.findIndex(cart => cart.id === cartId);
            if(cartBuscado){
                if(cartBuscado.products.length){
                    let products = cartBuscado.products;
                    let prod = products.find(p => p.product === productId);
                    if(prod){
                        let index = products.findIndex(p => p.product === productId);
                        products[index].quantity++;
                        cartBuscado.products = products;
                        this.carts.splice(indexCart, 1, cartBuscado);
                        fs.writeFileSync(this.path, JSON.stringify(this.carts));
                        return {sucess: `Has agregado un producto más con id ${productId}`}
                    }else{
                        products.push({product: productId, quantity: 1});
                        cartBuscado.products = products;
                        this.carts.splice(indexCart, 1, cartBuscado);
                        fs.writeFileSync(this.path, JSON.stringify(this.carts));
                        return {sucess: `Has agregado el producto con id ${productId}`}
                    }
                } else{
                    let products = [];
                    products.push({product: productId, quantity: 1});
                    cartBuscado.products = products;
                    this.carts.splice(indexCart, 1, cartBuscado);
                    fs.writeFileSync(this.path, JSON.stringify(this.carts));
                    return {sucess: `Has agregado el primer producto con id ${productId}`}
                }
                
            }else return {error: 'Carrito no encontrado'}
        }else return {error: 'No hay registro de carritos'}
    }
}
export default CartManager;
