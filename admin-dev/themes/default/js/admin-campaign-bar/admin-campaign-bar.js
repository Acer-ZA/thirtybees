/**** Admin Campaign Bar JS ****/

/// Get the current date ///
var currentDate = new Date().toDateString();

/// Campaign Bar Variables ///
var campaigns = [
    {
        class: 'campaign_bar_love_class',
        intro: 'campaign_bar_love_intro',
        cta: 'campaign_bar_love_cta',
        url: 'campaign_bar_love_url'
    },
    {
        class: 'campaign_bar_techsupport_class',
        intro: 'campaign_bar_techsupport_intro',
        cta: 'campaign_bar_techsupport_cta',
        url: 'campaign_bar_techsupport_url'
    },
    {
        class: 'campaign_bar_thanks_class',
        intro: 'campaign_bar_thanks_intro',
        cta: 'campaign_bar_thanks_cta',
        url: 'campaign_bar_thanks_url'
    },
    {
        class: 'campaign_bar_premium_class',
        intro: 'campaign_bar_premium_intro',
        cta: 'campaign_bar_premium_cta',
        url: 'campaign_bar_premium_url'
    }
];


/// Get Random Campaign Bar ///
var previousCampaign;

function getRandomCampaign() {
    var randomCampaign;
    do {
        randomCampaign = campaigns[Math.floor(Math.random() * campaigns.length)];
    } while (randomCampaign === previousCampaign);

    previousCampaign = randomCampaign;
    return randomCampaign;
}



function updateCampaignBar(campaign) {
    console.log("updateCampaignBar: " + campaign);
    $('.tb-admin-campaign-bar .campaign-bar-holder-inner-actual').off("click");

    // Update the campaign bar with the selected campaign
    $('.tb-admin-campaign-bar-text-inner').html(window[campaign.intro]);
    $('.tb-admin-campaign-bar-cta-inline a').html(window[campaign.cta]);
    $('.tb-admin-campaign-bar-cta-inline a').attr("href",window[campaign.url]);
    $('.tb-admin-campaign-bar-cta a').html(window[campaign.cta]);
    $('.tb-admin-campaign-bar-cta a').attr("href", window[campaign.url]);

    // Remove previous class and add the selected class
    $('.tb-admin-campaign-bar').removeClass().addClass('tb-admin-campaign-bar ' + window[campaign.class]);
    $(".campaign-bar-holder").removeClass("animate-campaign-bar-out");

    $(".campaign-bar-holder").addClass("animate-campaign-bar-in");
    bindCampaignModals();

    /*setTimeout(function () {
        $(".campaign-bar-holder").removeClass("animate-campaign-bar-in");
    }, 1000);*/
}

/// Bind Campaign Modals ///
function bindCampaignModals() {
    setTimeout(function () {
        $('.tb-admin-campaign-bar.campaign-bar-supporter .campaign-bar-holder-inner-actual').on("click", function () {
            console.log("supporter");
            openSupportThirtyBeesModal();
        });
    }, 10);
}

/// Check Admin BG Colour ///
function checkAdminBGColour() {
    function adminHeaderDark() {
        console.log("admin header dark");
        $(".bootstrap #header_infos").addClass("admin-header-dark");
    }
    function adminHeaderLight() {
        console.log("admin header light");
        $(".bootstrap #header_infos").addClass("admin-header-light");
    }
    var getAdminBGColour = $(".bootstrap #header_infos").css('background-color');
    console.log("*** Admin bg colour is: " + getAdminBGColour);
    /// Dark
    if (getAdminBGColour == "rgb(119, 41, 83)" || getAdminBGColour == "rgb(40, 43, 48)") {
        console.log("dark")
        adminHeaderDark();
    }
    /// Light
    if (getAdminBGColour == "rgb(255, 204, 0)") {
        adminHeaderLight();
    }
    else {
        console.log("light")
    }

}

/// Initiate Campaign Bar ///
function initiateCampaignBar() {
    checkAdminBGColour();
    console.log("initiateCampaignBar");

    function updateAndAnimate() {
        var newCampaign = getRandomCampaign();
        $(".campaign-bar-holder").addClass("animate-campaign-bar-out");

        setTimeout(function () {
            updateCampaignBar(newCampaign);
            $(".campaign-bar-holder").removeClass("animate-campaign-bar-out");
        }, 1000);
    }

    // Initial update
    var initialCampaign = getRandomCampaign();
    updateCampaignBar(initialCampaign);

    // Update every 10 seconds
    setInterval(updateAndAnimate, 10000);
}



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
}

/// Support ThirtyBees Modal ///
function openSupportThirtyBeesModal() {
    console.log("Support Thirty Bees modal");
    
    /// Show the modal
    $('#supportThirtyBeesModal').modal('show');

}

/// Function to get a cookie value
function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(name + '=') === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

/// Function to set a cookie value
function setCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toGMTString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}

function checkIfSysAnimationsRanAlready() {
    /// Check if the cookie exists
    var animationShownDate = getCookie('animationShownDate');

    /// Check if the animation has already been shown for the day
    if (!animationShownDate || animationShownDate !== currentDate) {
        /// Show the animation
        console.log('animation should load');
        $('body').addClass('show-sys-animation');

        /// Set a cookie to indicate that the animation has been shown today
        setCookie('animationShownDate', currentDate, 1); // Expires in 1 day
    }
    else {
        console.log("animation has already loaded");
    }
}

function checkCampaignBarClose() {
    console.log()
    var campaignBarShownDate = getCookie('campaignBarClose');

    /// Check if the animation has already been shown for the day
    if (!campaignBarShownDate || campaignBarShownDate !== currentDate) {
        /// Show the animation
        console.log('campaignbar should load');
        $('body').addClass('show-campaign-bar');

        /// Set a cookie to indicate that the animation has been shown today
        setCookie('campaignBarClose', currentDate, 1); // Expires in 1 day
    }
    else {
        console.log("animation has already loaded");
    }
}

function campaignBarClose() {
    console.log("campaign bar closed");
    $(".campaign-bar-close-holder").on("click", function () {
        $(".campaign-bar-holder-inner-outer").fadeOut(250);
        setCookie('campaignBarClose', currentDate, 1); // Expires in 1 day
    })
}

$(document).ready(function () {
   /* notificationPopup();*/
    console.log('actioned');
    initiateCampaignBar();
    campaignBarClose();
    checkCampaignBarClose();
    checkForNotifications();
    checkIfSysAnimationsRanAlready();
    $('body').addClass('show-campaign-bar');
    /*$('body').addClass('show-sys-animation');*/


    /// Initial Bindings ///
    $('.notifications-icon').click(function () {
        openNotificationsModal();
    });

});