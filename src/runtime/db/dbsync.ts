// Setup server.
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Intro } from "../../shared/util/intro";
const intro = new Intro();

// Start connection to the database and then start the server.
intro.show("terraformer", () => {
    console.log("Starting to synchronize database");
    createConnection().then(async connection => {

        await connection.synchronize();
        console.log("--> Synchronized database");
        connection.close();

    }).catch(error => console.log(error));
});