import express from "express";
import homecontrollers from "../controllers/homecontrollers";
let routes = express.Router();

let initwebroutes = (app) => {
    routes.get("/", homecontrollers.gethomepage)
    //setup get started button, whitelistens domain
    routes.post('/setup-profile', homecontrollers.setupprofile)
    //setup presistend menu
    routes.post('/setup-persistent-menu', homecontrollers.setuppersistentmenu)
    routes.post('/webhook', homecontrollers.postwebhook);
    routes.get('/webhook', homecontrollers.getwebhook);
    return app.use("/", routes);


}

module.exports = initwebroutes;