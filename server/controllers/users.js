'use strict'
const jwt = require('jsonwebtoken');
const users = require('../data/users.json');
const JWT_KEY = "jwt_key";



exports.authenticateUser = (req,res) => {
    if(!req.body.email || !req.body.password){
        res.status(400).send();
        return;
    }
    const authenticatedUser = users.filter(u => u.email === req.body.email && u.password === req.body.password);
    if(authenticatedUser.length === 0){
        res.status(401).send();
    }
    else{
        const token = jwt.sign({ id: authenticatedUser[0].id, role: authenticatedUser[0].role}, JWT_KEY);
        res.status(200).send({jwt:token});
    }
}

exports.getUserInfo = (req,res) => {
    let token = null;
    if (req.headers && req.headers.authorization) {
        var arr = req.headers.authorization.split(' ');
        const prefix = arr[0];
        if(prefix === 'Bearer'){
            token = arr[arr.length - 1];
        }
    }
    if (token === null) {
        res.status(401).send();
    }
    try{
        const payload = jwt.verify(token, JWT_KEY);
        const authenticatedUser = users.filter(u => u.id === payload.id);
        if(authenticatedUser.length === 0){
            res.status(404).send();
        }
        else{
            res.status(200).send(authenticatedUser[0]);
        }
    }catch(err){
        res.status(401).send();
    }
}