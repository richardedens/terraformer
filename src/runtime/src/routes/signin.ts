import * as express from "express";
import SignInController from "../controllers/SignInController";
import { Request, Response } from "express";
import * as passport from "passport";

const router = express.Router();

/* GET home page. */
router.get("/", SignInController.show);

router.post("/", passport.authenticate("local", { failureRedirect: "/signin" }), (req: Request, res: Response) => {
    res.redirect("/");
});


export default router;
