
//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
      apiKey: "AIzaSyCs6QfOzlDBe34suQh6uGX9CDcyHk9ZvHg",
      authDomain: "kwitter-31b1f.firebaseapp.com",
      databaseURL: "https://kwitter-31b1f-default-rtdb.firebaseio.com",
      projectId: "kwitter-31b1f",
      storageBucket: "kwitter-31b1f.appspot.com",
      messagingSenderId: "383385612359",
      appId: "1:383385612359:web:326c14544632b45a5ac162"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

var user_name= localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML= "Welcome " + user_name + "!";

function addRoom() {
      roomname= document.getElementById("roomname").value;
      localStorage.setItem("roomname", roomname);
      firebase.database().ref("/").child(roomname).update({
            purpose : "creating new room name"
      });
      window.location= "kwitter_page.html";
};

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML= " ";
            snapshot.forEach(function (snapshot) {
                  childKey= snapshot.key;
                  Room_names= childKey;
                  console.log("room name - " + Room_names);
                  row= "<div class='room_name' id='" + Room_names + "' onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div><br>";
                  original_output= document.getElementById("output").innerHTML;
                  document.getElementById("output").innerHTML= original_output + row;
            });
      });
};
getData();

function redirectToRoomName(name) {
      localStorage.setItem("roomname", name);
      window.location= "kwitter_page.html";
};

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("roomname");
      window.location= "index.html";
};