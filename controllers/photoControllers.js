const Photo = require('../models/Photo');
const fs = require('fs');
const path = require('path');
exports.getAllPhotos = async (req, res) => {
    const photos = await Photo.find();
    res.render('index', {
        photos
    });
}

exports.getPhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);

    res.render('photo', {
        photo
    });
}

exports.createPhoto =  async (req, res) => {
    const uploadDir ='public/uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    let uploadImage = req.files.image;
    let uploadPath =path.join(__dirname,'..','/public/uploads/'+ uploadImage.name);
    uploadImage.mv(uploadPath,
      async () => {
        await Photo.create({
          ...req.body,
          image: '/uploads/' + uploadImage.name
        })
      })
    res.redirect('/');
  }


  exports.updatePhoto = async (req, res) => {
    const photo = await Photo.findOne({
      _id: req.params.id
    });
    photo.title = req.body.title
    photo.description = req.body.description
    photo.save()
  
    res.redirect(`/photos/${req.params.id}`)
  }
  exports.deletePhoto = async(req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    let deletedImage = path.join(__dirname, '..'+'/public/', photo.image);
    fs.unlinkSync(deletedImage);
    await Photo.findByIdAndRemove(req.params.id);
    res.redirect('/');
  }

  exports.getEditPhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('edit', {
      photo
    });
  }