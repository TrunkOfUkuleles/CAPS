'use strict';


const io = require('socket.io-client');
require('dotenv').config();
const HOST = process.env.HOST || 'http://localhost:3000';
let deliverySystem = io.connect(`${HOST}/caps`);

let safer = (pay, idd) =>{
        console.log("Driver: delivered " + idd)
        deliverySystem.emit('delivered', pay)
    }

let safe = (pay, idd) =>{
        console.log("Driver: Picked up " + idd)
        deliverySystem.emit('in-transit', pay)
        setTimeout(safer, 3000, pay, idd)
    }

deliverySystem.on('pickup', payload => {
    let target = payload.orderId
    setTimeout(safe, 1000, payload, target)
    })



