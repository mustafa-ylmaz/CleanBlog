const express = require('express');
const app = express();
const path = require('path');


app.use(express.static('public'));

const photo = { 
    id: 1,
    name: 'Photo 1',
    description: 'This is a photo',

} 


app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'temp', 'index.html'));
});



const port = 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
    });