let dataCall = async () => {

  //Simulera en vänte-tid
  //await new Promise(r => setTimeout(r, 2000));

  // Skicka en GET request till /data
  const resp = await fetch("/data")

  //Hantera payload från respons
  const arrData = await resp.json()

  //Skapa en loop som loopar varje post i arrData
  arrData.forEach(person => {
    //document.getElementById("dataOutput").innerText = person.name

    //Skapa ett nytt HTML element för varje post i lista
    let element = document.createElement("p")

    //TIlldela ett textvärde i elementet
    element.innerText = `Mitt namn är ${person.name} och jag är ${person.age} år gammal`

    document.getElementById("dataOutput").appendChild(element)
  });

  //Skriv ut meddelande till Div tag.
  //document.getElementById("dataOutput").innerText = message
};

dataCall()

// document.getElementById("tempOut").innerText = "Hello World!"