const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config({path:__dirname+'../.env'});
const publicPath = path.join(__dirname, '..','build');

const app = express();
app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use(cors());

app.get('*', (req,res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port} :)`);
});