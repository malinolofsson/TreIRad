var win = Ti.UI.currentWindow;

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