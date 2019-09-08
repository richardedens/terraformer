"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
// Setup server.
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var express = require("express");
var session = require("express-session");
var http = require("http");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var createError = require("http-errors");
var path = require("path");
var logger = require("morgan");
var sassMiddleware = require("node-sass-middleware");
var helmet = require("helmet");
var cors = require("cors");
var routes_1 = require("./routes");
// Setup passport.
var passport = require("passport");
var passport_local = require("passport-local");
var User_1 = require("./entity/User");
var typeorm_2 = require("typeorm");
// Setup introduction.
var intro_1 = require("../../shared/util/intro");
var intro = new intro_1.Intro();
// Start connection to the database and then start the server.
typeorm_1.createConnection().then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
    var app, port;
    var _this = this;
    return __generator(this, function (_a) {
        app = express();
        // Setup use
        passport.use(new passport_local.Strategy(function (username, password, done) { return __awaiter(_this, void 0, void 0, function () {
            var userRepository, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = typeorm_2.getRepository(User_1.default);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, userRepository.findOneOrFail({ where: { username: username } })];
                    case 2:
                        user = _a.sent();
                        if (!user || !user.checkIfUnencryptedPasswordIsValid(password)) {
                            // tslint:disable-next-line: no-null-keyword
                            return [2 /*return*/, done(new Error("password is invalid"))];
                        }
                        // tslint:disable-next-line: no-null-keyword
                        return [2 /*return*/, done(null, user)];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2 /*return*/, done(error_1)];
                    case 4: return [2 /*return*/];
                }
            });
        }); }));
        // Setup deserializedUser
        passport.deserializeUser(function (id, cb) {
            return __awaiter(this, void 0, void 0, function () {
                var userRepository, user, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userRepository = typeorm_2.getRepository(User_1.default);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, userRepository.findOneOrFail({ where: { id: id } })];
                        case 2:
                            user = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            cb(err_1);
                            return [3 /*break*/, 4];
                        case 4:
                            // tslint:disable-next-line: no-null-keyword
                            cb(null, user);
                            return [2 /*return*/];
                    }
                });
            });
        });
        // Setup serializedUser
        passport.serializeUser(function (user, cb) {
            // tslint:disable-next-line: no-null-keyword
            cb(null, user.id);
        });
        // Call midlewares
        app.use(cors());
        app.use(helmet());
        app.use(bodyParser.json());
        // This section is optional and used to configure twig.
        app.set("twig options", {
            allow_async: true,
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
        app.use("/", routes_1.default);
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
        port = process.env.PORT || 3000;
        http.createServer(app).listen(port, function () {
            intro.show("terraformer", function () {
                console.log("Server Running on http://localhost:" + port);
            });
        });
        return [2 /*return*/];
    });
}); }).catch(function (error) { return console.log(error); });
//# sourceMappingURL=server.js.map