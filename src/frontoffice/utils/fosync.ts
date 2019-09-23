import { Intro } from "../../shared/util/intro";
import * as fs from "fs-extra";
import * as path from "path";
const intro = new Intro();

intro.show("terraformer", () => {
    console.log("Syncing front-end angular app with express server.");

    try {
        fs.copySync(path.join(__dirname, "../app"), path.join(__dirname, "../../../../public/"));
        console.log("--> Synchronized angular app");
    } catch(e) {
        console.info("Could not copy the angular app to its destination.");
        console.error(e);
    }

});