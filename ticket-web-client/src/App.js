import React from 'react';
import { BrowserRouter as Router,Route,Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import swal from 'sweetalert';

import TrainDetails from "./components/train-details.component";
import BuyTicket from "./components/buy-ticket.component";
import DialogPay from "./components/dialog-pay.component";
import SampathPay from "./components/sampath-pay.component";

import logo from './images/railway_logo.png'

function App() {
  return (
    <Router>
    <div className="container-fluid">

      {/* navigation bar */}
      <div className="container">
        <nav className="navbar navbar-fixed-top navbar-expand-md navbar-light ">
          <a className="navbar-brand" href="https://google.com" target="_blank">
            <image src={logo}  height="50" alt="Mern stack todo home"></image>
          </a>
          <Link to="/" className="navbar-brand">Sri Lanka Railway</Link>
          <div className="collpase nav-collpase">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Train Details</Link> 
              </li>
              <li className="navbar-item">
                <Link to="/" className="nav-link">About</Link> 
              </li>
              <li className="navbar-item">
                <Link to="/" className="nav-link">Contact Us</Link> 
              </li>
            </ul>
          </div>
        </nav>
      </div>
    <br></br>
      <Route path="/" exact component={TrainDetails} />
      <Route path="/buy/:id" component={BuyTicket} />
      <Route path="/dialogPay" component={DialogPay} />
      <Route path="/SampathPay" component={SampathPay} />
      {/*Footer*/}
      <div className="fixed-bottom">
        <footer class="page-footer font-small blue">
          <div class="footer-copyright text-center py-3">© 2018 Copyright:
            <a href="https://mdbootstrap.com/education/bootstrap/"> MDBootstrap.com</a>
          </div>
        </footer>
      </div>
    </div>
   
  </Router>
  );
}

export default App;
