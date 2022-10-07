const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const ducks = [{
    name: "Daffy",
    colour: "black"
}];

app.use(bodyParser.json());

// app.use - adds a piece of middleware to the chain
app.use((req, res, next) => {
    console.log("Request recevied at", new Date());
   return next(); // calls the next func
})

// IS the next function
app.use((req, res, next) => {
    console.log("I just exist to be an example");
    // return next("ruh-roh");
    return  next();
})

app.get("/hello", (req, res) => {
    res.send("Hello, World!")
});

app.get("/getAllDucks", (req, res) => res.send(ducks));


app.get("/getDuck/:id", (req, res, next) => {
    const {id} = req.params;
    if (!ducks[id]) return next("No duck there");
    res.send(ducks[id])
});

const deleteMiddleware = (req, res, next) => {
    console.log("You're trying to DELETE A DUCK? YOU MONSTER!!!");
    next();
}

app.post("/createDuck", (req, res, next) => {
    if (!req.body.name) return next({ status: 400, message: "Missing name"})
    ducks.push(req.body);
    res.status(201).send(ducks);
});

function sum(a, b) {}
function next(err){}
app.patch("/updateDuck/:id", (req, res) => {
    console.log("ID:", req.params.id);
    console.log("QUERY:", req.query);
    res.send();
})

app.delete("/removeDuck/:id", deleteMiddleware, (req, res, next) => {
    const {id}  = req.params;
    console.log("ID:", id);
    if (id > ducks.length) return next({ status: 404, message: `No duck found with id ${id}`});
    res.send(ducks.splice(id));
});

app.use((req, res) => {
    console.log("Thom example");
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.message || "oops");
})
const server = app.listen(4494, () => console.log(`Server successfully started on port ${server.address().port}`));