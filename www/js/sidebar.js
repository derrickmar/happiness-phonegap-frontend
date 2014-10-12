(function($, window, document) {

    $("document").ready(function() {
    	console.log('running sidebar.js code');
    	
        $('.sidebar').load('sidebar.html', function() {
            $(function() {
                //Enable swiping...
                $(".sidebar-slidein").swipe({
                    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                        console.log(direction);
                    },
                    swipeLeft: function(event, distance, duration, fingerCount) {
                        $(this).removeClass("fadeInLeftBig").addClass("fadeOutLeftBig");
                    },
                    // swipeRight: function(event, distance, duration, fingerCount) {
                    //     $(this).addClass("bounceOutRight");
                    // },
                    threshold: 50
                });
            });

            $('.settings-icon').on("click", function() {
                console.log('detected click on setting-icon');
                $(".sidebar-slidein").removeClass("fadeOutLeftBig").addClass("fadeInLeftBig")
                    .removeClass('hidden');
            });

            $('.settings-icon').swipe({
                swipeRight: function(event, distance, duration, fingerCount) {
                    console.log('detected slide right on setting-icon');
                    $(".sidebar-slidein").removeClass("fadeOutLeftBig").addClass("fadeInLeftBig")
                        .removeClass('hidden');
                },
                threshold: 0
            })
        });
    });

}(window.jQuery, window, document)); // The global jQuery object is passed as a parameter