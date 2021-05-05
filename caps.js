'use strict';

const io = require('socket.io')(3000);
let deliverySystem = io.of('/caps')

deliverySystem.on('connection', socket => {

    socket.on('ready-for-pickup', payload => {
        // emit to whatever you want here
        console.log("EVENT ", payload)
        socket.broadcast.emit('pickup', payload.payload);
    });

    socket.on('picked-up', payload => {
        console.log("EVENT ", payload)
    })

    socket.on('delivered', payload => {
        console.log("EVENT ", payload)
        socket.broadcast.emit('delivery-notice', payload.payload);
    })
})
