import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

//for notifications
import swal from 'sweetalert';


export default class SampathPay extends Component {

    constructor (props){
        super(props);
        
        this.onChangeCardNo =this.onChangeCardNo.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
        this.onChangeCVC=this.onChangeCVC.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state={
            nic:'',
            card_no:'',
            cvc:'',
            date:'',
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

    onChangeCardNo(e){
        this.setState({
            card_no:e.target.value
        });
    }

    onChangeCVC(e){
        this.setState({
            cvc:e.target.value
        });
    }

    onChangeDate(e){
        this.setState({
            date:e.target.value
        });
    }


    onSubmit(e){
        e.preventDefault();

        const newPayment={
            nic : this.state.nic,
            card_no : this.state.card_no,
            cvc : this.state.cvc,
            date : this.state.date,
            total:this.state.total,
            num_of_ticket:this.state.num_of_ticket,
            email:this.state.email
        }

        axios.post('http://localhost:4003/api/sampthPayment/add',newPayment)
             .then(response=>{
                if(response.data.isAdd){
                    swal("Successful", "Payment done successfully.A email confirmation has send to your email", "success");
                }
            }); 

        this.props.history.push('/');
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
                <h4>Sampath Bank Card Payment</h4>
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
                                        />

                            </div>

                            <div className="form-group">
                                <label>Card Number</label>
                                <input  type ="text" 
                                        className="form-control"
                                        maxLength={16}
                                        value={this.state.card_no}
                                        onChange={this.onChangeCardNo}
                                        />

                            </div>

                            <div className="form-group">
                                <label>CVC </label>
                                <input  type ="text" 
                                        className="form-control"
                                        value={this.state.cvc}
                                        maxLength={3}
                                        onChange={this.onChangeCVC}
                                        />

                            </div>

                            <div className="form-group">
                                <label>Booking Date</label>
                                <input  type ="date" 
                                        className="form-control"
                                        value={this.state.date}
                                        onChange={this.onChangeDate}
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