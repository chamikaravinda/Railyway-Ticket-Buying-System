//importing express framework and creating an instance
const express = require('express');
const app = express();

//importing bodyParser and cors
const bodyParser = require('body-parser');
const cors = require('cors');

//importing mongooes to work with mongodb
const mongoose = require('mongoose');
//making router instance from express
const appRoutes = express.Router();

/*if the environment port variable is set service run on that
 port else service run on port 4002 */
const PORT = process.env.PORT || 4002;

//importing the model
let DialogDetails = require('./dialogPayDetails.model')

//add middleware cors and bodyParser to express
app.use(cors());
app.use(bodyParser.json());

//crate connection
mongoose.connect('mongodb+srv://chamikaravinda:root@cluster0-eus6c.azure.mongodb.net/SLrailway?retryWrites=true',{useNewUrlParser:true});
//get a instance of a connection
const connection =mongoose.connection;

//check DB connection
connection.once('open',function(){
    console.log("MongoDB databse connection established successfully");
})

/* CREATING HTTP END POINTS */
//get all the payment details as a json array object
appRoutes.route('/').get(function(req,res){
    DialogDetails.find(function(err,details){
        if(err){
            console.log(err);
        }else{
            res.json(details);
        }
    });
});

//get a specific payment detail 
appRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    DialogDetails.findById(id,function(err,details){
        res.json(details);
    });
});

//add ticket detials to DB as a json object 
appRoutes.route('/add').post(function(req,res){

    let details= new DialogDetails(req.body);
    details.save()
        .then(todo=>{
            res.status(200).json({'details':'Payment Details added successfully'});
        })
        .catch(err=>{
            res.status(400).send('adding new Payment Details failed');
        });

});
/* END OF CREATING HTTP END POINTS */

//creating url and adding router to the server.Every http end point extend this url
app.use('/api/dialogPayment',appRoutes);

//start the server using express
app.listen(PORT,function(){
    console.log("Server is running on PORT: "+PORT);
});