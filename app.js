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

// 'Add' Route
app.get('/articles/add', (req, res) => {
    res.render('add_article', {
        title: 'Add Article'
    })
})

// GET single article.
app.get('/articles/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        res.render('article', {
            article: article
        })
    })
})

// Add 'Submit' POST Route
app.post('/articles/add', (req, res) => {
    let article = new Article()
    article.title = req.body.title
    article.auther = req.body.auther
    article.body = req.body.body

    article.save(function(err){
        if (err){
            console.log(err)
            return
        } else {
            res.redirect('/')
        }
    })
})

// Load Edit Form
app.get('/articles/edit/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        res.render('edit_article', {
            title: 'Edit Article',
            article: article
        })
    })
})

// Update 'Submit' POST Route
app.post('/articles/edit/:id', (req, res) => {
    let article = {}
    article.title = req.body.title
    article.auther = req.body.auther
    article.body = req.body.body

    let query = {_id: req.params.id}

    Article.update(query, article, function(err){
        if (err){
            console.log(err)
            return
        } else {
            res.redirect('/')
        }
    })
})

// Start Server
app.listen(3000, () => {
    console.log('Smooth Sailing on port 3000...')
})