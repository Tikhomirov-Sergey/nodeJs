const express = require("express");


const RPC = require('../modules/RPC');

const rpc = new RPC();

const rtAPIv2 = express.Router();

rtAPIv2.post("/", function (req, res) {

    let jsonrpc = req.body.jsonrpc || "2.0";
    let method = req.body.method;
    let params = req.body.params;
    let id = req.body.id || 0;

    let result = rpc.getResult(method, params);

    result['jsonrpc'] = jsonrpc;
    result['id'] = id;

    res.send(result);
});

module.exports = rtAPIv2;
