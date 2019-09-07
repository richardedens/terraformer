import User from "../entity/User";
import { getRepository } from "typeorm";
import * as passport from "passport";

passport.use(require("passport-local")({
    usernameField: "user[username]",
    passwordField: "user[password]",
}, async (username, password, done) => {

    const userRepository = getRepository(User);
    let user: User;
    // @ts-ignore
    try {
        user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
        // tslint:disable-next-line: no-null-keyword
        return done(null, false, { errors: { "username or password": "is invalid" } });
    }

    // @ts-ignore
    if (!user || !user.checkIfUnencryptedPasswordIsValid(password)) {
        // tslint:disable-next-line: no-null-keyword
        return done(null, false, { errors: { "username or password": "is invalid" } });
    }

    // tslint:disable-next-line: no-null-keyword
    return done(null, user);
}));