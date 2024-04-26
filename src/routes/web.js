import express from "express";
import homecontrollers from "../controllers/homecontrollers";
let routes = express.Router();

let initwebroutes = (app) => {
    routes.get("/", homecontrollers.gethomepage)
    routes.post('/setup-profile', homecontrollers.setupprofile)
    routes.post('/webhook', homecontrollers.postwebhook);
    routes.get('/webhook', homecontrollers.getwebhook);
    return app.use("/", routes);


}

module.exports = initwebroutes;