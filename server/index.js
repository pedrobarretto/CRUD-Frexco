const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');

const cors = require('cors');

const methodOverried = require('method-override');

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('MONGO CONECTION OPEN!');
})
.catch((err) => {
    console.log('MONGO CONECTION ERROR!');
    console.log(err);
})

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(methodOverried('_method'));

app.post('/new', async (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;

    const product = new Product({name: name, price: price, category: category})

    try {
        await product.save();
        res.send('data saved');
    } catch(err) {
        console.log(err);
    }
})

app.get('/products', async (req, res) => {
    Product.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }

        res.send(result);
    })
})

app.put('/edit', async (req, res) => {
    const newPrice = req.body.newPrice;
    const id = req.body.id;

    try {
        await Product.findById(id, (error, updatedProduct) => {
            updatedProduct.price = newPrice;
            updatedProduct.save()
        });
    } catch(err) {
        console.log(err);
    }
})

app.delete('/delete/:id', async (req, res) => {
    const {id} = req.params;
    
    try {
        await Product.findByIdAndDelete(id);
    } catch(e) {
        console.log(e)
    }
    res.send('deleted')
})

app.listen(3001, () => {
    console.log('Listening on port 3001')
})