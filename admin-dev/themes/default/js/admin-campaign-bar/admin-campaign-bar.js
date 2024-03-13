/**** Admin Campaign Bar JS ****/

/// Get the current date ///
var currentDate = new Date().toDateString();
var setCampaignChangeIntervalVar = 0;

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

/// Campaign Slider Variables ///
var campaignsSlider = [

    {
        class: 'campaign_slider_love_class',
        header: 'campaign_slider_love_header',
        intro: 'campaign_slider_love_intro',
        cta: 'campaign_slider_love_cta',
        url: 'campaign_slider_love_url'
    },
    {
        class: 'campaign_slider_techsupport_class',
        header: 'campaign_slider_techsupport_header',
        intro: 'campaign_slider_techsupport_intro',
        cta: 'campaign_slider_techsupport_cta',
        url: 'campaign_slider_techsupport_url'
    },
    {
        class: 'campaign_slider_thanks_class',
        header: 'campaign_slider_thanks_header',
        intro: 'campaign_slider_thanks_intro',
        cta: 'campaign_slider_thanks_cta',
        url: 'campaign_slider_thanks_url'
    },
    {
        class: 'campaign_slider_premium_class',
        header: 'campaign_slider_premium_header',
        intro: 'campaign_slider_premium_intro',
        cta: 'campaign_slider_premium_cta',
        url: 'campaign_slider_premium_url'
    }
];

/// Get Random Campaign Bar ///
var previousCampaign;

function getRandomCampaignBar() {
    var randomCampaign;
    do {
        randomCampaign = campaigns[Math.floor(Math.random() * campaigns.length)];
    } while (randomCampaign === previousCampaign);

    previousCampaign = randomCampaign;
    return randomCampaign;
}

function getRandomCampaignSlider() {
    var randomCampaign;
    do {
        randomCampaign = campaignsSlider[Math.floor(Math.random() * campaignsSlider.length)];
    } while (randomCampaign === previousCampaignSlider);

    previousCampaignSlider = randomCampaign; // Update the previous campaign
    return randomCampaign;
}

/// Update Campaign Bar ///
function updateCampaignBar(campaign) {
    console.log("updateCampaignBar: " + campaign);
    /// Check if campaign is defined
    if (campaign && campaign.intro) {
        /// Update the campaign bar with the selected campaign
        $('.tb-admin-campaign-bar-text-inner').html(window[campaign.intro]);
        $('.tb-admin-campaign-bar-cta-inline a').html(window[campaign.cta]);
        $('.tb-admin-campaign-bar-cta-inline a').attr("href", window[campaign.url]);
        $('.tb-admin-campaign-bar-cta a').html(window[campaign.cta]);
        $('.tb-admin-campaign-bar-cta a').attr("href", window[campaign.url]);

        /// Remove previous class and add the selected class
        $('.tb-admin-campaign-bar').removeClass().addClass('tb-admin-campaign-bar ' + window[campaign.class]);
        $(".campaign-bar-holder").removeClass("animate-campaign-bar-out");

        $(".campaign-bar-holder").addClass("animate-campaign-bar-in");
        bindTopBarSupporterCampaignModal(campaign); /// Bind Supporter Modal
    } else {
        console.error('Campaign or campaign.intro is undefined.');
        console.error('Retrying...');
        var newCampaign = getRandomCampaignBar();
        updateCampaignBar(newCampaign);
    }
}

/// Bind/Unbind TopBar Supporter Campaign Modal ///
function bindTopBarSupporterCampaignModal(campaign) {
    if (campaign.class == 'campaign_bar_love_class') {
        console.log('TopBarSupporter Campaign: ' + campaign.class);

        setTimeout(function () {
            $('.campaign-bar-supporter .campaign-bar-holder-inner-actual').on("click", function () {
                console.log("supporter");
                openSupportThirtyBeesModal();
            });
        }, 10);
    }
    else {
        console.log('not supporter: ' + campaign.class);
        $(".tb-admin-campaign-bar .campaign-bar-holder-inner-actual").off('click');
    }
}

/// Bind/Unbind Slider Supporter Campaign Modal ///
function bindSliderSupporterCampaignModal(campaign) {
    console.log('/// SLIDER  Campaign: ' + campaign.class);

    if (campaign.class == 'campaign_slider_love_class') {

        setTimeout(function () {
            $('.campaign-slider-holder.campaign-slider-supporter .campaign-slider-holder-inner-actual').on("click", function () {
                console.log("supporter");
                openSupportThirtyBeesModal();
            });
        }, 10);
    }
    else {
        console.log('SLIDER not supporter: ' + campaign.class);
        $(".campaign-slider-holder .campaign-slider-holder-inner-actual").off('click');
    }
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
function initiateCampaignBar(setCampaignBarStartDelay,setCampaignChangeInterval) {
    setCampaignChangeIntervalVar = setCampaignChangeInterval;
    if (setCampaignChangeIntervalVar == null || setCampaignChangeInterval == undefined) {
        setCampaignChangeIntervalVar = 120000; /// Default campaign change duration
    } 
    checkAdminBGColour();
    console.log("*** initiateCampaignBar. setCampaignChangeInterval: " + setCampaignChangeIntervalVar);

    function updateAndAnimate() {
        var newCampaign = getRandomCampaignBar();

        $(".campaign-bar-holder").addClass("animate-campaign-bar-out");
        console.log('finish campaign');

        setTimeout(function () {
            $(".campaign-bar-holder").removeClass("animate-campaign-bar-out");
            console.log('new campaign');
            updateCampaignBar(newCampaign);
        }, 2000);
    }

    /// Start Delay
    setTimeout(function () {
        $(".campaign-bar-holder").css("visibility", "visible");

        /// Initial update
        var initialCampaign = getRandomCampaignBar();
        updateCampaignBar(initialCampaign);

        /// Update every x seconds
        setInterval(updateAndAnimate, setCampaignChangeIntervalVar);
    }, setCampaignBarStartDelay);
}


/// Update Campaign Slider ///
var previousCampaignSlider; // Define the previous campaign variable
function updateCampaignSlider(campaign) {
    console.log("/// updateCampaignSlider: " + campaign);

    if (campaign && campaign.intro) {
        $('.tb-admin-campaign-slider-header-inner').html(window[campaign.header]);
        $('.tb-admin-campaign-slider-text-inner').html(window[campaign.intro]);
        $('.tb-admin-campaign-slider-cta-inline a').html(window[campaign.cta]);
        $('.tb-admin-campaign-slider-cta-inline a').attr("href", window[campaign.url]);
        $('.tb-admin-campaign-slider-cta a').html(window[campaign.cta]);
        $('.tb-admin-campaign-slider-cta a').attr("href", window[campaign.url]);

        $('.campaign-slider-holder').removeClass().addClass('campaign-slider-holder ' + window[campaign.class]);

        // Animation
        $(".campaign-slider-holder").removeClass("animate-campaign-slider-in");
        $(".campaign-slider-holder").addClass("animate-campaign-slider-out");

        setTimeout(function () {
            $(".campaign-slider-holder").removeClass("animate-campaign-slider-out");
            $(".campaign-slider-holder").addClass("animate-campaign-slider-in");
        }, 250);

        bindSliderSupporterCampaignModal(campaign);
        $(".campaign-slider-close-icon").off("click");
        setTimeout(function () {
            campaignSliderClose();
        }, 250);
       
    } else {
        console.error('Slider Campaign or campaign.intro is undefined.');
        console.error('Retrying...');

        var newCampaignSlider = getRandomCampaignSlider();  
        updateCampaignSlider(newCampaignSlider); /// Update with a new campaign
    }
}

/// Initiate Campaign Slider ///
function initiateCampaignSlider(setCampaignSliderStartDelay,setSliderCampaignChangeInterval) {
    var setSliderCampaignChangeIntervalVar = setSliderCampaignChangeInterval || 8000;
  
    function updateAndAnimateSlider() {
        var newCampaignSlider = getRandomCampaignSlider();
        console.log('finish campaign');
        updateCampaignSlider(newCampaignSlider);
    }

    setTimeout(function () {
        $(".campaign-slider-holder").attr("style", "visibility: visible!important");
        /// Initial update
        var initialCampaign = getRandomCampaignSlider();
        updateCampaignSlider(initialCampaign);

        /// Define an array of classes to randomly apply
        var randomClasses = ['animate-campaign-slider-in-right', 'animate-campaign-slider-flip-center', 'animate-campaign-slider-flip-rightleft', 'animate-campaign-slider-in-bottom'];
        var randomClass = randomClasses[Math.floor(Math.random() * randomClasses.length)];
        $('.campaign-slider-holder').removeClass('campaign-slider-hide');

        $('.campaign-slider-holder').addClass(randomClass);

        console.log("slider interval: " + setSliderCampaignChangeIntervalVar);
        // Update every x seconds
        setInterval(updateAndAnimateSlider, setSliderCampaignChangeIntervalVar);
    }, setCampaignSliderStartDelay);
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
    });
}

/// Support ThirtyBees Modal ///
function openSupportThirtyBeesModal() {
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
        console.log('Sysadmin animation should load');
        /// Sys animation is for debug, maintenance + username animations
        $('body').addClass('show-sys-animation');

        /// Set a cookie to indicate that the animation has been shown today
        setCookie('animationShownDate', currentDate, 1); // Expires in 1 day
    }
    else {
        console.log("COOKIE SYSADMIN: Cookie already detected");
        setTimeout(function () {
            $(".sys-state-holder").fadeIn(1500);
        }, 1000);
    }
}

function checkCampaignBarClose() {
    var campaignBarShownDate = getCookie('campaignBarClose');

    /// Check if the animation has already been shown for the day
    if (!campaignBarShownDate || campaignBarShownDate !== currentDate) {
        /// Show the animation
        console.log('campaignbar should load');
        $('body').addClass('show-campaign-bar');

        /// Set a cookie to indicate that the animation has been shown today
        /*setCookie('campaignBarClose', currentDate, 1); // Expires in 1 day*/
    }
    else {
        console.log("COOKIE BAR: Cookie already detected");
    }
}

function checkCampaignSliderClose() {
    var campaignSliderShownDate = getCookie('campaignSliderClose');

    /// Check if the animation has already been shown for the day
    if (!campaignSliderShownDate || campaignSliderShownDate !== currentDate) {
        /// Show the animation
        console.log('campaignslider should load');
        $('body').addClass('show-campaign-slider');

        /// Set a cookie to indicate that the animation has been shown today
        /*setCookie('campaignSliderClose', currentDate, 1); // Expires in 1 day*/
    }
    else {
        console.log("COOKIE SLIDER: Cookie already detected");
    }
}

function campaignBarClose() {
    $(".campaign-bar-close-holder").on("click", function () {
        console.log("campaign bar closed");
        $(".campaign-bar-holder-inner-outer").fadeOut(250);
        setCookie('campaignBarClose', currentDate, 1); // Expires in 1 day
    })
}

function campaignSliderClose() {
    $(".campaign-slider-close-icon").on("click", function () {
        console.log("campaign slider closed");
        $(".campaign-slider-holder-outer").fadeOut(250);
        setCookie('campaignSliderClose', currentDate, 1); // Expires in 1 day
    })
}


/// Inits the Campaign Bar and Slider ///
function campaignBarSliderInits() {
    console.log("TB CampaignBar Initial Init");
    /*$('body').addClass('show-campaign-bar');*/ /// Forces the bar to show irrespective of cookie
    /*$('body').addClass('show-campaign-slider');*/ /// Forces the slider to show irrespective of cookie
    /*$('body').addClass('show-sys-animation');*/ /// Sys animation is for debug, maintenance + username animations
    initiateCampaignBar(5000,20000); /// Start delay, Cycle delay
    initiateCampaignSlider(10000,20000); /// Start delay, Cycle delay
    /// Presentation Settings - remove when release ready ///
    /*initiateCampaignBar(10000);
    initiateCampaignSlider(20000);*/
}

function checkMemberType() {
    var findMemberIvory = $(".member-type-ivory").length;
    var findMemberSilver = $(".member-type-silver").length;
    var findMemberGold = $(".member-type-gold").length;
    var findMemberPlatinum = $(".member-type-platinum").length;

    $(".member-type").removeClass("logo-member-type-silver,logo-member-type-ivory,logo-member-type-gold, logo-member-type-platinum");
    if (findMemberSilver> 0) {
        $(".member-type").addClass("logo-member-type-silver");
    }
    if (findMemberIvory > 0) {
        $(".member-type").addClass("logo-member-type-ivory");
    }
    if (findMemberGold > 0) {
        $(".member-type").addClass("logo-member-type-gold");
    }
    if (findMemberPlatinum> 0) {
        $(".member-type").addClass("logo-member-type-platinum");
    }
}

$(document).ready(function () {
    campaignBarClose(); /// Binds Campaign Bar Close
    campaignSliderClose(); /// Binds Campaign Slider Close
    checkCampaignBarClose(); /// Checks cookie for Campaign Bar
    checkCampaignSliderClose(); /// Checks cookie for Campaign Sliders
    checkForNotifications(); /// Checks for notifications
    checkIfSysAnimationsRanAlready(); /// Checks if the Sys Animations (Maintenance / Debug ran already)
    checkMemberType();

    /*$('body').addClass('show-sys-animation');*/

    /// Initial Bindings ///
    $('.notifications-icon').click(function () {
        openNotificationsModal();
    });

    /// Inits the Campaign Bar and Slider ///
    campaignBarSliderInits();

});