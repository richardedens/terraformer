import * as express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("app", {
        title: "terraformer - App Generator",
        cachebust: ("v=" + +new Date)
    });
});

export default router;
