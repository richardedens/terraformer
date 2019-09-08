import * as express from "express";
import * as passport from "passport";
import HomepageController from "../controllers/HomepageController";
import * as loginCheck from "connect-ensure-login";

const router = express.Router();

/* GET home page. */
router.get("/", loginCheck.ensureLoggedIn({ redirectTo: "/signin" }), HomepageController.show);

export default router;
