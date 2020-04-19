const express = require('express');
const pug = require('pug');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Importing the model
let Article = require('./models/articles')


// CONNECTING TO MONGODB
mongoose.connect('mongodb://localhost/nodekb', {useNewUrlParser: true});
let db = mongoose.connection;

// Error checker
db.on('error', (err) =>{
    console.log(err)
})

// Server Connection Notification
db.once('open', () => {
    console.log('Connected to MongoDB')
})

// =========== middleware ===========

// Load View Engine -- middleware
app.set('view engine', 'pug')

// Body - Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set Public Folder
app.use(express.static('public'))

// Home Route
app.get('/', (req, res) => {
    Article.find({}, function(err, articles){
        if (err){
            console.log(err)
        } else {
            res.render('index.pug', {
                title: 'Article',
                articles: articles
            })
        }
    })
})

// GET single article.
app.get('/article/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        res.render('article', {
            article: article
        })
    })
})

// Add Route
app.get('/articles/add', (req, res) => {
    res.render('add', {
        title: 'Add Article'
    })
})

// Add 'Submit' POST Route
app.post('/articles/add', (req, res) => {
    console.log(req.body.title)
    console.log(req.body.auther)
    console.log(req.body.body)
    return
})

// Start Server
app.listen(3000, () => {
    console.log('Smooth Sailing on port 3000...')
})