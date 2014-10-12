(function($, window, document) {

    $("document").ready(function() {
        console.log('running notif.js code');
        console.log(colors);

        var link = 'http://2fe788aa.ngrok.com/users/' + window.localStorage.getItem("id")
            + "/notifs.json?user_email=" + window.localStorage.getItem("email") + "&user_token="
            + window.localStorage.getItem("tkn")
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
                    console.log(" IN HERE");
                    var desc = data[i].desc;
                    console.log(desc);
                    // var notifHolder = '<div class="notif-desc-holder"> <div class="notif-desc">' + desc + '</div> <div class="notif-buttons"> <img class="edit-notif" src="img/edit.png" alt="Add Time"> <img class="trash-notif" src="img/trash.png" alt="Add Time"> </div> </div>';
                    var notifHolder = '<div class="notif-desc-holder"' + 'style="background-color:' + colors[i] 
                        + '">' 
                        + '<div class="notif-desc">'
                        + desc + 
                        '</div>\
                        <div class="notif-buttons">\
                            <img class="edit-notif" src="img/edit.png" alt="Add Time">\
                            <img class="trash-notif" src="img/trash.png" alt="Add Time">\
                        </div>\
                    </div>';
                    console.log(notifHolder);
                    $('.all-notifs').append(notifHolder);
                    i++
                    console.log(i);
                }
            },
            error: function jsError(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    });

} (window.jQuery, window, document)); // The global jQuery object is passed as a parameter