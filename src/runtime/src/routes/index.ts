import { Router, Request, Response } from "express";
import homepage from "./homepage";
import signin from "./signin";
import vs from "./vs";
import user from "./user";
import bpmn from "./bpmn";
import app from "./app";
import dashboard from "./dashboard";

// API
import apiV1Mendix from "./api/v1/mendix";

const routes = Router();

// API
routes.use("/api/v1/mendix", apiV1Mendix);

// Page
routes.use("/", homepage);
routes.use("/signin", signin);
routes.use("/user", user);
routes.use("/bpmn", bpmn);
routes.use("/vs", vs);
routes.use("/dashboard", dashboard);
routes.use("/dock", app);

export default routes;