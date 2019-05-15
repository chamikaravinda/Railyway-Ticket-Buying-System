import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

//for notifications
import swal from 'sweetalert';

const Details = props => (
    <tr>
        <td>{props.details.train_name}</td>
        <td>{props.details.city_from}</td>
        <td>{props.details.city_to}</td>
        <td>Rs. {props.details.ticekt_price}.00</td>
        <td>
            <Link to = {"/buy/"+props.details._id}>Book</Link>
        </td>
    </tr>

)

export default class TrainDetails extends Component {

    constructor(props ){
        super(props);
        this.state = {details :[]};
    }

    componentDidMount(){
        axios.get('http://localhost:4000/api/ticketDetails')
        .then(response =>{
            this.setState({details:response.data})
        })
        .catch(function(error){
            swal("Oops,Something wrong",error,"error", {
                buttons: false,
                timer: 2000,
              })
        })
    }

    DetailsList(){
        return this.state.details.map(function(currentDetails,i){
            return <Details details ={currentDetails} key={i}/>;
        });
    }
    render(){
        return(
            <div className="col-md-10 offset-md-1">
                <br/>
                <h4>Trains</h4>
                <br/>
                <table className="table table-striped" style={{marginTop : 20 }}>
                    <thead>
                        <tr>
                            <td>Train</td>
                            <td>From</td>
                            <td>To</td>
                            <td>1 Ticket</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.DetailsList()}
                    </tbody>
                </table>
            </div>
        )
    }
}