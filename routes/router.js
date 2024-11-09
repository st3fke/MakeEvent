const express = require("express");

const router = express.Router();
const connection = require("../control/config");

router.get("/", (req,res)=>{
    res.render("mainlogpage");
})


router.get("/login", (req,res)=>{
    res.render("login");
})

router.get("/reg-participant", (req,res)=>{
    res.render("register-participant");
})

router.get("/reg-host", (req,res)=>{
    res.render("register-host");
})
module.exports = router;
