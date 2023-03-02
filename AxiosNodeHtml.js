//requires: npm install express ejs axios body-parser

const express = require('express');
const axios = require('axios');
const app = express();
var bodyParser = require('body-parser');

//Base URL for the API
//cont base_url = "https://api.example.com";
const basr_url = "http://localhost:3500";

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static(__dirname = '/public'));

app.get("/", async(req, res) => {
    try {
        const response = await axios.get(base_url + '/books');
        res.render("books", { books: response.data});
    } catch (err) {
        console.error(err);
        res.status(500).sendStatus('Error');
    }
});

app.get("/book/:id",async(req, res) => {
    try{
        const response = await axios.get(base_url + '/books/' + req.params.id);
        res.render("book",{book: response.data});
    } catch (err) {
        console.error(err);
        res.status(500).sent('Error');
    }
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.post("/create", async (req, res) => {
    try {
        const data = {titile: req.body.title, author: req.body.author};
        await axios.post(base_url + '/books', data);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/update/:id",async(req, res) => {
    try{
        const response = await axios.get(base_url + '/books/' + req.params.id);
        res.render("update",{book: response.data});
    } catch (err) {
        console.error(err);
        res.status(500).sent('Error');
    }
});

app.post("/update/:id",async(req, res) => {
    try{
        const data = {titile: req.body.title, author: req.body.author};
        await axios.put(base_url + '/books/' + req.params.id, data);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).sent('Error');
    }
});

app.get("/delete/:id",async(req, res) => {
    try{
        await axios.put(base_url + '/books/' + req.params.id);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).sent('Error');
    }
});

app.listen(5500, ()=>{
    console.log('Server started on port 5500');
});