// Deklarera deppendencies och konstatna variabler
const express = require("express")
const app = new express()
const portNr = 8080

//Hämta in Body-Parser
const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Hämta in fs och deklarera filsökväg
const fs = require("fs");
const jsonFilePath = "./data.json";

//Skapa en Listen metod
app.listen(portNr, () => {
  console.log("Service ligger nu på 8080 och lyssnar")
} )

//Skapa en GET metod till ROOT adressen
app.get("", (req, res) => {
  //res representerar responsen. Returnera ett meddelande
  res.send("Hälsning från Server 1!")
})

//Skapa en Get Endpoint med annan URL
app.get("/about", (req, res) => {
  res.sendFile("about.html", {root: __dirname})
  //res.send("About")
})

//Skapa en POST metod
app.post("", (req, res) => {
  //I req.body ligger inkommande payload
  const payload = req.body
  //Payload innehhållet 2st attribut; name, age
  //Skicka tillbaka response
  //res.send("Mitt namn är " + payload.name + " och jag är " + payload.age + " år gammal!")
  res.send(`Mitt namn är ${payload.name} och jag är ${payload.age} år gammal`)
})