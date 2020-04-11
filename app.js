const express = require('express');
const pug = require('pug');
const app = express();

// Load View Engine
app.set('view engine', 'pug')

// Home Route
app.get('/', (req, res) => {
    let articles = [
        {
            id: 1,
            title: 'Article 1',
            auther: 'X. Charles',
            body:'This is the article body.'
        },
        {
            id: 2,
            title: 'Article 2',
            auther: 'J. Smith',
            body:'This is the article body.'
        },
        {
            id: 3,
            title: 'Article 3',
            auther: 'H. Mccoy',
            body:'This is the article body.'
        }
    ]

    res.render('index', {
        title: 'Hello',
        articles: articles
    })
})

// Add Route
app.get('/articles/add', (req, res) => {
    res.render('add', {
        title: 'Add Article'
    })
})

// Start Server
app.listen(3000, () => {
    console.log('Smooth Sailing on port 3000...')
})