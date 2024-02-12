// Create a client instance
const id= Math.random();
client = new Paho.MQTT.Client('6315efe699464371a7a7ca7423114c9a.s2.eu.hivemq.cloud', Number(8884), "clientId-" + id);

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect, userName : 'iotkit', password : 'Pns12345', useSSL: true});

// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    console.log(`id: clientId-${id}`);
    client.subscribe("module_3/led/#");

    let switchsOn = document.querySelectorAll(".btnOn");

    switchsOn.forEach(function(button, i){
      button.addEventListener("click", function(){
        message = new Paho.MQTT.Message("1");
        message.destinationName = `module_3/led/${i+1}`;
        client.send(message); 
      })
    })

    let switchsOff = document.querySelectorAll(".btnOff");

    switchsOff.forEach(function(button, i){
      button.addEventListener("click", function(){
        message = new Paho.MQTT.Message("0");
        message.destinationName = `module_3/led/${i+1}`;
        client.send(message); 
      })
    })

    let connectionStatusIcon = document.querySelector("#connectionStatus i");
    connectionStatusIcon.classList.add("text-success");
    connectionStatusIcon.classList.remove("text-danger");
    let connectionStatusText = document.querySelector("#connectionStatus span");
    connectionStatusText.innerHTML = "Connected";
    
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
    let connectionStatusIcon = document.querySelector("#connectionStatus i");
    connectionStatusIcon.classList.remove("text-success");
    connectionStatusIcon.classList.add("text-danger");
    let connectionStatusText = document.querySelector("#connectionStatus span");
    connectionStatusText.innerHTML = "Not Connected";
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);

  for (let i = 1; i <= 10; i++) {
    if(message.destinationName == `module_3/led/${i}`){
      if(message.payloadString == "1"){
          let ledOffStat = document.getElementById(`ledOffStat${i}`);
          ledOffStat.classList.add("visually-hidden");
          let ledOnStat = document.getElementById(`ledOnStat${i}`);
          ledOnStat.classList.remove("visually-hidden");
      }else {
          let ledOnStat = document.getElementById(`ledOnStat${i}`);
          ledOnStat.classList.add("visually-hidden");
          let ledOffStat = document.getElementById(`ledOffStat${i}`);
          ledOffStat.classList.remove("visually-hidden");
      }
    }
  }
  
}

