import * as express from "express";
import * as loginCheck from "connect-ensure-login";
const router = express.Router();

/* GET home page. */
router.get("/", loginCheck.ensureLoggedIn({ redirectTo: "/signin" }), (req, res, next) => {
    res.render("dashboard", {
        title: "terraformer - App Generator",
        cachebust: ("v=" + +new Date)
    });
});

export default router;
