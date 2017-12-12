const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded());

const rtAPIv1 = require("../routes/routeAPIv1");
const rtAPIv2 = require("../routes/routeAPIv2");
const index = require("../routes/indexRoute");

app.use("/api/v1/", rtAPIv1);
app.use("/api/v2/rpc/", rtAPIv2);
app.use("/", index);

app.listen(3000);
