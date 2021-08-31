var admin = require('firebase-admin');

// Load FireBase Credentials
var userServiceAccount = require('../firebase/hatunna-pampa-firebase-adminsdk-tdsz5-f04edf7619.json');

// Declare FireBase Apps
var _userFCM = admin.initializeApp({
    credential: admin.credential.cert(userServiceAccount),
}, 'userFCM');

exports.userNotification = function(tokensList, title, body, data) {

    var dat = {
        estado: data.estado,
        comentario: data.comentario,
        _id: data._id,
        fecha: data.fecha,
        subtotal: data.subtotal +"",
        iva: data.iva +"",
        total: data.total + "",
        usuario: data.usuario + "",
    }

    var dataA = {
        title,
        body: dat,
        click_action: 'FLUTTER_NOTIFICATION_CLICK'
    };

    // data.__v = "";
    // data.$__ = "";

    var payload = {
        notification: {
            title,
            body,
            click_action: 'FLUTTER_NOTIFICATION_CLICK'
        },
        data: dataA
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
