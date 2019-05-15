//import mongoose
const mongooes =require('mongoose');
const Schema =mongooes.Schema;

//creating the model schema
let SampathPayDetails = new Schema({
    nic :{
        type: String
    },

    card_no :{
        type : String
    },

    cvc :{
        type : String
    },

    date:{
        type : String
    },
    total:{
        type : Number
    },

    num_of_ticket:{
        type : String
    },
    
    email:{
        type : String
    }
});

//make exportable to import in server
module.exports =mongooes.model('SampathPayDetails',SampathPayDetails);