const express = require("express");
const router = express.Router();
data = {};

data.employees = require('../../data/employee.json')


router.route('/')
    .get((req, res)=>{
        res.json(data.employees);
    })
    .post((req, res)=>{
        res.json({
            "firstname" : req.body.firstname,
            "lastname" : req.body.lastname,
        });
    })
    .put((req, res)=>{
        res.json({
            "firstname" : req.body.firstname,
            "lastname" : req.body.lastname,
        });
    })
    .delete((req, res)=>{
        res.json({
            "id" : req.body.id,
        });
    });



router.route('/:id')
    .get((req, res)=>{
        id = req.params.id

        res.json({"id":id});
    })
    



module.exports = router