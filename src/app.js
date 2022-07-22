import express from 'express';
import Manager from './manager/manager.js'

const manager = new Manager('src/files/products.json');

const app = express();
const server = app.listen(8080, () => console.log("Listening on port 8080"));
app.use(express.json());
app.use(express.static('public'));

let arrayProducts = await manager.getAll();

app.get('/api/products', (req,res) => {
    //if (arrayProducts.length === 0) return res.status(204).send({status:"No hay productos cargados."})
    res.send(arrayProducts);
    
})

app.get('/api/products/:id', (req,res) => {
    if (isNaN(req.params.id)) return res.status(400).send({error:"El parametro debe ser numérico."});
    if (parseInt(req.params.id) < 1 || parseInt(req.params.id) > arrayProducts.length) return res.status(400).send("No hay producto con ese numero de ID"); 
    let product = manager.getById(req.params.id);
    if (product === {}) return res.status(400).send("No hay producto con ese numero de ID");
    res.send(product);
})

app.post('/api/products/', (req,res) => {
    let newProduct = req.body;
    console.log(newProduct)
    let addedProduct = manager.add(newProduct);
    res.send({status:"success",addedProduct:addedProduct});
    
})