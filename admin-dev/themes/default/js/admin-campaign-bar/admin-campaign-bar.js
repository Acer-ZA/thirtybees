/**** Admin Campaign Bar JS ****/


/// Check for notifications and show on responsive bell icon ///
function checkForNotifications() {
    $('.tb-admin-campaign-bar #header_notifs_icon_wrapper .notifs_badge span').each(function () {
        var notificationCount = $(this).text();

        if (parseInt(notificationCount) !== 0) {
            $(this).closest('.notifs_badge').addClass('fadeIn');
            console.log("Notification Count: " + notificationCount);

        } else {
            $(this).closest('.notifs_badge').removeClass('fadeIn');
            console.log("Notification Count: " + notificationCount);

        }
    });
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

function checkIfSysAnimationsRanAlready() {
    // Check if the animation has already loaded in the last 24 hours
    var animationLoaded = localStorage.getItem('animationLoaded');
    var lastLoadedTime = localStorage.getItem('lastLoadedTime');

    if (!animationLoaded || (Date.now() - lastLoadedTime > 24 * 60 * 60 * 1000)) {
        // Run the animation
        $('.tb-admin-campaign-bar').addClass('sys-animation-done');

        // Set the flag in localStorage
        localStorage.setItem('animationLoaded', true);
        localStorage.setItem('lastLoadedTime', Date.now());
        console.log("sysanimation already loaded");
    }
    else {
        console.log("sysanimation not loaded yet");
        $('.tb-admin-campaign-bar').removeClass('sys-animation-done');
        $('.tb-admin-campaign-bar').addClass('sys-animation-not-done');
    }
}

$(document).ready(function () {
   /* notificationPopup();*/
    console.log('actioned');

    checkForNotifications();
    checkIfSysAnimationsRanAlready();

    $('.notifications-icon').click(function () {
        openNotificationsModal();
    });
});