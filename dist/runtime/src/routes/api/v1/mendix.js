"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
/* GET home page. */
router.get("/projects/", function (req, res, next) {
    res.json({ success: true });
});
/* GET home page. */
router.get("/", function (req, res, next) {
    res.json({ success: true });
});
exports.default = router;
//# sourceMappingURL=mendix.js.map