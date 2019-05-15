import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

//for notifications
import swal from 'sweetalert';


export default class DialogPay extends Component {

    constructor (props){
        super(props);
        
        this.onChangeMobile =this.onChangeMobile.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state={
            mobile:'077',
            date:'',
            nic:'',
            total:'',
            num_of_ticket:'',
            email:''
        }
    }

    componentDidMount(){

        const {detail} = this.props.location.state

        this.setState({
            nic:detail.nic,
            total:detail.total,
            num_of_ticket:detail.num_of_ticket,
            email:detail.email
        });
       
    }
    onChangeMobile(e){
        this.setState({
            mobile:e.target.value
        });
    }

    onChangeDate(e){
        this.setState({
            date:e.target.value
        });
    }


    renderDiscount(){
        const {detail} = this.props.location.state
        if(detail.discount !== ''){
            return(
                <div>
                    <small>*goverment employee discount added</small>
                </div>
                );
            }
    }

    onSubmit(e){
        e.preventDefault();

        const newPayment={
            nic :this.state.nic,
            mobile : this.state.mobile,
            date : this.state.date,
            total :this.state.total,
            num_of_ticket:this.state.num_of_ticket,
            email:this.state.email
        }

        axios.post('http://localhost:4002/api/dialogPayment/add',newPayment)
             .then(response=>{
                if(response.data.isAdd){
                    swal("Successful", "Payment done successfully.A email confirmation has send to your email", "success");
                }
            }); 

        this.props.history.push('/');
    }

    render(){
        const {detail} = this.props.location.state
        return(
            <div className="col-md-10 offset-md-1">
                <div className="row">
                    <div className="col-md-3">
                        <lable>Train</lable>
                        <h3>{detail.train_name}</h3>
                    </div>
                    <div className="col-md-3">
                        <lable>From</lable>
                        <h3>{detail.city_from}</h3>
                    </div>
                    <div className="col-md-3">
                        <lable>To</lable>
                        <h3>{detail.city_to}</h3>
                    </div>
                    <div className="col-md-3">
                        <lable>1 Ticket</lable>
                        <h3>{detail.ticekt_price}</h3>
                    </div>
                </div>
                <br/>
                <h4>Dialog Mobile Payment</h4>
                <br/>
                <div className="row">
                    <div className="col-md-5">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>NIC Number</label>
                                <input  type ="text" 
                                        className="form-control"
                                        readOnly="true"
                                        value={detail.nic+'V'}
                                        required
                                        />

                            </div>

                            <div className="form-group">
                                <label>Mobile Number</label>
                                <input  type ="text" 
                                        className="form-control"
                                        value={this.state.mobile}
                                        onChange={this.onChangeMobile}
                                        maxLength={10}
                                        required
                                        />

                            </div>

                            <div className="form-group">
                                <label>Booking Date</label>
                                <input  type ="date" 
                                        className="form-control"
                                        value={this.state.date}
                                        onChange={this.onChangeDate}
                                        required
                                        />
                            </div>

                            <div className="form-group">
                            <input type="submit" value="Pay" className="btn btn-primary"/>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6 offset-md-1">
                    <div className="form-group">
                                <label>Total Ticket Price</label>
                                    <h3>Rs.{detail.total}.00</h3>
                        </div>
                        <div className="form-group">
                            {this.renderDiscount()}
                        </div>
                    </div>

                </div>
            </div>
            
        )
    }
}