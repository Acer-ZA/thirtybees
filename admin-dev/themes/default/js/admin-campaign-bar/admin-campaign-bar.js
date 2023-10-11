/**** Admin Campaign Bar JS ****/

function notificationPopup() {
    console.log('notifications popup');
    var getWindowWidth = $(window).width();
    if (getWindowWidth > 1100) {
        console.log('window width');
    }
}

$(window).on('resize', function () {
    notificationPopup();
});

$(document).ready(function () {
    notificationPopup();
    console.log('actioned');
});