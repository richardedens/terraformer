"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var loginCheck = require("connect-ensure-login");
var router = express.Router();
/* GET home page. */
// @ts-ignore
router.get('/', loginCheck.ensureLoggedIn({ redirectTo: "/signin" }), function (req, res, next) {
    res.render('vs', {
        title: 'OpenPEN - App Generator',
        cachebust: ('v=' + +new Date)
    });
});
exports.default = router;
//# sourceMappingURL=vs.js.map