import express from "express";
import homecontrollers from "../controllers/homecontrollers";
import trafficlawscontrollers from "../controllers/trafficlawscontrollers";

let routes = express.Router();

let initwebroutes = (app) => {
    routes.get("/", homecontrollers.gethomepage)
    //setup get started button, whitelistens domain
    routes.post('/setup-profile', homecontrollers.setupprofile)
    //setup presistend menu
    routes.post('/setup-persistent-menu', homecontrollers.setuppersistentmenu)
    routes.post('/webhook', homecontrollers.postwebhook);
    routes.get('/webhook', homecontrollers.getwebhook);
    routes.get('/reserve-table', homecontrollers.handlereservetable);
    routes.post('/reserve-table-ajax', homecontrollers.handlepostreservetable);


    //trafficlawscontrollers
    routes.get('/trafficlaws', trafficlawscontrollers.getAlltrafficlaws);
    routes.get('/create-trafficlaws', trafficlawscontrollers.displayCreatetrafficlaws);
    routes.get('/update-trafficlaws/:id', trafficlawscontrollers.displayUpdatetrafficlaws);
    routes.get('/view-trafficlaws/:id', trafficlawscontrollers.displayViewtrafficlaws);
    routes.post('/post-updateTrafficlaws', trafficlawscontrollers.handleUpdatetrafficlaws);
    routes.post('/post-deleteTrafficlaws/:id', trafficlawscontrollers.handleDeletetrafficlaws);
    routes.post('/post-createTrafficlaws', trafficlawscontrollers.handleCreatetrafficlaws);

    return app.use("/", routes);


}

module.exports = initwebroutes;