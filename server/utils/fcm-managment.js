var admin = require('firebase-admin');

// Load FireBase Credentials
var userServiceAccount = require('../firebase/shadow-1688d-firebase-adminsdk-cfb0q-204952c041.json');

// Declare FireBase Apps
var _userFCM = admin.initializeApp({
    credential: admin.credential.cert(userServiceAccount),
}, 'userFCM');

exports.userNotification = function(tokensList, title, body, data) {
    var payload = {
        notification: {
            title,
            body
        },
        data: data
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
