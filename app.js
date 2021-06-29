var express = require("express");
var app = express();
const mongoose = require('mongoose');
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
    .connect( 'mongodb://localhost:27017/contactdance',{
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify :false,

    })
    .then(()=> console.log("connected"))
    .catch((e)=> console.log(e));
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
});
var User = mongoose.model("User", nameSchema);


app.use('/static', express.static('static'))

// Set the template engine as pug
app.set('view engine', 'pug')


 
// Our pug demo endpoint
app.get("/", (req, res) => {
    res.sendFile(__dirname + 'views');
});

app.get("/contact", (req, res)=>{
   
    res.status(200).render('contact.pug')
});
app.post('/contact', (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Name saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});
app.get("/this", (req, res)=>{
    res.status(404).send("This page is not found on my website cwh");
});

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});