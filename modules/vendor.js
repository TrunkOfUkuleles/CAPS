'use strict';

const io = require('socket.io-client');
require('dotenv').config();
const HOST = process.env.HOST || 'http://localhost:3000';
const faker = require('faker');

let deliverySystem = io.connect(`${HOST}/caps`);

deliverySystem.emit("join", 'COOLIOSTUFFS');

function order (store, id, customer, address){
    let orderObj = {
        storeName: store,
        orderId: id,
        customerName: customer,
        address: address
    }
    return orderObj
}

setInterval(()=>{
    let newOrder = order('COOLIOSTUFFS', faker.datatype.uuid(), faker.name.findName(), faker.address.cityName())
    deliverySystem.emit('pickup', newOrder)
}, 5000)

deliverySystem.on('delivered', payload => {
        console.log("VENDOR: Thank you for delivering " + payload.orderId);
        deliverySystem.emit('confirmed', payload)
        
})

deliverySystem.on('catchup', payload => {
    console.log('Catchup report: ', payload.delivered)
    deliverySystem.emit('catched-up', payload)
})
