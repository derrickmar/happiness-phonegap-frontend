// var auth_token_exists = window.localStorage.getItem("tkn");
// console.log('auth_token_exists: ' + auth_token_exists);

$('#sign_in_slide').click(function(event) {
    console.log('clicked sign_in_slide');
    $('#sign-in-form').removeClass('hidden');
    $('#sign-up-form').removeClass('bounceInLeft');
    $('#sign-up-form').addClass('bounceOutLeft');
    $('#sign-in-form').removeClass('bounceOutRight');
    $('#sign-in-form').addClass('bounceInRight');
});

$('#sign_up_slide').click(function(event) {
    console.log('clicked sign_up_slide');
    $('#sign-up-form').removeClass('bounceOutLeft');
    $('#sign-up-form').addClass('bounceInLeft');
    $('#sign-in-form').removeClass('bounceInRight');
    $('#sign-in-form').addClass('bounceOutRight');
});

$('#signup_button').click(function(event) {
    console.log("clicked signup button");
    $.ajax({
        headers: {
            Accept: "application/json; charset=utf-8"
        },
        url: 'https://powerful-mountain-6862.herokuapp.com/users',
        type: 'POST',
        datatype: "JSON",
        data: {
            user: {
                email: $('input[name="email"]').val(),
                password: $('input[name="password"]').val(),
                password_confirmation: $('input[name="password"]').val(),
                regid: window.localStorage.getItem("regid")
            }
        },
        beforeSend: function() {
            console.log('should be fading in');
            $("#black_bg").fadeIn();
            $("#loading_img").fadeIn();
        },
        success: function jsSuccess(data, textStatus, jqXHR) {
            console.log(data.success);
            console.log(data.user);
            if (data.success) {
                console.log("ajax signup succeeded, user has been created");
                window.localStorage.setItem("email", data.user.email);
                window.localStorage.setItem("tkn", data.user.authentication_token);
                window.localStorage.setItem("id", data.user.id);
                // window.localStorage.setItem("counter", data.user.counter);
                setTimeout(function() {
                    window.location.href = "counter.html";
                }, 1000);
            } else {
                console.log(data.errors);
                $(".notice-red").html("");
                for (i = 0; i < data.errors.length; i++) {
                    console.log("error: " + data.errors[i]);
                    $(".notice-red").append("<li>• " + data.errors[i] + "</li>");
                }
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
                $('.notice-red').removeClass("hidden");
            }, 1000);
        },
        complete: function() {
            setTimeout(function() {
                $("#black_bg").fadeOut();
                $("#loading_img").fadeOut();
            }, 4000);
        }
    });
return false;
});

$('#signin_button').click(function(event) {
    var link = 'https://powerful-mountain-6862.herokuapp.com/users/sign_in';
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
                    email: $('input[name="signin-email"]').val(),
                    password: $('input[name="signin-password"]').val()
                }
            },
            beforeSend: function() {
                $("#black_bg").fadeIn();
                $("#loading_img").fadeIn();
            },
            success: function jsSuccess(data, textStatus, jqXHR) {
                console.log("ajax succeeded");
                console.log(data);
                if (data.success) {
                    window.localStorage.setItem("email", data.user.email);
                    window.localStorage.setItem("tkn", data.user.authentication_token);
                    window.localStorage.setItem("id", data.user.id);
                    window.localStorage.setItem("counter", data.user.counter);
                    setTimeout(function() {
                        window.location.href = "counter.html";
                    }, 1000);
                } else {
                    setTimeout(function() {
                        $("#black_bg").fadeOut();
                        $("#loading_img").fadeOut();
                        $('.notice-red').removeClass("hidden");
                    }, 1000);
                }
            },
            error: function jsError(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.status);
                if (jqXHR.status == 401) {
                    $('.notice-signin').removeClass('hidden');
                } else {
                    console.log("ajax failed");
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
                setTimeout(function() {
                    $("#black_bg").fadeOut();
                    $("#loading_img").fadeOut();
                }, 1000);
            }
        });
    // return false must be added so we don't refresh page
    return false;
});