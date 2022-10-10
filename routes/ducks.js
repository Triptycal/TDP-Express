const router = require("express").Router();
const { duckModel } = require("../db");

// const ducks = [{
//     name: "Daffy",
//     colour: "black"
// }];

router.get("/getAllDucks", (req, res) => duckModel.find({}).then(results => res.send(results)).catch(err => next(err)));


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
    duckModel.create(req.body).then(result => res.status(201).send(result)).catch(err => next(err));
});


router.patch("/updateDuck/:id", (req, res) => {
    console.log("ID:", req.params.id);
    console.log("QUERY:", req.query);
    res.send();
})

router.delete("/removeDuck/:id", deleteMiddleware, (req, res, next) => {
    const {id}  = req.params;
    console.log("ID:", id);
    duckModel.findByIdAndDelete(id).then(result => res.send(result)).catch(err => next(err));
});


module.exports = router;