var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        var pushNotification = window.plugins.pushNotification;
        pushNotification.register(app.successHandler, app.errorHandler, {"senderID":"657764482273","ecb":"app.onNotificationGCM"}); 
        console.log('Received Event: ' + id);
    },
    // result contains any message sent from the plugin call
    successHandler: function(result) {
        // console.log('got in successhandler?');
        alert('Callback Success! Result = '+result)
    },
    // if pushNotification fails
    errorHandler:function(error) {
        alert(error);
    },
    onNotificationGCM: function(e) {
        switch( e.event ) {
            case 'registered':
            if ( e.regid.length > 0 ) {
                console.log("Regid " + e.regid);
                alert('registration id = '+e.regid);
                // store the regid for future use
                window.localStorage.setItem("regid", e.regid);
            }
            break;

            case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
              alert('message = '+e.message+' msgcnt = '+e.msgcnt);
              break;

              case 'error':
              alert('GCM error = '+e.msg);
              break;

              default:
              alert('An unknown GCM event has occurred');
              break;
          }
      }
  };
