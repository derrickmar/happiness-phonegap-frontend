(function($, window, document) {

    $("document").ready(function() {
        console.log('running notif.js code');
        // console.log(colors);

        var link = 'http://2fe788aa.ngrok.com/users/' + window.localStorage.getItem("id") + "/notifs.json?user_email=" + window.localStorage.getItem("email") + "&user_token=" + window.localStorage.getItem("tkn")
        console.log(link);
        // ?user_email=derrickmar1215@berkeley.edu&user_token=59yj1pzSs3zeurEhh4GW

        $.ajax({
            headers: {
                Accept: "application/json; charset=utf-8"
            },
            url: link,
            type: 'GET',
            success: function jsSuccess(data, textStatus, jqXHR) {
                // console.log(data);
                var i = 0;
                while (i < data.length) {
                    var desc = data[i].desc;
                    var notifId = data[i].id;
                    console.log(notifId);
                    // console.log(desc);
                    // var notifHolder = '<div class="notif-desc-holder"> <div class="notif-desc">' + desc + '</div> <div class="notif-buttons"> <img class="edit-notif" src="img/edit.png" alt="Add Time"> <img class="trash-notif" src="img/trash.png" alt="Add Time"> </div> </div>';
                    var notifHolder =
                        '<div class="notif-table" style="background-color:' + colors[i] + '">'
                            + '<div class="notif-overlay hidden"></div>\
                                <div class="notif-holder">\
                                    <div class="notif-desc">'
                                        + desc +
                                     '</div>\
                                <div class="notif-buttons animated hidden"' + 'data-notifid="' + notifId + '">\
                                    <img class="edit-notif" src="img/edit.png" alt="Add Time">\
                                    <img class="trash-notif" src="img/trash.png" alt="Add Time">\
                                </div>\
                            </div>\
                        </div>';
                    $('.all-notifs').append(notifHolder);
                    i++
                }
                NotifButtons.onReady();
            },
            error: function jsError(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });

        $('.popup').on("click", function(e) {
            // e.stopPropagation();/
            $('.edit-notif-form').addClass('bounceOut').removeClass('bounceIn');
            $(this).addClass('hidden');
            // console.log('removing and adding height');
            // $(this).css('height', '');
            // $(this).css('height', '100%');
        });

        $('.input-notif').on("click", function(e) {
            e.stopPropagation();
        })

        // $(".notif-table").swipe({
        //     hold: function(event, target) {
        //         $(this).find('.notif-buttons').removeClass('hidden').removeClass("bounceOut")
        //             .addClass("bounceIn")
        //         $(this).find('.notif-overlay').fadeIn();
        //     },
        //     threshold: 50
        // });

        // $('.bounceIn').on('click', function(e) {
        //     console.log('in bounceIn??');
        //     e.stopPropagation();
        // });
    });

    var NotifButtons = {
        // this is the object NotifButtons
        onReady: function() {
            // if the document is clicked fadeout notifbuttons
            $(document).on('click', function(e) {
                console.log('bubble up to document');
                $(this).find('.notif-overlay').fadeOut();
                $(this).find('.notif-buttons').addClass("bounceOut")
                    .removeClass("bounceIn")
            });
            // unless...
            $('.notif-table').on("click", function(e) {
                var buttons = $(this).find('.notif-buttons');
                console.log(!buttons.hasClass("bounceIn"));
                // if it doesn't have bounceIn then fadeIn()
                if (!buttons.hasClass("bounceIn")) {
                    e.stopPropagation();
                    console.log('clicked on notif table without bounceIn class');
                    buttons.removeClass('hidden').removeClass("bounceOut")
                        .addClass("bounceIn")
                    $(this).find('.notif-overlay').fadeIn();
                }
            });

            $('.edit-notif').on("click", function(e) {
                e.stopPropagation();
                // console.log($(this).parent('.notif-buttons'));
                console.log($(this).parent('.notif-buttons').attr("data-notifid"));
                $('#input-notif').val($(this).parentsUntil('.notif-table').find('.notif-desc').text())   
                $('.edit-notif-form').removeClass('bounceOut').addClass('bounceIn');
                // $(".popup").fadeIn().css("display", "table");
                $('.popup').removeClass('hidden');
                
                // NotifButtons.recieveEditForm($(this).parent('.notif-buttons').attr("data-notifid"))
                // ajax call to recieve form
            });
        },
        recieveEditForm: function(id) {
            var link = 'http://2fe788aa.ngrok.com/notifs/' + window.localStorage.getItem("id")
            + "/edit?user_email=" + window.localStorage.getItem("email")
            + "&user_token=" + window.localStorage.getItem("tkn");
            console.log(link);
            $.ajax({
                // headers: {
                //     Accept: "application/json; charset=utf-8"
                // },
                url: link,
                type: 'GET',
                success: function jsSuccess(data, textStatus, jqXHR) {
                    console.log(data);
                    $(data).contents().appendTo(".popup");
                    // $(".popup").removeClass('hidden').addClass('bounceIn');

                    // var i = 0;
                    // while (i < data.length) {
                    //     var desc = data[i].desc;
                    //     var notifId = data[i].id;
                    //     console.log(notifId);
                    //     // console.log(desc);
                    //     // var notifHolder = '<div class="notif-desc-holder"> <div class="notif-desc">' + desc + '</div> <div class="notif-buttons"> <img class="edit-notif" src="img/edit.png" alt="Add Time"> <img class="trash-notif" src="img/trash.png" alt="Add Time"> </div> </div>';
                    //     var notifHolder =
                    //         '<div class="notif-table" style="background-color:' + colors[i] + '"' + 'data-notifID="' + notifId + '">' + '<div class="notif-overlay hidden"></div>\
                    //             <div class="notif-holder">\
                    //                 <div class="notif-desc">' + desc +
                    //         '</div>\
                    //                 <div class="notif-buttons animated hidden">  <img class="edit-notif" src="img/edit.png" alt="Add Time"> <img class="trash-notif" src="img/trash.png" alt="Add Time"> </div>\
                    //             </div>\
                    //         </div>';
                    //     $('.all-notifs').append(notifHolder);
                    //     i++
                    // }
                },
                error: function jsError(jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        }
    }

    // function notifButton() {

    // }

}(window.jQuery, window, document)); // The global jQuery object is passed as a parameter