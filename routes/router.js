const express = require("express");
const bcrypt = require('bcryptjs');
const session = require('express-session');
const path = require('path');

const router = express.Router();
const connection = require("../control/config");
router.use(express.urlencoded({ extended: true })); // Za parsiranje formi
router.use(express.json());

const User = require("../models/User");
User.setConnection(connection);


router.use(session({
    secret: 'your-secret-key',  // Zaštita sesije
    resave: false,
    saveUninitialized: true
}));

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log("priprema");
    // SQL upit za pronalaženje korisnika po emailu
    connection.query('SELECT * FROM ucesnici WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).send('Database error');
        }

        if (results.length === 0) {
            return res.status(401).send('No user found with that email.');
        }

        // Upoređivanje lozinki koristeći bcrypt
        const user = results[0];
        console.log("Njegova sifra iz baze je:" + user.sifra);
        console.log("Njegova sifra iz upita je:" + password);
        if(password == user.sifra){
            req.session.userId = user.id;
            req.session.email = user.email;
            return res.redirect("index");
        } else {
            return res.status(500).send('Error comparing passwords.'); 
        }
        /*
        bcrypt.compare(password, user.sifra, (err, isMatch) => {
            console.log("is Match:"+isMatch);
            if (err) {
                return res.status(500).send('Error comparing passwords.');
            }

            if (!isMatch) {
                return res.status(401).send('Incorrect password.');
            }

            // Uspesno logovanje, čuvanje sesije
            req.session.userId = user.id;
            req.session.email = user.email;

            // Preusmeravanje na dashboard
            console.log("ulogovan");
        });*/
    });
});

// Ruta za dashboard (korisnički panel)
router.get('/dashboard', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }

    // Prikazivanje dashboard stranice
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

// Ruta za logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to logout');
        }
        res.redirect('/login');
    });
});

router.get("/", (req,res)=>{
    res.render("mainlogpage");
})

router.get("/index", (req,res)=>{
    res.render("index");
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
