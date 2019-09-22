import { Request, Response } from "express";

class HomepageController {
    static show = async (req: Request, res: Response) => {
        res.render("homepage", {
            title: "terraformer.app - webapp architect and generator",
            cachebust: ("v=" + +new Date)
        });
    };
}

export default HomepageController;