// Setup server.
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as session from "express-session";
import * as http from "http";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as createError from "http-errors";
import * as path from "path";
import * as logger from "morgan";
import * as sassMiddleware from "node-sass-middleware";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";

// Setup passport.
import * as passport from "passport";
import * as passport_local from "passport-local";
import User from "./entity/User";
import { getRepository } from "typeorm";

// Setup introduction.
import { Intro } from "../../shared/util/intro";
import { ɵLOCALE_DATA, LOCALE_ID } from "@angular/core";
const intro = new Intro();

// Start connection to the database and then start the server.
createConnection().then(async connection => {

    const app = express();

    // Setup use
    passport.use(new passport_local.Strategy(async (username, password, done) => {
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { username } });
            
            if (!user || !user.checkIfUnencryptedPasswordIsValid(password)) {
                // tslint:disable-next-line: no-null-keyword
                return done(new Error("password is invalid"));
            }

            // tslint:disable-next-line: no-null-keyword
            return done(null, user);
        } catch (error) {
            console.log(error);
            return done(error);
        }
    }));

    // Setup deserializedUser
    passport.deserializeUser(async function (id, cb) {
        const userRepository = getRepository(User);
        let user: User;
        // @ts-ignore
        try {
            user = await userRepository.findOneOrFail({ where: { id } });
        } catch (err) {
            cb(err);
        }
        // tslint:disable-next-line: no-null-keyword
        cb(null, user);
    });

    // Setup serializedUser
    passport.serializeUser(function (user: User, cb) {
        // tslint:disable-next-line: no-null-keyword
        cb(null, user.id);
    });

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    // This section is optional and used to configure twig.
    app.set("twig options", {
        allow_async: true, // Allow asynchronous compiling
        strict_variables: false
    });

    // view engine setup
    app.set("views", path.join(__dirname, "../../../views"));
    app.set("view engine", "twig");

    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(sassMiddleware({
        src: path.join(__dirname, "../../../public"),
        dest: path.join(__dirname, "../../../public"),
        indentedSyntax: true // true = .sass and false = .scss
    }));
    app.use(session({ secret: "terraformer-tiger-secret", cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(path.join(__dirname, "../../../public")));

    // Index
    app.use("/", routes);

    // catch 404 and forward to error handler
    // @ts-ignore
    app.use(function (req, res, next) {
        next(createError(404));
    });

    // error handler
    // @ts-ignore
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render("error");
    });

    // Set port
    const port = process.env.PORT || 3000;
    http.createServer(app).listen(port, () => {
        intro.show("terraformer", () => {
            console.log("Server Running on http://localhost:" + port);
        });
    });

}).catch(error => console.log(error));