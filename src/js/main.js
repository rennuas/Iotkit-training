// Create a client instance
const id= Math.random();
client = new Paho.MQTT.Client('a42a0cedeea647cb99d5cb2023cbb3f4.s1.eu.hivemq.cloud', Number(8884), "clientId-" + id);

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
    client.subscribe("module_1/led");
    client.subscribe("module_9/pir");

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

  if(message.destinationName == "module_1/led"){
    if(message.payloadString == "1"){
        let relayOffStat = document.getElementById("relayOffStat");
        relayOffStat.classList.add("visually-hidden");
        let relayOnStat = document.getElementById("relayOnStat");
        relayOnStat.classList.remove("visually-hidden");
    }else {
        let relayOnStat = document.getElementById("relayOnStat");
        relayOnStat.classList.add("visually-hidden");
        let relayOffStat = document.getElementById("relayOffStat");
        relayOffStat.classList.remove("visually-hidden");
    }
  }

  if(message.destinationName == "module_2/buzzer"){
    if(message.payloadString == "1"){
        let buzzerOffStat = document.getElementById("buzzerOffStat");
        buzzerOffStat.classList.add("visually-hidden");
        let buzzerOnStat = document.getElementById("buzzerOnStat");
        buzzerOnStat.classList.remove("visually-hidden");
    }else {
        let buzzerOnStat = document.getElementById("buzzerOnStat");
        buzzerOnStat.classList.add("visually-hidden");
        let buzzerOffStat = document.getElementById("buzzerOffStat");
        relayOffStat.classList.remove("visually-hidden");
    }
  }

  if(message.destinationName == "module_9/pir"){
    if(message.payloadString == "1"){
        let notDetectedStat = document.getElementById("notDetectedStat");
        notDetectedStat.classList.add("visually-hidden");
        let detectedStat = document.getElementById("detectedStat");
        detectedStat.classList.remove("visually-hidden");
    }else {
        let detectedStat = document.getElementById("detectedStat");
        detectedStat.classList.add("visually-hidden");
        let notDetectedStat = document.getElementById("notDetectedStat");
        notDetectedStat.classList.remove("visually-hidden");
    }
  }
}

document.getElementById("module2SwitchOn").addEventListener("click", function() {
    message = new Paho.MQTT.Message("1");
    message.destinationName = "module_2/buzzer";
    client.send(message); 
});

document.getElementById("module2SwitchOff").addEventListener("click", function() {
    message = new Paho.MQTT.Message("0");
    message.destinationName = "module_2/buzzer";
    client.send(message); 
});

document.getElementById("module1SwitchOn").addEventListener("click", function() {
    message = new Paho.MQTT.Message("1");
    message.destinationName = "module_1/led";
    client.send(message); 
});

document.getElementById("module1SwitchOff").addEventListener("click", function() {
    message = new Paho.MQTT.Message("0");
    message.destinationName = "module_1/led";
    client.send(message); 
});