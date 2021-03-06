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

//import nodemailer email service
const nodemailer = require('nodemailer');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/*if the environment port variable is set service run on that
 port else service run on port 4003 */
const PORT = process.env.PORT || 4003;

//importing the model
let SampathDetails = require('./sampathPayDetails.model')

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
    SampathDetails.find(function(err,details){
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
    SampathDetails.findById(id,function(err,details){
        res.json(details);
    });
});

//add ticket detials to DB as a json object 
appRoutes.route('/add').post(function(req,res){
    let details= new SampathDetails(req.body);
    details.save()
        .then(details=>{
            console.log('befor email notification');
            emailnotification(details);
            res.status(200).json({isAdd:true});
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json({isAdd:false});
        });

});
/* END OF CREATING HTTP END POINTS */

//creating url and adding router to the server.Every http end point extend this url
app.use('/api/sampthPayment',appRoutes);

//start the server using express
app.listen(PORT,function(){
    console.log("Server is running on PORT: "+PORT);
});

function emailnotification(detail){
    console.log('inside email notification '+detail);
    var output=`<b>Payment Recived</b>
                <p>Dear Sir/Madam, We recieved your payment of ${detail.total} LKR. 
                Thank you for using Sampath Bank Payment Service.</p>`; 


    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'railwayticket0000@gmail.com',
            pass: 'ams@1996'
        }
    });
    let mailOptions = {
        from: 'railwayticket0000@gmail.com <Dialog Payments>',
        to:detail.email,
        subject: 'Ticket Confirmation',
        html: output
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}