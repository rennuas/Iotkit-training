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
    client.subscribe("module_7/ls");

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

  if(message.destinationName == "module_7/ls"){
    updateGauge(parseInt(message.payloadString));
  }
}

// Configuration options for the gauge
var gaugeOptions = {
    id: "gauge-container", // Element ID
    value: 0,   // Initial value
    min: 0,      // Minimum value
    max: 1000,    // Maximum value
    label: "LUX",       // Label
    labelFontColor: "#333",
    gaugeWidthScale: 1.5,  // Width of the gauge
    counter: true,         // Show or hide the counter
    levelColors: ["#ff0000", "#ffa500", "#00ff00"], // Colors for different levels
  };

  // Create the gauge
  var gauge = new JustGage(gaugeOptions);

  // Update the gauge value (you can do this dynamically)
  function updateGauge(newValue) {
    gauge.refresh(newValue);
  }
