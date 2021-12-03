let connection = new WebSocket("ws://localhost:9090");
let name = "";

let loginInput = document.querySelector("#loginInput");
let loginBtn = document.querySelector("#loginBtn");
let otherUsernameInput = document.querySelector("#otherUsernameInput");
let connectToOtherUsernameBtn = document.querySelector("#otherUsernameInput");
let connectedUser, myConnection;

loginBtn.addEventListener("click", function (event) {
  name = loginInput.value;

  if (name.length > 0) {
    send({
      type: "login",
      name: name,
    });
  }
});

connection.onmessage = function (message) {
  console.log("Got message", message.data);

  switch (data.type) {
    case "login":
      onLogin(data.success);
      break;
    case "offer":
      onOffer(data.offer, data.name);
      break;
    case "answer":
      onAnswer(data.answer);
      break;
    case "candidate":
      onCandidate(data.candidate);
      break;
    default:
      break;
  }
};

function onLogin(success) {
  if (success === false) {
    alert("Nope, try a different username");
  } else {
    const configuration = {
      iceServers: [{ url: "stun:stun.1.google.com:19302" }],
    };

    myConnection = new webkitRTCPeerConnection(configuration);
    console.log("RTCPeerConnection object was created");
    console.log(myConnection);

    myConnection.onicecandidate = function (event) {
      if (event.candidate) {
        send({
          type: "candidate",
          candidate: event.candidate,
        });
      }
    };
  }
}

connection.onopen = function () {
  console.log("Connected");
};

connection.onerror = function (err) {
  console.log("Got error", err);
};

function send(message) {
  if (connectedUser) {
    message.name = connectedUser;
  }
  connection.send(JSON.stringify(message));
}
