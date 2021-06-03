//YOUR FIREBASE LINKS
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
var room_name= localStorage.getItem("roomname");
var message= " ";

function send() {
      message= document.getElementById("message").value;
      firebase.database().ref(room_name).push({
            name : user_name,
            message : message,
            likes : 0
      });
      document.getElementById("message").value= " ";
};

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML= " ";
            snapshot.forEach(function (snapshot) {
                  childKey= snapshot.key;
                  childData= snapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id= childKey;
                        message_data= childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        var user_name_tag= "<h4>" + message_data['name'] + "<img class='user_tick' src='tick.png'></h4>";
                        var message_tag= "<h4 class='message_h4'>" + message_data['message'] + "</h4>";
                        var button_tag= "<button id='" + firebase_message_id + "' class='btn btn-warning' value='" + message_data['likes'] + "' onclick='updateLikes(this.id)'><span class='glyphicon glyphicon-thumbs-up'>Likes: " + message_data['likes'] + "</span></button><hr>";
                        var row= user_name_tag + message_tag + button_tag;
                        document.getElementById("output").innerHTML += row;
                        //End code
                  };
            });
      });
};
getData();

function updateLikes(message_id) {
      console.log("like button clicked in" + message_id);
      var likes= document.getElementById(message_id).value;
      var updated_likes= parseInt(likes) + 1;
      firebase.database().ref("/" + room_name + "/" + message_id).update({
            likes : updated_likes
      });
};

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("roomname");
      window.location= "index.html";
};
