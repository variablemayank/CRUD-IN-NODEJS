const express = require('express');

const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({extended:true}))


app.use(bodyParser.json())

const dbConfig = require('./db/db.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database

mongoose.connect(dbConfig.url,{
    useNewUrlParser:true
}).then(()=>{
    console.log("Succesfully connected to the database");
}).catch(err=>{
    console.log('Could not connect to the database exiting now..',err);
    process.exit();
})


app.get('/',(req,res)=>{
    res.json({"message":"Welcone to easy notes application take notes quickly"});


})

require('./app/routes/note.routes')(app);


app.listen(3000,()=>{
    console.log("Server is listening on port 3000")
});