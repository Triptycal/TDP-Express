const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const ducks = [];

app.use(bodyParser.json());

app.get("/hello", (req, res) => {
    res.send("Hello, World!")
});

app.get("/getAllDucks", (req, res) => {});


app.get("/getDuck/:id", (req, res) => {});

app.post("/createDuck", (req, res) => {
    ducks.push(req.body);
    res.status(201).send(ducks);
});

app.patch("/updateDuck/:id", (req, res) => {
    console.log("ID:", req.params.id);
    console.log("QUERY:", req.query);

    res.send();
})

app.delete("/removeDuck/:id", (req, res) => {
    console.log("ID:", req.params.id);
    res.send();
});

const server = app.listen(4494, () => console.log(`Server successfully started on port ${server.address().port}`));