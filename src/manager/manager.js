import fs from 'fs';

class Manager {
    constructor(path) {
        this.path = path;
    }

    add = async(object) => {
        try {
            let productos = await this.getAll();
            let addedProduct = object;
            if(productos.length === 0) {
                addedProduct.id = 1;
                productos.push(addedProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));
            } else {
                addedProduct.id = productos[productos.length-1].id+1;
                productos.push(addedProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));

            }
            return addedProduct;
        } catch (error) {
            console.log("No se pudo guardar el producto...");
        }
    }

    getAll = async() => {
        try {
            if (fs.existsSync(this.path)) {
                const fileData = await fs.promises.readFile(this.path, 'utf-8');
                let productos = JSON.parse(fileData);
                return productos;
            } else {
                return [];
            }
        } catch (error) {
            console.log("No se puede leer: " + error);
        }
    }

    getById = (productId) => {
        try {
            let products = this.getAll();
            let product = {};
            for(let p of products) {
                if(productId === p.id) {
                    product = JSON.stringify(p);
                }
            }
            return product;

        } catch(error) {
            console.log("No se pudo encontrar el producto: " + error)
        }
    }
}

export default Manager;