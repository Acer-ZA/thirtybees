/**** Admin Campaign Bar JS ****/

// Function to clone and inject content
function openNotificationsModal() {
    console.log("Notifications modal");
    // Clone the specific element you want to inject
    var contentToInject = $('#header_notifs_icon_wrapper').clone();

    // Remove the ID attribute to prevent duplication
    contentToInject.removeAttr('id');

    // Inject the cloned content into the modal
    $('#notificationsModalContent').html(contentToInject);

    // Show the modal
    $('#notificationsModal').modal('show');
}


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
    $('.notifications-icon').click(function () {
        openNotificationsModal();
    });
});