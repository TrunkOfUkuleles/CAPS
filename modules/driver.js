'use strict';

const events = require('../events.js');
const  Event  = require("./Event");

module.exports = () => {

events.on('pickup', payload => {
    let pay = payload.payload
    let eyed = pay.orderId
    let safer = (pay, eyed) =>{
        console.log("DRIVER: delivered " + eyed)
        events.emit('delivered', new Event('delivered', pay))
    }
    
    let safe = (pay, eyed) =>{
        console.log("Driver: Picked up " + eyed)
        events.emit('picked-up', new Event('in-transit', pay))
        setTimeout(safer, 3000, pay, eyed)
    }
    setTimeout(safe, 1000, pay, eyed)
    })

}


