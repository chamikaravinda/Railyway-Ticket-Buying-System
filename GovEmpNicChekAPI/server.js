//importing express
const express = require('express');
//create new express instance
const app = express();
//importing bodyParser and cors
const bodyParser = require('body-parser');
const cors = require('cors');
//making router instance
const govRoutes = express.Router();
//port to run the server
const PORT = process.env.PORT || 4001;
//add middleware cors and bodyParser to express
app.use(cors());
app.use(bodyParser.json());

/* CREATING HTTP END POINT */
//get a specific todo 
govRoutes.route('/:nic').get(function(req,res){
    console.log("Request Recied for nic "+req.params.nic);
    let id = req.params.nic;

    let govEmpNIC =id%2 ;

    if(govEmpNIC==0){
        console.log("Responded true");
        res.json({isEmp:true});
    }else{
        console.log("Responded false");
        res.json({isEmp:false});
    }
});
/* END OF CREATING HTTP END POINT */

//creating url and adding router to the server.Every http end point extend this url
app.use('/api/gov',govRoutes);

//start the server using express
app.listen(PORT,function(){
    console.log("Server is running on PORT: "+PORT);
});