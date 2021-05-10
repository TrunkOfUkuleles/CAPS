'use strict';

const io = require('socket.io-client');
require('dotenv').config();
const HOST = process.env.HOST || 'http://localhost:3000';
const faker = require('faker');
const EEVENT = require('./Event.js')

let deliverySystem = io.connect(`${HOST}/caps`);


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
    let newOrder = order('AMAZON.BOMB', faker.datatype.uuid(), faker.name.findName(), faker.address.cityName())
    deliverySystem.emit('ready-for-pickup',  EEVENT('pickup', newOrder))
}, 5000)

deliverySystem.on('delivery-notice', payload => {

    if (payload.storeName === 'AMAZON.BOMB'){
        console.log("VENDOR: Thank you for delivering " + payload.orderId);
    }
})
