var gcm = require('node-gcm');
var message = new gcm.Message();
 
//API Server Key
var sender = new gcm.Sender('AIzaSyBKhhSO7a-ED6xPo4-iFmQVEJPTdyyZMMg');
var registrationIds = [];
 
// Value the payload data to send...
message.addData('message',"\u270C Peace, Love \u2764 and PhoneGap \u2706!");
message.addData('title','Push Notification Sample' );
message.addData('msgcnt','3'); // Shows up in the notification in the status bar
message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
//message.collapseKey = 'demo';
//message.delayWhileIdle = true; //Default is false
message.timeToLive = 30;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.
 
// At least one reg id required
registrationIds.push('APA91bGq79oO_F_4XZIGgKkt_UQEGpWoEw8OVlAzLJVWGHTs61rQzw6xVrl2fIaEsi9tqVg5l0yAjdmHdWeyyVkEPVmQx4GbVtQUgwlvBT9veJqQbuwf9-nbBd23nP1uKrPJkmJd1aoQ5dgBtBSPkaLXuWR_jF0cgNZeG_gj5PQ0NraVZFUMzno')

/**
 * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
 */
sender.send(message, registrationIds, 4, function (result) {
    console.log(result);
});