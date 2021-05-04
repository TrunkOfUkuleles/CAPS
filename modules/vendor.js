'use strict';

const faker = require('faker');
const  Event  = require("./Event");
const events = require('../events.js');
require('dotenv').config();

module.exports = () =>{

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
    let newOrder = order(process.env.COMPANY_NAME, faker.datatype.uuid(), faker.name.findName(), faker.address.cityName())
    events.emit('ready-for-pickup', new Event('pickup', newOrder))
}, 5000)

events.on('delivery-notice', payload => {
    let id = payload.payload.orderId
        console.log("VENDOR: Thank you for delivering " + id);
    })

}
