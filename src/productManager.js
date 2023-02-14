import fs from "fs";
class ProductManager{
    constructor (path){
        this.products = [];
        this.path = path;
    }
    addProduct(prod){
        if(fs.existsSync(this.path)){
            this.products = JSON.parse(fs.readFileSync(this.path))
        }
        let idProduct = this.products.length +1;
        if(prod.title && prod.description && prod.price && prod.thumbnail && prod.stock && prod.status && prod.category){
            this.products.push({title : prod.title, description: prod.description, price: prod.price, thumbnail: prod.thumbnail, code: prod.code, stock: prod.stock, category: prod.category, status: prod.status, id : idProduct});
            fs.writeFileSync(this.path, JSON.stringify(this.products));
            return prod
        }else return{error: "FALTAN CARACTERÍSTICAS"}
    }
    getProducts(){
        if(fs.existsSync(this.path)){
            this.products = JSON.parse(fs.readFileSync(this.path))
            return this.products
        }else return {error: 'No hay productos'}
    }
    getProductById(id){
        if(fs.existsSync(this.path)){
            this.products = JSON.parse(fs.readFileSync(this.path))
            const productoBuscado = this.products.find(product => product.id === id)
            if(productoBuscado){
                return {productoBuscado}
            }else return {error: 'Producto no encontrado'}
        }else return {error: 'No hay registro de productos'}
    }
    updateProduct(prod, id){
        if(fs.existsSync(this.path)){
            this.products = JSON.parse(fs.readFileSync(this.path))
            let index = this.products.findIndex(product => product.id === id);
            let idProduct = id;
            if(index){
                this.products.splice(index, 1, {title : prod.title, description: prod.description, price: prod.price, thumbnail: prod.thumbnail, code: prod.code, stock: prod.stock, category: prod.category, status: prod.status, id : idProduct});
                fs.writeFileSync(this.path, JSON.stringify(this.products));
                return prod
            }else return{ error: "Producto a actualizar no encontrado"}
        }else return{ error: "No hay registro de productos para actualizar"}
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
export default ProductManager;
