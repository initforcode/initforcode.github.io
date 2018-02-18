/*
    All functions to be associated with document ready.
*/

// What is this hiding?
$(document).ready(function () {
    $(".uk-nav-primary li").click(function () {
        UIkit.offcanvas("#offcanvas-nav-primary").hide();
    });
});

// Display the Hash Logo as you scroll down.
$(document).ready(function () {
    $(window).scroll(function () {
        var scrollPos = $(window).scrollTop();
        if (scrollPos >= 600) {
            $(".hashlogo").addClass("large-nav").promise().done(function () {
                $(".hashlogo").removeClass("hidden").addClass("fadeInLeft animated");
            });
        } else if (scrollPos <= 500) {
            $(".hashlogo").removeClass("large-nav").promise().done(function () {
                $(".hashlogo").removeClass("fadeInLeft").addClass("fadeOutLeft").promise().done(function () {
                    $(".hashlogo").removeClass("fadeOutLeft").addClass("hidden");
                });
            });
        }
    });
});
