const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');
const Photo = require('./models/Photo');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageController');




const methodOverride = require('method-override');


mongoose.connect('mongodb+srv://mustafaylmaz:asdfasdf123@cluster0.ydbwz.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});

app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(fileUpload()); // express-fileupload middleware
app.use(methodOverride('_method'));


app.get('/', photoController.getAllPhotos); 
app.put('/photos/:id', photoController.updatePhoto);
app.get('/photos/delete/:id', photoController.deletePhoto);
app.post('/photos', photoController.createPhoto);
app.get('/photos/:id', photoController.getPhoto);
app.get('/photos/edit/:id', photoController.getEditPhoto)


app.get('/about', pageController.getAboutPage);

app.get('/add',pageController.getAddPhoto);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});