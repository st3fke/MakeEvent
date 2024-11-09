const express = require("express");
const bcrypt = require('bcryptjs');
const session = require('express-session');
const path = require('path');

const router = express.Router();
const connection = require("../control/config");
app.use(express.urlencoded({ extended: true })); // Za parsiranje formi
app.use(express.json());

const User = require("../models/User");
User.setConnection(connection);


app.use(session({
    secret: 'your-secret-key',  // Zaštita sesije
    resave: false,
    saveUninitialized: true
}));

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // SQL upit za pronalaženje korisnika po emailu
    connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).send('Database error');
        }

        if (results.length === 0) {
            return res.status(401).send('No user found with that email.');
        }

        // Upoređivanje lozinki koristeći bcrypt
        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).send('Error comparing passwords.');
            }

            if (!isMatch) {
                return res.status(401).send('Incorrect password.');
            }

            // Uspesno logovanje, čuvanje sesije
            req.session.userId = user.id;
            req.session.email = user.email;
            req.session.role = user.role;

            // Preusmeravanje na dashboard
            res.redirect('/dashboard');
        });
    });
});

// Ruta za dashboard (korisnički panel)
app.get('/dashboard', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }

    // Prikazivanje dashboard stranice
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

// Ruta za logout
app.get('/logout', (req, res) => {
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
