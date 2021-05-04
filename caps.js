'use strict';

const io = require('socket.io')(3000);
let deliverySystem = io.of('/caps')

io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

io.on('connection', socket => {
    console.log('client:', socket.id);
})

deliverySystem.on('connection', socket => {

    socket.on('ready-for-pickup', payload => {
        // emit to whatever you want here
        console.log("EVENT ", payload)
        socket.broadcast.emit('pickup', payload);
    });

    socket.on('picked-up', payload => {
        console.log("EVENT ", payload)
    })

    socket.on('delivered', payload => {
        console.log("EVENT ", payload)
        socket.broadcast.emit('delivery-notice', payload.payload);
    })
})
