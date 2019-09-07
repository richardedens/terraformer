"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("app", {
        title: "terraformer - App Generator",
        cachebust: ("v=" + +new Date)
    });
});
exports.default = router;
//# sourceMappingURL=app.js.map