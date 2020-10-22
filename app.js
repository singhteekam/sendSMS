const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/', require('./routes/server'));


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
