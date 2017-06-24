"use strict";
console.log("Server starting");
const Http = require("http");
const Url = require("url");
let port = process.env.PORT;
if (port == undefined)
    port = 8100;
let server = Http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);
function handleListen() {
    console.log("Listening on port: " + port);
}
function handleRequest(_request, _response) {
    console.log("Request received");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    console.log(_request.url);
    let query = Url.parse(_request.url, true).query;
    console.log(query);
    //    let key: string;
    //    for (key in query){
    //        _response.write(key + ":" + query[key]);
    //    }
    _response.write("Herzlichen Glückwunsch! Deine Bestellung wurde versandt!" + "<br>" + "<br>");
    _response.write("Deine Bestellung geht an folgende Lieferadresse: " + "<br>" + "<br>" + query["Anrede"] + "<br>" + query["Name, Vorname"] + "<br>" + query["Adresse"] + "<br>" + query["PLZ,Ort"] + "<br>" + "<br>");
    _response.write("Wir kontktieren Dich auf folgendem Weg falls es Verzögerungen gibt: " + query["Telefonnummer"] + "<br>");
    _response.write("Du erhälst eine Bestellbestätigung an folgende Mail: " + query["Mail"] + "<br>");
    _response.end();
}
//# sourceMappingURL=NodeTest.js.map