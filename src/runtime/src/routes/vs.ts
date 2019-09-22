import * as express from "express";
import * as loginCheck from "connect-ensure-login";

const router = express.Router();

/* GET home page. */
// @ts-ignore
router.get('/', loginCheck.ensureLoggedIn({ redirectTo: "/signin" }), (req, res, next) => {
    res.render('vs', {
        title: 'terraformer.app - webapp architect and generator',
        cachebust: ('v=' + +new Date)
    });
});

export default router;
