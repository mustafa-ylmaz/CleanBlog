const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path'); 
const Photo = require('./models/Photo');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cleanblog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});



app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({  extended: true }));
app.use(express.json());





app.get('/', async(req, res) => {
  const photos = await Photo.find();
  res.render('index', { photos });
});

app.get('/about', (req, res) => {
  res.render('about')
});

app.get('/contact', (req, res) => {
  res.render('contact')
});
app.post('/photos', async(req, res) => {
  console.log('====================================');
  console.log(req.body);
  console.log('====================================');
  await Photo.create(req.body);
  res.redirect('/');
})

app.get('/photos/:id', async(req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo.ejs', { photo }); 
})


const port = 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});