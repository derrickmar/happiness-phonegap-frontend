(function($, window, document) {

    // The $ is now locally scoped 
    $("document").ready(function() {

        console.log('running reminder.js code');

        $('#log_out').click(function() {
            console.log('should be firing delete request');
            var link_delete = 'https://powerful-mountain-6862.herokuapp.com/users/sign_out';
            // var link_delete = 'https://lit-shore-1308.herokuapp.com/users/sign_out';
            // var link_delete = 'http://localhost:3000/users/sign_out';
            $.ajax({
                url: link_delete,
                type: 'POST',
                data: {
                    _method: 'DELETE'
                        // authenticity_token: window.localStorage.getItem("tkn"),
                },
                success: function jsSuccess(data, textStatus, jqXHR) {
                    console.log('user successfully logged');
                },
                error: function jsError(jqXHR, textStatus, errorThrown) {
                    console.log('ERROR: user cannot log out for some reason');
                },
                complete: function() {
                    // happens after success and error callback
                    window.localStorage.clear();
                    window.location.href = "sign_in.html";
                }
            });
        });


    });


}(window.jQuery, window, document)); // The global jQuery object is passed as a parameter