const express = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

const names = ["dan", "steve", "gareth", "james", "michael"];

app.get("/getAll", (req, res) => res.send(names));

app.get("/get/:id", (req, res) => res.send(names[req.params.id]));

app.post("/add", (req, res) => {
    const newName = req.body.name;
    names.push(newName);
    res.status(201).send(names[names.length - 1]);
});

app.get("/thom/:example/:url/:params", (req, res) => {
    console.log("params:", req.params);
    res.send();
})

app.put("/replace/:id", (req, res) => {
    console.log("QUERY:", req.query);
    const newName = req.query.name;
    const oldName = names[req.params.id];
    names[req.params.id] = newName;
    res.send(`Replaced ${oldName} with ${names[req.params.id]}`);
});

app.delete("/remove/:id", (req, res) => res.send(names.splice(req.params.id, 1)));

const server = app.listen(4_000, () => console.log(`Server started successfully on port ${server.address().port}`));