console.log("Server starting");

import Http = require("http");
import Url = require("url");

interface AssocStringString {
    [key: string]: string;
}

let port: number = process.env.PORT;
if (port == undefined)
    port = 8100;

let server: Http.Server = Http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);

function handleListen(): void {
    console.log("Listening on port: " + port);
}

function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    console.log("Request received");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    console.log(_request.url);
    
    let query: AssocStringString = Url.parse(_request.url, true).query;
    console.log(query);
//    let key: string;
//    for (key in query){
//        _response.write(key + ":" + query[key]);
//    }

    _response.write("Herzlichen Glückwunsch! Deine Bestellung wurde versandt!"+"<br>");
     _response.write("Deine Bestellung: " +"<br>"+ query["Eissorte"]+"<br>"+ query["Topping"]+"<br>"+ query["Behälter"]+"<br>");
    _response.write("Deine Bestellung geht an folgende Lieferadresse: "+"<br>" + query["Anrede"] + query["Name, Vorname"] +"<br>" + query["Adresse"] + "<br>"+ query["PLZ,Ort"] + "<br>");
    _response.write("Wir kontktieren Dich auf folgendem Weg falls es Verzögerungen gibt: " + query["Telefonnummer"]+"<br>" );
    _response.write("Du erhälst eine Bestellbestätigung an folgende Mail: " + query["Mail"]+"<br>");

 
    
    
    
    _response.end();
}
