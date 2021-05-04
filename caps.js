'use strict';

const events = require('./events.js');
let driver = require('./modules/driver.js')
let start = require('./modules/vendor.js')


console.log("CAN I SEE?")
start();
driver();
events.on('ready-for-pickup', payload =>{
    console.log("EVENT ", payload)

    events.emit('pickup', payload)
})

events.on('picked-up', payload =>{
    console.log("EVENT ", payload)
})

events.on('delivered', payload =>{
    console.log("EVENT ", payload)

    events.emit('delivery-notice', payload)
})