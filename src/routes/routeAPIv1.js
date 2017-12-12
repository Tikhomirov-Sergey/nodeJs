const express = require("express");

const users = require('../data/users');

const rtAPIv1 = express.Router();

rtAPIv1.get("/users/", function (req, res) {
    res.json(users);
});

rtAPIv1.delete("/users/:id", function (req, res) {

    let userExists = false;

    users.forEach((item, index) => {
        if(item.id === Number(req.params.id)) {
            users.splice(index, 1);
            userExists = true;
        }
    });

    if(userExists) {
        res.send('200');
    } else {
        res.json({error:true, message: "Пользователя с данным id не существует"});
    }
});
rtAPIv1.post("/users/", function (req, res) {
    let maxId = 0;

    users.forEach((item) => {
        if(item.id > maxId)
            maxId = item.id
    });

    users.push({id:maxId + 1, name:req.body.name });
    res.send('OK');
});

rtAPIv1.put("/users/:id", function (req, res) {

    let userExists = false;

    users.forEach((item) => {
        if(item.id === Number(req.params.id)) {
            item.name = req.body.name;
            userExists = true;
        }

        if(userExists) {
            res.send('200');
        } else {
            res.json({error:true, message: "Пользователя с данным id не существует"});
        }
    });
});

module.exports = rtAPIv1;