/**** Admin Campaign Bar and Slider JS ****/

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
        var checkForTechSupportClass = $('.tb-admin-campaign-bar').hasClass("campaign-bar-technical-support");
        if (checkForTechSupportClass) {
            $(".campaign-bar-technical-support .tb-admin-campaign-bar-cta a").attr("target", "_blank");
            $(".campaign-bar-technical-support .tb-admin-campaign-bar-cta-inline a").attr("target", "_blank");
        }
        else {
            $(".tb-admin-campaign-bar-cta a").attr("target", "_self");
            $(".tb-admin-campaign-bar-cta-inline a").attr("target", "_self"); 
        }

        $(".campaign-bar-holder").removeClass("animate-campaign-bar-out");

        $(".campaign-bar-holder").addClass("animate-campaign-bar-in");
        bindTopBarSupporterCampaignModal(campaign); /// Bind Supporter Modal
    } else {
        var newCampaign = getRandomCampaignBar();
        updateCampaignBar(newCampaign);
    }
}

/// Bind/Unbind TopBar Supporter Campaign Modal ///
function bindTopBarSupporterCampaignModal(campaign) {
    if (campaign.class == 'campaign_bar_love_class') {
        setTimeout(function () {
            $('.campaign-bar-supporter .campaign-bar-holder-inner-actual').on("click", function () {
                openSupportThirtyBeesModal();
            });
        }, 10);
    }
    else {
        $(".tb-admin-campaign-bar .campaign-bar-holder-inner-actual").off('click');
    }
}

/// Bind/Unbind Slider Supporter Campaign Modal ///
function bindSliderSupporterCampaignModal(campaign) {
    if (campaign.class == 'campaign_slider_love_class') {
        setTimeout(function () {
            $('.campaign-slider-holder.campaign-slider-supporter .campaign-slider-holder-inner-actual').on("click", function () {
                openSupportThirtyBeesModal();
            });
        }, 10);
    }
    else {
        $(".campaign-slider-holder .campaign-slider-holder-inner-actual").off('click');
    }
}

/// Check Admin BG Colour ///
function checkAdminBGColour() {
    function adminHeaderDark() {
        $(".bootstrap #header_infos").addClass("admin-header-dark");
    }
    function adminHeaderLight() {
        $(".bootstrap #header_infos").addClass("admin-header-light");
    }
    var getAdminBGColour = $(".bootstrap #header_infos").css('background-color');
    /// Dark
    if (getAdminBGColour == "rgb(119, 41, 83)" || getAdminBGColour == "rgb(40, 43, 48)") {
        adminHeaderDark();
    }
    /// Light
    if (getAdminBGColour == "rgb(255, 204, 0)") {
        adminHeaderLight();
    }
}

/// Initiate Campaign Bar ///
function initiateCampaignBar(setCampaignBarStartDelay,setCampaignChangeInterval) {
    setCampaignChangeIntervalVar = setCampaignChangeInterval;
    if (setCampaignChangeIntervalVar == null || setCampaignChangeInterval == undefined) {
        setCampaignChangeIntervalVar = 20000; /// Default campaign change duration
    } 
    checkAdminBGColour();
    function updateAndAnimate() {
        var newCampaign = getRandomCampaignBar();

        $(".campaign-bar-holder").addClass("animate-campaign-bar-out");

        setTimeout(function () {
            $(".campaign-bar-holder").removeClass("animate-campaign-bar-out");
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

    if (campaign && campaign.intro) {
        $('.tb-admin-campaign-slider-header-inner').html(window[campaign.header]);
        $('.tb-admin-campaign-slider-text-inner').html(window[campaign.intro]);
        $('.tb-admin-campaign-slider-cta-inline a').html(window[campaign.cta]);
        $('.tb-admin-campaign-slider-cta-inline a').attr("href", window[campaign.url]);
        $('.tb-admin-campaign-slider-cta a').html(window[campaign.cta]);
        $('.tb-admin-campaign-slider-cta a').attr("href", window[campaign.url]);

        $('.campaign-slider-holder').removeClass().addClass('campaign-slider-holder ' + window[campaign.class]);
        
        var checkForTechSupportClassSlider = $('.campaign-slider-holder').hasClass("campaign-slider-technical-support");
        if (checkForTechSupportClassSlider) {
            $(".campaign-slider-technical-support .tb-admin-campaign-slider-cta a").attr("target", "_blank");
            $(".campaign-slider-technical-support .tb-admin-campaign-slider-cta-inline a").attr("target", "_blank");
        }
        else {
            $(".tb-admin-campaign-slider-cta a").attr("target", "_self");
            $(".tb-admin-campaign-slider-cta-inline a").attr("target", "_self");
        }

        // Animation
        $(".campaign-slider-holder").removeClass("animate-campaign-slider-in");
        $(".campaign-slider-holder").addClass("animate-campaign-slider-out");

        setTimeout(function () {
            $(".campaign-slider-holder").removeClass("animate-campaign-slider-out");
            $(".campaign-slider-holder").addClass("animate-campaign-slider-in");
        }, 250);

        bindSliderSupporterCampaignModal(campaign);
        $(".campaign-slider-close-icon").off("click");
        var isMember = checkMemberType(); // Call the function and store the result

        if (!isMember) { /// Check if isMember is false
            campaignSliderClose('noMember');
        }

        else { /// Check if isMember is false
            campaignSliderClose('Member');
        }


       /* setTimeout(function () {
            campaignSliderClose('noMember');
        }, 250);*/
       
    } else {
        var newCampaignSlider = getRandomCampaignSlider();  
        updateCampaignSlider(newCampaignSlider); /// Update with a new campaign
    }
}

/// Initiate Campaign Slider ///
function initiateCampaignSlider(setCampaignSliderStartDelay,setSliderCampaignChangeInterval) {
    var setSliderCampaignChangeIntervalVar = setSliderCampaignChangeInterval || 8000;
  
    function updateAndAnimateSlider() {
        var newCampaignSlider = getRandomCampaignSlider();
        updateCampaignSlider(newCampaignSlider);
    }

    setTimeout(function () {
        $(".campaign-slider-holder").attr("style", "visibility: visible!important; z-index: 999!important;");
        /// Initial update
        var initialCampaign = getRandomCampaignSlider();
        updateCampaignSlider(initialCampaign);

        /// Define an array of classes to randomly apply
        var randomClasses = ['animate-campaign-slider-in-right', 'animate-campaign-slider-flip-center', 'animate-campaign-slider-flip-rightleft', 'animate-campaign-slider-in-bottom'];
        var randomClass = randomClasses[Math.floor(Math.random() * randomClasses.length)];
        $('.campaign-slider-holder').removeClass('campaign-slider-hide');
        $('.campaign-slider-holder').addClass(randomClass);

        // Update every x seconds
        setInterval(updateAndAnimateSlider, setSliderCampaignChangeIntervalVar);
    }, setCampaignSliderStartDelay);
}

/// Check for notifications and show on responsive bell icon ///
function checkForNotifications() {

    setTimeout(function () {
        $('.tb-admin-campaign-bar .notifs_badge span').each(function () {
            var notificationCount = $(this).text();
            if (notificationCount > 0) {
                $(".tb-admin-campaign-bar-fa-icon .notifs_badge").css("display","inline-flex");
            }
        });
    }, 2000);
}

/// Notification code grab and inject into modal + open
function openNotificationsModal() {
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


/// Make notification ///
function makeNotification(content) {
    // Create the toast
    $(".campaign-notification").addClass("campaign-message-slide-in");
    $(".campaign-notification-text").html(content);
    setTimeout(function () {
        $(".campaign-notification").removeClass("campaign-message-slide-in");
        $(".campaign-notification").addClass("campaign-message-slide-out");
    }, 6500);
    setTimeout(function () {
        $(".campaign-notification").removeClass("campaign-message-slide-out");
        $(".campaign-notification").removeClass("campaign-message-slide-in");
    }, 6800);

}

/*currentDate.setDate(currentDate.getDate() + 30); // Add 30 days to the current date*/
/// Function to set a cookie with a specified expiration in minutes// Function to set a cookie with a specified expiration in minutes
function setCookie(name, value, minutes) {
    var expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (minutes * 60000)); // Convert minutes to milliseconds
    document.cookie = name + "=" + value + "; expires=" + expirationDate.toUTCString() + "; path=/";
}

/// Function to get the value of a cookie
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

/// Function to clear a cookie
function clearCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

/// Support ThirtyBees Modal - No Member / Member
function openSupportThirtyBeesCloseModal(type) {
    console.log("openSupportThirtyBeesCloseModal");
    switch (type) {
        case 'noMember':
            $('#supportThirtyBeesCloseModal').modal('show');
            $('.setTopBarModal1Month').on("click", function () {
                console.log('Setting new cookie...');
                /// Clear existing cookie
                clearCookie('campaignBarClose');

                /// Get the current date and calculate expiration date (1 minute from now)
                var expirationMinutes = 1; // Set expiration time in minutes
                var expirationDate = new Date();
                expirationDate.setTime(expirationDate.getTime() + (expirationMinutes * 60000)); // Convert minutes to milliseconds

                console.log("Current date is: " + new Date());
                console.log('Expiration Date: ' + expirationDate);

                /// Set the cookie with correct expiration format
                setCookie('campaignBarClose', expirationDate.toString(), expirationMinutes);

                /// Retrieve and log the cookie value
                var getCampaignBarCloseCookie = getCookie('campaignBarClose');
                console.log('Cookie Value is: ' + getCampaignBarCloseCookie);

                /// Set timeout to hide modal and show notification after 1 second
                setTimeout(function () {
                    $('#supportThirtyBeesCloseModal').modal('hide');
                    makeNotification('These messages will be hidden for <b>1 Month</b> on this device');
                    $(".campaign-bar-holder").addClass("tb-campaign-bar-fade-out");
                    $(".campaign-slider-holder-outer").fadeOut(250);
                    setTimeout(function () {
                        $('body').removeClass('show-campaign-bar');
                    }, 2000);
                }, 1000);
            });
            break;
        case 'Member':
            $('#supportThirtyBeesCloseModalMember').modal('show');

            $('.setThankYouModal1Year').on("click", function () {
                console.log('Setting new cookie...');

                /// Clear existing cookies
                clearCookie('campaignBarClose');
                clearCookie('campaignSliderClose');


                /// Get the current date
                var currentDate = new Date();

                /// Set expiration date to 1 year from the current date
                var expirationDate = new Date(currentDate.getTime());
                expirationDate.setFullYear(expirationDate.getFullYear() + 1);

                console.log("Current date is: " + currentDate);
                console.log('Expiration Date: ' + expirationDate);

                /// Set the cookie with correct expiration format
                setCookie('campaignBarClose', expirationDate.toString(), 365);
                setCookie('campaignSliderClose', expirationDate.toString(), 365);

                /// Retrieve and log the cookie value
                var getCampaignBarCloseCookie = getCookie('campaignBarClose');
                console.log('Cookie Value is: ' + getCampaignBarCloseCookie);

                /// Set timeout to hide modal and show notification after 1 year
                $('#supportThirtyBeesCloseModalMember').modal('hide');
                setTimeout(function () {
                    makeNotification('Thank You Messages will be hidden for <b>1 Year</b> on this device');
                    $(".campaign-bar-holder").addClass("tb-campaign-bar-fade-out");
                    $(".campaign-slider-holder-outer").fadeOut(250);
                    setTimeout(function () {
                        $('body').removeClass('show-campaign-bar');
                    }, 2000);
                }, 1000);
            });
            break;
        default:
        break;
    }
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
        /// Cookie already detected, just show the icons
        setTimeout(function () {
            $(".sys-state-holder").fadeIn(1500);
        }, 1000);
    }
}

/// Check the Cookie for the Campaign bar and act accordingly
function checkCampaignBarClose() {
    var currentDate = new Date(); // Get the current date and time
    var campaignBarCloseCookie = getCookie('campaignBarClose');
    console.log("CurrentDate: " + currentDate);
    console.log("campaignBarClose Cookie Value: " + campaignBarCloseCookie);

    if (campaignBarCloseCookie) {
        var expirationDate = new Date(campaignBarCloseCookie); // Parse the expiration date from the cookie

        // Compare the current date with the expiration date
        if (currentDate <= expirationDate) {
            /// If the current date is before or equal to the expiration date, do not show the campaign bar
            console.log('Campaign bar is hidden because it is within the cookie expiration period.');
            $('body').removeClass('show-campaign-bar');
        } else {
            /// If the current date is after the expiration date, show the campaign bar
            console.log('Campaign bar is shown because it has expired.');
            $('body').addClass('show-campaign-bar');
        }
    } else {
        /// If the cookie is not set, show the campaign bar
        console.log('Campaign bar is shown because the cookie is not set.');
        $('body').addClass('show-campaign-bar');
    }
}

function checkCampaignSliderClose() {
    var currentDate = new Date(); // Get the current date and time
    var campaignSliderCookie = getCookie('campaignSliderClose');
    console.log("CurrentDate: " + currentDate);
    console.log("campaignSliderCookie Cookie Value: " + campaignSliderCookie);

    if (campaignSliderCookie) {
        var expirationDate = new Date(campaignSliderCookie); // Parse the expiration date from the cookie

        // Compare the current date with the expiration date
        if (currentDate <= expirationDate) {
            /// If the current date is before or equal to the expiration date, do not show the campaign bar
            console.log('Campaign slider is hidden because it is within the cookie expiration period.');
            $('body').removeClass('show-campaign-slider');
        } else {
            /// If the current date is after the expiration date, show the campaign bar
            console.log('Campaign slider is shown because it has expired.');
            $('body').addClass('show-campaign-slider');
        }
    } else {
        /// If the cookie is not set, show the campaign bar
        console.log('Campaign slider is shown because the cookie is not set.');
        $('body').addClass('show-campaign-slider');
    }
}

/// Binds the Close functionality and logic for the Top Bar Campaign Slider
function campaignBarClose(type) {
    var isMember = checkMemberType(); // Call the function and store the result
    if (!isMember) { /// Check if isMember is false
        $(".campaign-bar-close-holder").on("click", function () {
            console.log("/// NEW: TopBar NoMember close ///");
            openSupportThirtyBeesCloseModal('noMember');
        })
    }
    else {
        $(".campaign-bar-close-holder").off("click");
        $(".campaign-bar-close-holder").on("click", function () {
            setCookie('campaignBarClose', currentDate, 1); // Expires in 1 day*/
            console.log("/// NEW: TopBar Member close ///");
            openSupportThirtyBeesCloseModal('Member');
        })
    }
}

/// Binds the Close functionality and logic for the Campaign Slider
function campaignSliderClose() {
    var isMember = checkMemberType(); // Call the function and store the result
    if (!isMember) { /// Check if isMember is false
        $(".campaign-slider-close-icon").off("click");
        $(".campaign-slider-close-icon").on("click", function () {
            console.log("/// NEW: Slider NoMember close ///");
            openSupportThirtyBeesCloseModal('noMember');
        })
    }
    else {
        console.log("/// NEW: Slider MEMBER close ///");
        $(".campaign-slider-close-icon").off("click");
        $(".campaign-slider-close-icon").on("click", function () {
            console.log("Member close");
            openSupportThirtyBeesCloseModal('Member');
        })
    }
}

/// Inits the Campaign Bar and Slider ///
function campaignBarSliderInits() {
    initiateCampaignBar(5000, 20000); /// Start delay, Cycle delay
    initiateCampaignSlider(10000, 20000); /// Start delay, Cycle delay
    campaignBarClose(); /// Binds Campaign Bar Close - For No Member
    campaignSliderClose(); /// Binds Campaign Slider Close

    /// If a the user is a member, show the thank you bar and slider
    /// Find the campaign object with class name 'campaign-bar-thanks'
    var thanksCampaign = campaigns.find(function (campaign) {
        return campaign.class === 'campaign_bar_thanks_class';
    });

    if (thanksCampaign) {
        /// If the campaign is found, update the campaign bar
        checkAdminBGColour();
        campaignBarClose("Member"); /// Binds Campaign Bar Close - For No Member
        $(".campaign-bar-holder").css("visibility", "visible");
        $(".campaign-bar-holder").addClass("animate-campaign-bar-in");
        updateCampaignBar(thanksCampaign);
    }
    var thanksCampaignSlider = campaignsSlider.find(function (campaignsSlider) {
        return campaignsSlider.class === 'campaign_slider_thanks_class';
    });

    if (thanksCampaignSlider) {
        $(".campaign-slider-holder").attr("style", "visibility: visible!important; z-index: 999!important;");
        var randomClasses = ['animate-campaign-slider-in-right', 'animate-campaign-slider-flip-center', 'animate-campaign-slider-flip-rightleft', 'animate-campaign-slider-in-bottom'];
        var randomClass = randomClasses[Math.floor(Math.random() * randomClasses.length)];
        $('.campaign-slider-holder').removeClass('campaign-slider-hide');
        $('.campaign-slider-holder').addClass(randomClass);
        updateCampaignSlider(thanksCampaignSlider);
    }
}

function checkMemberType() {
    var findMemberIvory = $(".member-type-ivory").length;
    var findMemberSilver = $(".member-type-silver").length;
    var findMemberGold = $(".member-type-gold").length;
    var findMemberPlatinum = $(".member-type-platinum").length;

    $(".member-type").removeClass("logo-member-type-silver logo-member-type-ivory logo-member-type-gold logo-member-type-platinum");

    if (findMemberSilver > 0) {
        $(".member-type").addClass("logo-member-type-silver");
        return true; /// Return true if member type is found
    }
    if (findMemberIvory > 0) {
        $(".member-type").addClass("logo-member-type-ivory");
        return true; /// Return true if member type is found
    }
    if (findMemberGold > 0) {
        $(".member-type").addClass("logo-member-type-gold");
        return true; /// Return true if member type is found
    }
    if (findMemberPlatinum > 0) {
        $(".member-type").addClass("logo-member-type-platinum");
        return true; /// Return true if member type is found
    }
    return false; /// Return false if no member type is found
}

$(document).ready(function () {
    campaignSliderClose(); /// Binds Campaign Slider Close
    checkCampaignBarClose(); /// Checks cookie for Campaign Bar
    checkCampaignSliderClose(); /// Checks cookie for Campaign Sliders
    checkForNotifications(); /// Checks for notifications
    checkIfSysAnimationsRanAlready(); /// Checks if the Sys Animations (Maintenance / Debug ran already)
    checkMemberType(); /// Checks MemberType and displays MemberType Label on the Logo
    /// Binds the Responsive Notifications Bell to Action the Notifcations Modal ///
    $('.notifications-icon').click(function () {
        openNotificationsModal();
    });
    campaignBarSliderInits(); /// Inits the TopBar and Bottom Right Sliders ///
});