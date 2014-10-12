(function($, window, document) {

    function oneNotifHolder(i, desc, notifId) {
        var notifHolder =
        '<div class="notif-table" style="background-color:' + colors[i] + '">' + '<div class="notif-overlay hidden"></div>\
                <div class="notif-holder">\
                <div class="notif-desc">' + desc + '</div>\
                <div class="notif-buttons animated hidden" data-notifid="' + notifId + '">\
                    <img class="edit-notif" src="img/edit.png" alt="Add Time">\
                    <img class="trash-notif" src="img/trash.png" alt="Add Time">\
                </div>\
            </div>\
        </div>';
        return notifHolder;
    }

    function getRandomInt(min, max) {
        console.log('in random int');
        console.log(min);
        console.log(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var PopUpFunc = {
        currPopupId: 0,
        popUpListeners: function() {
            $('.popup').on("click", function(e) {
                e.stopPropagation();
                console.log('popup click running!');
                // console.log('removing and adding height');
                // $(this).css('height', '');
                // $(this).css('height', '100%');
                PopUpFunc.hidePopUp();
            });

            $('#input-notif').on("click", function(e) {
                e.stopPropagation();
            });
        },

        hidePopUp: function () {
            $('.edit-notif-form').addClass('bounceOut').removeClass('bounceIn', function() {
                setTimeout(function() {
                    $('.popup').addClass('hidden');
                }, 600);
            }());
        }
    }

    var NotifButtons = {
        prevPopUp: {},
        // this is the object NotifButtons
        onReady: function() {
            // if the document is clicked fadeout notifbuttons
            $(document).on('click', function(e) {
                console.log('bubble up to document');
                NotifButtons.hideNotifButtons($(this));
            });
            // unless...
            $('.notif-table').on("click", function(e) {
                var buttons = $(this).find('.notif-buttons');
                var overlay = $(this).find('.notif-overlay');
                console.log(!buttons.hasClass("bounceIn"));

                // if it doesn't have bounceIn then fadeIn()
                if (!buttons.hasClass("bounceIn")) {
                    e.stopPropagation();

                    if (NotifButtons.prevPopUp.overlay != null) {
                        // fadeOut a bounceIn CLass if exists
                        NotifButtons.prevPopUp.overlay.fadeOut();
                        NotifButtons.prevPopUp.buttons.addClass("bounceOut").removeClass("bounceIn")
                    }

                    console.log('clicked on notif table without bounceIn class');
                    NotifButtons.prevPopUp = { overlay: overlay, buttons: buttons };
                    NotifButtons.showNotifButtons(overlay, buttons);
                }
            });

            this.onClickAddNotifBtn();
            this.onClickCreateNotifBtn();
            this.onClickEditNotifBtn();
            this.onClickUpdateNotifBtn();
        },
        onClickAddNotifBtn: function() {
            $('#add-button').on("click", function(e) {
                // e.stopPropagation();
                $('.create_button').removeClass('hidden');
                $('.update_button').addClass('hidden');
                $('#input-notif').val("").attr('placeholder','Enter your new happiness notification:');
                $('.edit-notif-form').removeClass('bounceOut').addClass('bounceIn');
                $('.popup').removeClass('hidden');
            });
        },
        onClickCreateNotifBtn: function() {
            $('.create_button').on("click", function(e) {
                console.log('clicked create button');
                NotifButtons.ajaxCreate($('#input-notif').val());
            })
        },
        ajaxCreate: function(description) {
            var link = 'http://2fe788aa.ngrok.com/notifs';
            console.log(link);
            $.ajax({
                headers: {
                    Accept: "application/json; charset=utf-8"
                },
                url: link,
                type: 'POST',
                data: {
                    notif: {
                        desc: description,
                        'default': false
                    },
                    user_id: window.localStorage.getItem("id"),
                    user_email: window.localStorage.getItem("email"),
                    user_token: window.localStorage.getItem("tkn")
                },
                success: function jsSuccess(data, textStatus, jqXHR) {
                    console.log('creating notif successful');
                    console.log(data);
                    var color = getRandomInt(0, colors.length - 1);
                    console.log(color);
                    var notifHolder = oneNotifHolder(color, data.desc, data.id);
                    $('.all-notifs').prepend(notifHolder);
                    PopUpFunc.hidePopUp();
                },
                error: function jsError(jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        },
        showNotifButtons: function(overlay, buttons) {
            buttons.removeClass('hidden').removeClass("bounceOut")
                .addClass("bounceIn");
            overlay.fadeIn();
        },
        hideNotifButtons: function(document) {
            document.find('.notif-overlay').fadeOut();
            document.find('.notif-buttons').addClass("bounceOut")
                .removeClass("bounceIn")
        },
        onClickEditNotifBtn: function() {
            $('.edit-notif').on("click", function(e) {
                console.log('edit-notif button clicked');
                e.stopPropagation();

                $('.update_button').removeClass('hidden');
                $('.create_button').addClass('hidden');

                // for the editbutton you just clicked find the description
                var notif_desc = $(this).closest('.notif-table').find('.notif-desc');
                PopUpFunc.currPopupId = $(this).closest('.notif-buttons').attr("data-notifid");
                console.log(PopUpFunc.currPopupId);

                // populate the textbox with the right description and show popup
                $('#input-notif').val(notif_desc.text())
                $('.edit-notif-form').removeClass('bounceOut').addClass('bounceIn');
                $('.popup').removeClass('hidden');
            });
        },
        onClickUpdateNotifBtn: function() {
            $('.update_button').on("click", function(e) {
                NotifButtons.ajaxUpdate(PopUpFunc.currPopupId,
                    $(this).siblings('#input-notif').val());
            })
        },
        ajaxUpdate: function(id, description) {
            var link = 'http://2fe788aa.ngrok.com/notifs/' + id
            console.log(link);
            $.ajax({
                headers: {
                    Accept: "application/json; charset=utf-8"
                },
                url: link,
                type: 'POST',
                data: {
                    _method:'PATCH',
                    notif: {
                        desc: description,
                    },
                    user_id: window.localStorage.getItem("id"),
                    user_email: window.localStorage.getItem("email"),
                    user_token: window.localStorage.getItem("tkn")
                    // user_token: "dasfasf"
                },
                success: function jsSuccess(data, textStatus, jqXHR) {
                    console.log('updating notif successful');
                    console.log(data);
                    NotifButtons.updateDesc(data.id, data.desc);
                    PopUpFunc.hidePopUp();
                },
                error: function jsError(jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        },
        updateDesc: function(id, description) {
            var elemDesc = $(".notif-buttons[data-notifid='" + id + "']").siblings('.notif-desc');
            elemDesc.text(description);
            NotifButtons.hideNotifButtons($(document));
        }
    }

    $("document").ready(function() {

        ;(function($) {
            var oAddClass = $.fn.addClass;
            $.fn.addClass = function() {
                for (var i in arguments) {
                    var arg = arguments[i];
                    if (!!(arg && arg.constructor && arg.call && arg.apply)) {
                        arg();
                        delete arg;
                    }
                }
                return oAddClass.apply(this, arguments);
            }
        })(jQuery);

        console.log('running notif.js code');
        // console.log(colors);

        var link = 'http://2fe788aa.ngrok.com/users/' + window.localStorage.getItem("id") + "/notifs.json";
        console.log(link);
        // ?user_email=derrickmar1215@berkeley.edu&user_token=59yj1pzSs3zeurEhh4GW

        $.ajax({
            headers: {
                Accept: "application/json; charset=utf-8"
            },
            data: {
                user_email: window.localStorage.getItem("email"),
                user_token: window.localStorage.getItem("tkn")
            },
            url: link,
            type: 'GET',
            success: function jsSuccess(data, textStatus, jqXHR) {
                // console.log(data);
                var i = 0;
                while (i < data.length) {
                    var desc = data[i].desc;
                    var notifId = data[i].id;
                    // console.log(desc);
                    // var notifHolder = '<div class="notif-desc-holder"> <div class="notif-desc">' + desc + '</div> <div class="notif-buttons"> <img class="edit-notif" src="img/edit.png" alt="Add Time"> <img class="trash-notif" src="img/trash.png" alt="Add Time"> </div> </div>';
                    var notifHolder = oneNotifHolder(i, desc, notifId);
                    $('.all-notifs').append(notifHolder);
                    i++
                }

                NotifButtons.onReady();
                PopUpFunc.popUpListeners();
            },
            error: function jsError(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });

    });

    // function addCallbackToAddClass() {
    //     ;(function($) {
    //         var oAddClass = $.fn.addClass;
    //         $.fn.addClass = function() {
    //             for (var i in arguments) {
    //                 var arg = arguments[i];
    //                 if (!!(arg && arg.constructor && arg.call && arg.apply)) {
    //                     arg();
    //                     delete arg;
    //                 }
    //             }
    //             return oAddClass.apply(this, arguments);
    //         }
    //     })(jQuery);
    // }

   

    // function notifButton() {

    // }

}(window.jQuery, window, document)); // The global jQuery object is passed as a parameter