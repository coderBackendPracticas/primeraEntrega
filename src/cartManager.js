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
            this.products = JSON.parse(fs.readFileSync(this.path))
            const cartBuscado = this.carts.find(cart => cart.id === id)
            if(cartBuscado){
                return {cartBuscado}
            }else return {error: 'Producto no encontrado'}
        }else return {error: 'No hay registro de carritos'}
    }
    deleteProduct(id){
        if(fs.existsSync(this.path)){
            this.products = JSON.parse(fs.readFileSync(this.path))
            let index = this.products.findIndex(product => product.id === id)
            if(index){
                this.products.splice(index,index+1)
                fs.writeFileSync(this.path, JSON.stringify(this.products))
                return {sucess: "Producto Elminado"}
            }else return {error: "Producto a eliminar no encontrado"}
        }else return{ error: "No hay registro de productos para eliminar"}
    }
}
export default CartManager;
