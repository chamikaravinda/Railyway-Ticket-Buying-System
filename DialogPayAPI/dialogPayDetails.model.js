//import mongoose
const mongooes =require('mongoose');
const Schema =mongooes.Schema;

//creating the model schema
let DialogPayDetails = new Schema({
    nic :{
        type: String
    },

    mobile :{
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
module.exports =mongooes.model('DialogPayDetails',DialogPayDetails);