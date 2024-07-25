const express = require('express');
const router = express.Router();
const { Users } = require("../models");
const { Students } = require("../models");
const bcrypt = require('bcrypt');
const {validateToken} = require('../middlewares/AuthMiddleware');
const {sign} = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { username, password, role } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
            role: role,
        })
        
        res.json("SUCCESS");
    });
    
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await Users.findOne({ where: {username: username} });

    if(!user) res.json({error: "User Doesn't Exist"});

    bcrypt.compare(password, user.password).then((match) => {
        if(!match) res.json({error: "Wrong username and password combination"});
        else{
            const accessToken = sign({username: user.username, id: user.id, role: user.role}, "importantsecret");
            res.json({token: accessToken, username: user.username, id: user.id, role: user.role});
        }
        
    });

});

router.get('/checkauth', validateToken, (req, res) => {
    res.json(req.user);
});

module.exports = router;