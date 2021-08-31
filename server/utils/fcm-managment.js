var admin = require('firebase-admin');

// Load FireBase Credentials
var userServiceAccount = require('../firebase/hatunna-pampa-firebase-adminsdk-tdsz5-f04edf7619.json');

// Declare FireBase Apps
var _userFCM = admin.initializeApp({
    credential: admin.credential.cert(userServiceAccount),
}, 'userFCM');

exports.userNotification = function(tokensList, title, body, data) {

    // var dataA = {
    //     title,
    //     dat,
    //     click_action: 'FLUTTER_NOTIFICATION_CLICK'
    // };

    data.__v = "";
    data.$__ = "";
    data.isNew = "";
    data.errors = "";
    console.log(data);

    var payload = {
        notification: {
            title,
            body,
            click_action: 'FLUTTER_NOTIFICATION_CLICK'
        },
        data
    };
    return _userFCM.messaging().sendToDevice(tokensList, payload);
};

// Broadcast Messages
// user
exports.userBroadcastNotification = function(title, body, data, topico) {
    var payload = {
        notification: {
            title,
            body
        },
        data: data
    };
    return _userFCM.messaging().sendToTopic(`/topics/${topico}`, payload);
};
