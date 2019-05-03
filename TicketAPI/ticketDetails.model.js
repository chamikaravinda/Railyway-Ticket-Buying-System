//import mongoose
const mongooes =require('mongoose');
const Schema =mongooes.Schema;

//creating the model schema
let ticketDetails = new Schema({
    train_name :{
        type: String
    },

    city_from :{
        type : String
    },

    city_to:{
        type : String
    },
    ticekt_price:{
        type: Number
    }
});

//make exportable to import in server
module.exports =mongooes.model('ticketDetails',ticketDetails);