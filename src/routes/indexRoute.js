const express = require("express");
const fs = require('fs');

const index = express.Router();

index.get("/", function (req, res) {
    fs.createReadStream('../template/index.html').pipe(res);
});

module.exports = index;