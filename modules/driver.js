'use strict';


const io = require('socket.io-client');
require('dotenv').config();
const HOST = process.env.HOST || 'http://localhost:3000';
const EEVENT = require('./Event.js')
let deliverySystem = io.connect(`${HOST}/caps`);

let safer = (pay, idd) =>{
        console.log("DRIVER: delivered " + idd)
        deliverySystem.emit('delivered', EEVENT('delivered', pay))
    }

let safe = (pay, idd) =>{
        console.log("Driver: Picked up " + idd)
        deliverySystem.emit('picked-up', EEVENT('in-transit', pay))
        setTimeout(safer, 3000, pay, idd)
    }

deliverySystem.on('pickup', payload => {
    let target = payload.payload.orderId
    setTimeout(safe, 1000, payload.payload, target)
    })



