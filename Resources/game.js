var win = Ti.UI.currentWindow;

var currentPlayer = 0;

var player1wins = 0;
var player2wins = 0;

var tileColor = '#0f0';
var player1Color = '#f00';
var player2Color = '#00f';

var player1name = win.p1name;
var player2name = win.p2name;

function checkOneRow(wc, t1, t2, t3) {
    if (wc != '') {
        return wc;
    }
    if (tiles[t1].backgroundColor == tiles[t2].backgroundColor && tiles[t2].backgroundColor == tiles[t3].backgroundColor) {
        if (tiles[t1].backgroundColor != tileColor) {
            return tiles[t1].backgroundColor;
        }
    }
    return '';
}

function checkWon() {
    wonColor = '';

    //rader
    wonColor = checkOneRow(wonColor, 0, 1, 2);
    wonColor = checkOneRow(wonColor, 3, 4, 5);
    wonColor = checkOneRow(wonColor, 6, 7, 8);

    //columner
    wonColor = checkOneRow(wonColor, 0, 3, 6);
    wonColor = checkOneRow(wonColor, 2, 4, 7);
    wonColor = checkOneRow(wonColor, 2, 5, 8);

    //diagonaler
    wonColor = checkOneRow(wonColor, 0, 4, 8);
    wonColor = checkOneRow(wonColor, 2, 4, 6);

    isDraw = true;
    for ( i = 0; i < 9; i++) {
        if (tiles[i].backgroundColor == tileColor) {
            isDraw = false;
        }
    }

    if (wonColor == player1Color) {
        // alert(player1name + ' vann!');
        wontext = player1name + ' vann!';

        player1wins++;
        wonCountLabel.text = player1name + ': ' + player1wins + ' ' + player2name + ': ' + player2wins;
    }
    if (wonColor == player2Color) {
        wontext = player2name + ' vann!';

        player2wins++;
        wonCountLabel.text = player1name + ': ' + player1wins + ' ' + player2name + ': ' + player2wins;
        // alert(player2name + ' vann!!');
    }

    if (wonColor != tileColor && wonColor != '') {

        if (win.gametype == 'win3' && player1wins < 3 && player2wins < 3) {
            for (var i = 0; i < 9; i++) {
                tiles[i].backgroundColor = tileColor;
            }
            return;
        }

        var dialog = Ti.UI.createAlertDialog({
            title: 'Vinnare!',
            message: wontext,
            // style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Sluta spela!', 'Spela igen!']
        });
        dialog.addEventListener('click', function(e) {
            if (e.index == 0) {
                win.close();
            } else {
                player1wins = 0;
                player2wins = 0;
                wonCountLabel.text = player1name + ': ' + player1wins + ' ' + player2name + ': ' + player2wins;

                for (var i = 0; i < 9; i++) {
                    tiles[i].backgroundColor = tileColor;
                }
            }
        });
        dialog.show();
        return;
    }

    if (isDraw) {
        var dialog = Ti.UI.createAlertDialog({
            title: 'Det blev oavgjort!',
            message: 'Ingen vann!',
            // style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
            buttonNames: ['Sluta spela!', 'Spela igen!']
        });
        dialog.addEventListener('click', function(e) {
            if (e.index == 0) {
                win.close();
            } else {
                for (var i = 0; i < 9; i++) {
                    tiles[i].backgroundColor = tileColor;
                }
            }
        });
        dialog.show();
    }
}

var navView = Ti.UI.createView({
    top: '0dp',
    height: '64dp',
    backgroundColor: '#cccccc'
});
win.add(navView);

var closeGameButton = Ti.UI.createButton({
    title: 'Stäng',
    width: 'auto',
    height: 'auto',
    left: '6dp',
    top: '20dp',
});
closeGameButton.addEventListener('click', function(e) {
    win.close();
});

navView.add(closeGameButton);




var playerInfoView = Ti.UI.createView({
    top: '64dp',
    height: '86dp',
    backgroundColor: 'yellow'
});
win.add(playerInfoView);

var wonCountLabel = Ti.UI.createLabel({
    text: player1name + ': ' + player1wins + ' ' + player2name + ': ' + player2wins,
    //bottom: 0,
    top: '50dp',
    backgroundColor: 'red',
});
playerInfoView.add(wonCountLabel);

if(win.gametype == 'win1'){
    wonCountLabel.hide;
}

var currentPlayerLabel = Ti.UI.createLabel({
    text: 'Det är din tur: ' + player1name,
    top: '20dp',
});

playerInfoView.add(currentPlayerLabel);





var gameView = Ti.UI.createView({
    top: '150dp',
    //ÄR HÖG SOM SKÄRMEN ÄR BRED
    height: Ti.Platform.displayCaps.platformWidth,
    backgroundColor: player1Color
});
win.add(gameView);

var tileSize = Ti.Platform.displayCaps.platformWidth / 3;

var tiles = [];
for ( i = 0; i < 9; i++) {
    tiles[i] = Ti.UI.createView({
        width: tileSize,
        height: tileSize,
        backgroundColor: tileColor,
        borderColor: '#000',
        borderWidth: 1,
        tile_number: i
    });
    tiles[i].addEventListener('click', function(e) {
        //   alert(e.source.tile_number);
        if (e.source.backgroundColor != tileColor) {
            alert('Redan tryckt på!');
            return;
        }

        if (currentPlayer == 0) {
            e.source.backgroundColor = player1Color;
            currentPlayer = 1;
            currentPlayerLabel.text = 'Det är din tur: ' + player2name;
        } else {
            e.source.backgroundColor = player2Color;
            currentPlayer = 0;
            currentPlayerLabel.text = 'Det är din tur: ' + player1name;
        }

        checkWon();
    });

    gameView.add(tiles[i]);
}

tiles[0].left = 0;
tiles[0].top = 0;

tiles[1].top = 0;

tiles[2].top = 0;
tiles[2].right = 0;

tiles[3].left = 0;

tiles[5].right = 0;

tiles[6].left = 0;
tiles[6].bottom = 0;

tiles[7].bottom = 0;

tiles[8].right = 0;
tiles[8].bottom = 0;

