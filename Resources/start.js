var win = Ti.UI.currentWindow;

// Ladda facebook modul
var fb = require('facebook');
// Ändra ill din facebook apps id
fb.appid = "601513196608402";

// Betyder visa dialogruta i webvy. Ändra till false för test på telefon.
fb.forceDialogAuth = true;
fb.permissions = ["user_photos"];

var userName;

var profileImage = Ti.UI.createImageView({
    height: "100dp",
    top: "30dp",
    visible: false,
});

win.add(profileImage);

// Funktion för att sätta användarens profilbild. Körs efter inloggning.
function setProfileImage() {
    fb.requestWithGraphPath("/me", {}, 'GET', function(e) {
        if (e.success) {
            fbJson = JSON.parse(e.result);

            userName = fbJson.first_name;
            userId = fbJson.id;

            profileImage.image = "https://graph.facebook.com/" + fbJson.id + "/picture";
            profileImage.show();

            console.log("User name: " + userName + " User id: " + userId);

        } else if (e.error) {
            alert(e.error);
        } else {
            alert('Unknown response');
        }
    });
}

var loginToFacebookButton = Ti.UI.createButton({
    title: "Logga in",
    width: "100dp",
    height: "50dp",
    top: "120dp"
});

loginToFacebookButton.addEventListener("click", function(e) {
    fb.authorize();
});

win.add(loginToFacebookButton);

if (fb.loggedIn) {
    setProfileImage();
    loginToFacebookButton.hide();
} else {
    loginToFacebookButton.show();
}

fb.addEventListener('login', function(e) {
    if (e.success) {
        setProfileImage();
        player1nameTextfield.hintText = userName;
        userNameLabel.text = userName;
        //  gotoAlbums.show();
        loginToFacebookButton.hide();
    } else if (e.error) {
        alert(e.error);
    } else if (e.cancelled) {
        alert("Canceled");
    }
});

var userNameLabel = Ti.UI.createLabel({
    text: "Default Name",
    top: '200dp',
    width: 'auto',
    height: 'auto'
});
win.add(userNameLabel);

//////*******

// TEZXTFIELDS
var player1nameTextfield = Ti.UI.createTextField({
     top: '200dp',
    left: '40dp',
    right: '40dp',
    borderColor: '#000',
    borderWidth: 1,
    hintText: 'Namn spelare ett'
});
win.add(player1nameTextfield);

var player2nameTextfield = Ti.UI.createTextField({
    top: '230dp',
    left: '40dp',
    right: '40dp',
    borderColor: '#000',
    borderWidth: 1,
    hintText: 'Namn spelare två'
});
win.add(player2nameTextfield);

var startGameButton = Ti.UI.createButton({
    title: 'Spela ett spel',
    top: '270dp',
    width: '100dp',
    height: '50dp',
});

startGameButton.addEventListener('click', function(e) {
    /*if (player1nameTextfield.value == '') {
        alert('Du måste skriva in namn för spelare ett');
        return;
    }
    if (player2nameTextfield.value == '') {
        alert('Du måste skriva in namn för spelare två');
        return;
    }*/
    var gameWin = Ti.UI.createWindow({
        url: 'game.js',
        backgroundColor: '#fff',
        p1name: userName,//player1nameTextfield.value,
        p2name: "Spelare 2",//player2nameTextfield.value,
        gametype: 'win1'
    });

    gameWin.open();

});
win.add(startGameButton);

var start3GameButton = Ti.UI.createButton({
    title: 'Spela först till tre',
    top: '320dp',
    width: 'auto',
    height: '50dp',
});

start3GameButton.addEventListener('click', function(e) {
    /*if (player1nameTextfield.value == '') {
        alert('Du måste skriva in namn för spelare ett');
        return;
    }
    if (player2nameTextfield.value == '') {
        alert('Du måste skriva in namn för spelare två');
        return;
    }*/
    var gameWin = Ti.UI.createWindow({
        url: 'game.js',
        backgroundColor: '#fff',
        p1name: userName,//player1nameTextfield.value,
        p2name:"hej2", //player2nameTextfield.value,
        gametype: 'win3'
    });

    gameWin.open();

});

win.add(start3GameButton); 

var resumeGameButton = Ti.UI.createButton({
    title: 'Återgå till spel',
    top: '370dp',
    width: 'auto',
    height: '50dp',
});


resumeGameButton.addEventListener('click', function(e) {
   /* if (player1nameTextfield.value == '') {
        alert('Du måste skriva in namn för spelare ett');
        return;
    }
    if (player2nameTextfield.value == '') {
        alert('Du måste skriva in namn för spelare två');
        return;
    }*/
    var resumeGameWin = Ti.UI.createWindow({
        url: 'resumeGame.js',
        backgroundColor: '#fff',
        p1name: player1nameTextfield.value,
        p2name: player2nameTextfield.value,
        //gametype: 'win3'
    });

    resumeGameWin.open();

});

win.add(resumeGameButton); 