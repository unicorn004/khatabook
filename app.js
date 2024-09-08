const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", (req, res) => {
    fs.readdir(`./hisaab`,function(err,files){
        if(err) return console.log(err);
        res.render("index", {files: files});
    });
});

app.get("/create", function(req, res){
    res.render("create");
});


app.get("/edit/:filename", function(req, res){
    fs.readFile(`./hisaab/${req.params.filename}`,"utf-8", function(err, filedata){
        if(err) return console.log(err);
        res.render("edit",{ filedata, filename: req.params.filename });
    });
});

app.get("/hisaab/:filename", function(req, res){
    fs.readFile(`./hisaab/${req.params.filename}`,"utf-8", function(err, filedata){
        if(err) return console.log(err);
        res.render("hisaab",{ filedata, filename: req.params.filename });
    });
});

app.get("/delete/:filename", function(req, res){
    fs.unlink(`./hisaab/${req.params.filename}`,function(err){
        if(err) return console.log(err);
        res.redirect("/");
    });
});

app.post("/update/:filename", function(req, res){
    fs.writeFile(`./hisaab/${req.params.filename}`,req.body.content, function(err){
        if(err) return console.log(err);
        res.redirect("/");
    });
});

app.post("/createhisaab", function(req, res){

    //var currentdate =  new Date();
    //var date  = `${currentdate.getDate()}-${currentdate.getMonth()+1}-${currentdate.getFullYear()}`;
    fs.writeFile(`./hisaab/${req.body.title}.txt`,req.body.content, function(err){
        if(err) return console.log(err);
        res.redirect("/");
    });
});
app.listen(8080);