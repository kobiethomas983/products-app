const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
var methodOverride = require('method-override')

const Product = require('./models/product');
mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true})
    .then(() => {
        console.log("Mongo connection open");
    })
    .catch(err => {
        console.log("NO MONGO CONNECTION ERROR!!!!")
        console.log(err);
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//MIDDLEWARE
//need this for post request to pull data from forms
app.use(express.urlencoded({extended:true}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy'];

app.get('/products', async(req,res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
})
//THIS HAS TO GO BEFORE "GET: /:id" SO SERVER DOESNT GET CONFUSED
app.get('/products/new', (req, res) => {
    res.render('products/new', {categories});
})

app.post("/products", async(req,res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
})

app.get('/products/:id', async(req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/show', {product});
})

app.get('/products/:id/edit', async(req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render("products/edit", {product, categories});
})

app.put('/products/:id', async(req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new:true});
    res.redirect(`/products/${product._id}`);
})

app.delete('/products/:id', async(req, res) => {
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000, () => {
    console.log("App is listening on prot 3000");
})