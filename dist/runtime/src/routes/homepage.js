"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var HomepageController_1 = require("../controllers/HomepageController");
var loginCheck = require("connect-ensure-login");
var router = express.Router();
/* GET home page. */
router.get("/", loginCheck.ensureLoggedIn({ redirectTo: "/signin" }), HomepageController_1.default.show);
exports.default = router;
//# sourceMappingURL=homepage.js.map