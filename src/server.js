import express from "express";
import bodyParser from "body-parser";
import viewengine from "./configs/viewengine";
import webroutes from "./routes/web";
import path from "path";

let app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
//config view engine 
viewengine(app);

//config routes
webroutes(app);


let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("app is runing at the port: " + port)
})
