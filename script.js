let dataCall = async () => {

  //Simulera en vänte-tid
  //await new Promise(r => setTimeout(r, 2000));

  // Skicka en GET request till /data
  const resp = await fetch("/data")

  //Hantera payload från respons
  const message = await resp.text()

  //Skriv ut meddelande till Div tag.
  document.getElementById("dataOutput").innerText = message
};

dataCall()

// document.getElementById("tempOut").innerText = "Hello World!"