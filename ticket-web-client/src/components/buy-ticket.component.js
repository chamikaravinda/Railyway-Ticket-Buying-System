import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import DialogPay from './dialog-pay.component';
//for notifications
import swal from 'sweetalert';


export default class BuyTicket extends Component {

    constructor (props){
        super(props);

        this.onChangeNumberofTicket =this.onChangeNumberofTicket.bind(this);
        this.onChangeNIC =this.onChangeNIC.bind(this);
        this.onChangePaymentMethod =this.onChangePaymentMethod.bind(this);
        this.isValidGovernmentEmployee=this.isValidGovernmentEmployee.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        
        this.state={
            train_name:'',
            city_from:'',
            city_to:'',
            ticekt_price:'', 
            num_of_ticket:'',
            nic:'',
            payment_method:1,
            total:'',
            discount:'',
            email:''    
        }
    }

    componentDidMount(){
        axios.get('http://localhost:4000/api/ticketDetails/'+this.props.match.params.id)
            .then(response=>{
                this.setState({
                    train_name:response.data.train_name,
                    city_from:response.data.city_from,
                    city_to:response.data.city_to,
                    ticekt_price:response.data.ticekt_price
                })
            })
            .catch(function(error){
                swal("Oops,Something wrong",error,"error", {
                    buttons: false,
                    timer: 2000,
                  })
            })
    }

    onChangeNumberofTicket(e){
        this.setState({
            num_of_ticket:e.target.value,
            total:e.target.value*this.state.ticekt_price
        });

        if(this.state.nic !== ''){
            if(this.state.nic.toString().length==9){
                this.isValidGovernmentEmployee(this.state.nic)
                }else{
                    this.setState({
                        discount:'',
                        total:this.state.num_of_ticket*this.state.ticekt_price
                    }) 
                }
        }    
    }

    onChangeNIC(e){
        this.setState({
            nic:e.target.value,
        });
        if(e.target.value.toString().length==9){
        this.isValidGovernmentEmployee(e.target.value)
        }else{
            this.setState({
                discount:'',
                total:this.state.num_of_ticket*this.state.ticekt_price
            }) 
        }
    }

    isValidGovernmentEmployee(nic){
        this.setState({
            discount:'',
            total:this.state.num_of_ticket*this.state.ticekt_price
        }) 
        axios.get('http://localhost:4001/api/gov/'+nic)
             .then(response=>{
                if(response.data.isEmp){
                    this.setState({
                        total:((this.state.num_of_ticket*this.state.ticekt_price)/100)*95,
                        discount:((this.state.num_of_ticket*this.state.ticekt_price)/100)*5
                    })
                }
             })
    }



    onChangePaymentMethod(e){
        this.setState({
            payment_method:e.target.value
        });
    }

    onChangeEmail(e){
        this.setState({
            email:e.target.value
        });
    }

    renderTotal(){
        if(this.state.total !== ''){
            return(
                <h3>Rs. {this.state.total}.00</h3>
                );
            }
    }

    renderDiscount(){
        if(this.state.discount !== ''){
            return(
                <div>
                    <small>*goverment employee discount added</small>
                </div>
                );
            }
    }

    renderisNICvalid(){
        if(this.state.nic != ''){
            if(this.state.nic.toString().length === 9 ){
                return(
                    <div>
                        <small style={{color:'green'}}>*Valid NIC</small>
                    </div>
                    );
                }else {
                    return(
                        <div>
                            <small style={{color:'red'}}>*Invalid NIC</small>
                        </div>
                        );
                }
        }
    }

    onSubmit(e){
        e.preventDefault();

        let ticket={
            train_name:this.state.train_name,
            city_from:this.state.city_from,
            city_to:this.state.city_to,
            ticekt_price:this.state.ticekt_price, 
            num_of_ticket:this.state.num_of_ticket,
            nic:this.state.nic,
            payment_method:this.state.payment_method,
            total:this.state.total,
            discount:this.state.discount,
            email:this.state.email
        }
        if(this.state.payment_method==1){
        this.props.history.push({
            pathname:'/dialogPay',
            state: {
                detail:ticket
            }
        });
        }else if(this.state.payment_method==2){
            this.props.history.push({
                pathname:'/SampathPay',
                state: {
                    detail:ticket
                }
            });
        }
        
    }


    render(){
        return(
            <div className="col-md-10 offset-md-1">
                <h4>Reservations</h4>
                <br/>
                <div className="row">
                    <div className="col-md-3">
                        <lable>Train</lable>
                        <h3>{this.state.train_name}</h3>
                    </div>
                    <div className="col-md-3">
                        <lable>From</lable>
                        <h3>{this.state.city_from}</h3>
                    </div>
                    <div className="col-md-3">
                        <lable>To</lable>
                        <h3>{this.state.city_to}</h3>
                    </div>
                    <div className="col-md-3">
                        <lable>1 Ticket</lable>
                        <h3>{this.state.ticekt_price}</h3>
                    </div>
                </div>
                <br/><br/>
                <div className="row">
                    <div className="col-md-5">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Number of Ticket</label>
                                <input  type ="text" 
                                        className="form-control"
                                        value={this.state.num_of_ticket}
                                        onChange={this.onChangeNumberofTicket}
                                        required
                                        />

                            </div>

                            <div className="form-group">
                                <label>NIC Number</label>
                                <input  type ="text" 
                                        className="form-control"
                                        value={this.state.nic}
                                        onChange={this.onChangeNIC}
                                        maxLength={9}
                                        required
                                        />
                                {this.renderisNICvalid()}
                            </div>

                            <div className="form-group">
                                <label>E mail</label>
                                <input  type ="email" 
                                        className="form-control"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        required
                                        />
                                {this.renderisNICvalid()}
                            </div>

                            <div className="form-group">
                                <label>Payment Method</label>
                                <select className="form-control"
                                        onChange={this.onChangePaymentMethod}
                                        required
                                        >
                                    <option value="1">Dialog Mobile</option>
                                    <option value="2">Sampath Bank</option>
                                </select>

                            </div>

                            <div className="form-group">
                            <input type="submit" value="proceed" className="btn btn-primary"/>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6 offset-md-1">
                        <div className="form-group">
                                <label>Total Ticket Price</label>
                                    <h3>{this.renderTotal()}</h3>
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
