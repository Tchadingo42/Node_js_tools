const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const router = require('./routes/pages');
const cookieParser = require('cookie-parser');

// setup le .v dans le dossier et creer la db avec les variables inside 
dotenv.config({ path: './.env'});
const app = express();
const db = mysql.createConnection(
{
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS,
    database: process.env.DATABASE

});

// where you put front-end stuff dirname -> acces dossier
const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory));

// parse url-encoded bodies
app.use(express.urlencoded({ extended: false }));
// parse json bodies
app.use(express.json());
//app.use(cookieParser);
// setup views
app.set('view engine', 'hbs');
// connect l'apps a la db et envoie un erreur si fail
db.connect((error)=>
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log('[+] MYSQL is connected ...')
    }
});

// define routes
app.use('/', require("./routes/pages"));
app.use('/auth', require("./routes/auth"));

app.listen(5000, (req, res)=>
{
    console.log("[+] The server is running ...");
});