"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var helmet_1 = require("helmet");
var dotenv_1 = require("dotenv");
dotenv_1.default.config;
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.get("/", function (req, res) {
    res.json({ message: "API Running 🚀" });
});
app.listen(PORT, function () {
    console.log("Server running on http://localhost:".concat(PORT));
});
