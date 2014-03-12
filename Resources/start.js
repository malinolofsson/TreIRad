var win = Ti.UI.currentWindow;

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
    if (player1nameTextfield.value == '') {
        alert('Du måste skriva in namn för spelare ett');
        return;
    }
    if (player2nameTextfield.value == '') {
        alert('Du måste skriva in namn för spelare två');
        return;
    }
    var gameWin = Ti.UI.createWindow({
        url: 'game.js',
        backgroundColor: '#fff',
        p1name: player1nameTextfield.value,
        p2name: player2nameTextfield.value,
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
    if (player1nameTextfield.value == '') {
        alert('Du måste skriva in namn för spelare ett');
        return;
    }
    if (player2nameTextfield.value == '') {
        alert('Du måste skriva in namn för spelare två');
        return;
    }
    var gameWin = Ti.UI.createWindow({
        url: 'game.js',
        backgroundColor: '#fff',
        p1name: player1nameTextfield.value,
        p2name: player2nameTextfield.value,
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