const express = require('express');
const app = express();


const photo = { 
    id: 1,
    name: 'Photo 1',
    description: 'This is a photo',

}

app.get('/', (req, res) => {
  res.send('Hello World!');
});



const port = 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
    });