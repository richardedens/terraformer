"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var SignInController_1 = require("../controllers/SignInController");
var passport = require("passport");
var router = express.Router();
/* GET home page. */
router.get("/", SignInController_1.default.show);
router.post("/", passport.authenticate("local", { failureRedirect: "/signin" }), function (req, res) {
    res.redirect("/");
});
exports.default = router;
//# sourceMappingURL=signin.js.map