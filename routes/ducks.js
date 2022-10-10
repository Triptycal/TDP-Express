const router = require("express").Router();

const ducks = [{
    name: "Daffy",
    colour: "black"
}];

router.get("/getAllDucks", (req, res) => res.send(ducks));


router.get("/getDuck/:id", (req, res, next) => {
    const {id} = req.params;
    if (!ducks[id]) return next("No duck there");
    res.send(ducks[id])
});

const deleteMiddleware = (req, res, next) => {
    console.log("You're trying to DELETE A DUCK? YOU MONSTER!!!");
    next();
}

router.post("/createDuck", (req, res, next) => {
    if (!req.body.name) return next({ status: 400, message: "Missing name"})
    ducks.push(req.body);
    res.status(201).send(ducks);
});


router.patch("/updateDuck/:id", (req, res) => {
    console.log("ID:", req.params.id);
    console.log("QUERY:", req.query);
    res.send();
})

router.delete("/removeDuck/:id", deleteMiddleware, (req, res, next) => {
    const {id}  = req.params;
    console.log("ID:", id);
    if (id > ducks.length) return next({ status: 404, message: `No duck found with id ${id}`});
    res.send(ducks.splice(id));
});


module.exports = router;