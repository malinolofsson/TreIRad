var win = Ti.UI.currentWindow;

var player1nameTextfield = Ti.UI.createTextField({
    top: '30dp',
    left: '10dp',
    right: '10dp',
    borderColor: '#000',
    borderWidth: 1,
    hintText: 'Namn spelare ett'
});
win.add(player1nameTextfield);

var player2nameTextfield = Ti.UI.createTextField({
    top: '60dp',
    left: '10dp',
    right: '10dp',
    borderColor: '#000',
    borderWidth: 1,
    hintText: 'Namn spelare två'
});
win.add(player2nameTextfield);

var startGameButton = Ti.UI.createButton({
    title: 'Spela',
    top: '100dp',
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
    top: '250dp',
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