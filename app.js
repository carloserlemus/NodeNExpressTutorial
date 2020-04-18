const express = require('express');
const pug = require('pug');
const mongoose = require('mongoose');
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


// Load View Engine -- middleware
app.set('view engine', 'pug')

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

// Add Route
app.get('/articles/add', (req, res) => {
    res.render('add', {
        title: 'Add Article'
    })
})

// Add 'Submit' POST Route
app.post('/articles/add', (req, res) => {
    console.log('Submoited!')
    return
})

// Start Server
app.listen(3000, () => {
    console.log('Smooth Sailing on port 3000...')
})