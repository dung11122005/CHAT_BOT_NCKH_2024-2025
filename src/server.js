import express from "express";
import bodyParser from "body-parser";
import viewengine from "./configs/viewengine";
import webroutes from "./routes/web";

let app = express();

//config view engine 
viewengine(app);

//config routes
webroutes(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("app is runing at the port: " + port)
})
