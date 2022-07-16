const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static('public'));

const photo = {
  id: 1,
  name: 'Photo 1',
  description: 'This is a photo',

}


app.get('/', (req, res) => {
  res.render('index')
});

app.get('/about', (req, res) => {
  res.render('about')
});

app.get('/contact', (req, res) => {
  res.render('contact')
});

const port = 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});