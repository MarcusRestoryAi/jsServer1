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
  console.log(`Service ligger nu på ${portNr} och lyssnar`)
} )

//Skapa en GET metod till ROOT adressen
app.get("", (req, res) => {
  //res representerar responsen. Returnera ett meddelande
  //res.send("Hälsning från Server 1!")
  res.sendFile("index.html", {root: __dirname})
})

//Skapa en Get Endpoint med annan URL
app.get("/about", (req, res) => {
  res.sendFile("about.html", {root: __dirname})
  //res.send("About")
})

//Skapa en POST metod
app.post("/data", (req, res) => {
  //I req.body ligger inkommande payload
  const payload = req.body
  //Payload innehhållet 2st attribut; name, age

  //Hämta den befintliga datan från .json fil
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {

    //Kontrollera error. Om ett error finns, avsluta metoden
    if (err) {
      console.log(err)
      return
    }

    let arrData;
    //Kontrollera att data från .json fil finns
    if (data) arrData = JSON.parse(data)
    else arrData = []

    //Placerar in Payload data till Lista/Array
    arrData.push(payload)

    //JSON-stringify payload
    const jsonData = JSON.stringify(arrData, null, 2)

    //Spara JSON-data till fil
    fs.writeFile(jsonFilePath, jsonData, (err) => {
      if (err) console.log(err)
    })

    //Skicka tillbaka response
    res.send(`Data sparad: ${jsonData}`)

  })
  //res.send("Mitt namn är " + payload.name + " och jag är " + payload.age + " år gammal!")
  //res.send(`Mitt namn är ${payload.name} och jag är ${payload.age} år gammal`)
})

//Skapa en GET Endpoint för att hämta data från .json fil
app.get("/data", (req, res) => {

  //Öppna .json fil
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {

    //Kontrollera error. Om ett error finns, avsluta metoden
    if (err) {
      console.log(err)
      return
    }

    //Returnera JSON sträng
    res.send(data)

    /*
    //konvertera JSON till JS struct
    const jsData = JSON.parse(data)

    //Skicka en response tillbaka
    res.send(`Mitt namn är ${jsData.name} och jag är ${jsData.age} år gammal`)
    */
  })
})

//Get ednpoint för script.js
app.get("/script", (req, res) => {
  res.sendFile("script.js", {root: __dirname})
})