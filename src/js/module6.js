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
    client.subscribe("module_6/relay");

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

  if(message.destinationName == "module_6/relay"){
    if(message.payloadString == "0"){
        let lampOffStat = document.getElementById("lampOffStat");
        lampOffStat.classList.add("visually-hidden");
        let lampOnStat = document.getElementById("lampOnStat");
        lampOnStat.classList.remove("visually-hidden");

        let sensorOffStat = document.getElementById("sensorOffStat");
        sensorOffStat.classList.add("visually-hidden");
        let sensorOnStat = document.getElementById("sensorOnStat");
        sensorOnStat.classList.remove("visually-hidden");
    }else {
        let lampOnStat = document.getElementById("lampOnStat");
        lampOnStat.classList.add("visually-hidden");
        let lampOffStat = document.getElementById("lampOffStat");
        lampOffStat.classList.remove("visually-hidden");

        let sensorOnStat = document.getElementById("sensorOnStat");
        sensorOnStat.classList.add("visually-hidden");
        let sensorOffStat = document.getElementById("sensorOffStat");
        sensorOffStat.classList.remove("visually-hidden");
    }
  }
}

