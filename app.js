const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");

require('dotenv').config();

const app = express();

const port = process.env.PORT || 2000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//static files
app.use(express.static("public"));


//template engine
const handlebars = exphbs.create({extname:".hbs"});
app.engine('hbs',handlebars.engine);
app.set("view engine","hbs");

/*
const con=mysql.createPool({
    host : process.env.Host,
    user : process.env.User,
    password : process.env.Pass,
    database: process.env.Name
});

con.getConnection((err,connection) => {
    if(err) throw err
    console.log("connection success");
});

*/

//router
/*
app.get('/',(req,res) => {
    res.render("home");
});

*/

const routes=require("./server/routes/employee");
app.use('/',routes);

//listen port

app.listen(port,() => {
    console.log("Listening Port :"+port);
});