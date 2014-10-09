$('#signin_button').click(function(event) {
 var link = 'https://powerful-mountain-6862.herokuapp.com/users/sign_in';
     // var link = 'https://lit-shore-1308.herokuapp.com/users/sign_in';
     // var link = 'http://localhost:3000/users/sign_in';
     $.ajax({
         headers: {
             Accept: "application/json; charset=utf-8"
         },
         url: link,
         type: 'POST',
         datatype: "JSON",
         data: {
             user: {
                 email: $('input[name="email"]').val(),
                 password: $('input[name="password"]').val()
             }
         },
         beforeSend: function() {
             $("#black_bg").fadeIn();
             $("#loading_img").fadeIn();
         },
         success: function jsSuccess(data, textStatus, jqXHR) {
             console.log("ajax succeeded");
             console.log(data);
             console.log(data.user);
             if (data.success) {
                 window.localStorage.setItem("email", data.user.email);
                 window.localStorage.setItem("tkn", data.user.authentication_token);
                 window.localStorage.setItem("id", data.user.id);
                 // window.localStorage.setItem("counter", data.user.counter);
                 window.location.href = "counter.html";
             } else {
                setTimeout(function() {
                    $("#black_bg").fadeOut();
                    $("#loading_img").fadeOut();
                    $('.notice-red').removeClass("hidden");
                }, 1000);
            }
        },
        error: function jsError(jqXHR, textStatus, errorThrown) {
         console.log("ajax failed");
         setTimeout(function() {
             $("#black_bg").fadeOut();
             $("#loading_img").fadeOut();
         }, 1000);
         $('.notice-red').removeClass("hidden");
         console.log(jqXHR);
         console.log(textStatus);
         console.log(errorThrown);
     },
     complete: function() {
        $("#black_bg").fadeOut();
        $("#loading_img").fadeOut();
    }
});
     // return false must be added so we don't refresh page
     return false;
 });


$('#log_out').click(function() {
    console.log('should be firing delete request');
    var link_delete = 'https://powerful-mountain-6862.herokuapp.com/users/sign_out';
    // var link_delete = 'https://lit-shore-1308.herokuapp.com/users/sign_out';
    // var link_delete = 'http://localhost:3000/users/sign_out';
    $.ajax({
        url: link_delete,
        type: 'POST',
        data: {
            _method:'DELETE'
            // authenticity_token: window.localStorage.getItem("tkn"),
        },
        success: function jsSuccess(data, textStatus, jqXHR) {
            console.log('user successfully logged');
        },
        error: function jsError(jqXHR, textStatus, errorThrown) {
            console.log('ERROR: user cannot log out for some reason');
        }
    });
    window.localStorage.clear();
    // window.location.href = "sign_in.html";
});