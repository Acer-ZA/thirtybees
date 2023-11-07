/**** Admin Campaign Bar JS ****/

/// Check for notifications and show on responsive bell icon ///
function checkForNotifications() {
    console.log("checkForNotifications");
    if ($('.modal-content .notifs_badge span').html().trim() != "" || $('.modal-content .notifs_badge span').html() != '0') {
        console.log("checkForNotifications: yes");
        $(".tb-admin-campaign-bar-fa-icon .notifs_badge").addClass("fadeIn");
    }
    else {
        $(".tb-admin-campaign-bar-fa-icon .notifs_badge").removeClass("fadeIn");
        console.log("checkForNotifications: no");
    }
}

/// Notification code grab and inject into modal + open
function openNotificationsModal() {
    console.log("Notifications modal");
    /// Clone the specific element you want to inject
    var contentToInject = $('#header_notifs_icon_wrapper').clone();

    /// Remove the ID attribute to prevent duplication
    contentToInject.removeAttr('id');

    /// Inject the cloned content into the modal
    $('#notificationsModalContent').html(contentToInject);

    /// Show the modal
    $('#notificationsModal').modal('show');

    /// Clears the modal of content to prevent possible issues with duplicate IDs
    $('#notificationsModal').on('hidden.bs.modal', function () {
        $('#notificationsModalContent').html("");
        console.log("modal closed");
    });

    // Inject the cloned content into the modal
   /* $('.notifications-dropdown').html(contentToInject);

    $('.notifications-icon ').on('hidden.bs.dropdown', function () {
        $('#notificationsModalContent').html("");
    });*/

}


/*function notificationPopup() {
    console.log('notifications popup');
    var getWindowWidth = $(window).width();
    if (getWindowWidth > 1100) {
        console.log('window width');
    }
}

$(window).on('resize', function () {
    notificationPopup();
});
*/
$(document).ready(function () {
   /* notificationPopup();*/
    console.log('actioned');

    checkForNotifications();

    $('.notifications-icon').click(function () {
        openNotificationsModal();
    });
});