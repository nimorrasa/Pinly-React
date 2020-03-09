import React from 'react';
import './text.css';
import './formbtn.css';

import Btn_smk from './btn_smk.png';

var colorLightNR ={
  color: '#3cc7c3',
  fontSize: 25
}
var colorfont ={
  color: '#ffffff',
  fontSize: 30
}
var ButtonSize ={
    width: "50%",
    padding: 0,
    
    
  }
class BtnSmoking extends React.Component {

    state = { count: 0};

    increment = () => this.setState({count: this.state.count + 1});
    decrement = () => this.state.count > 0 && this.setState({count: this.state.count - 1});
    reset = () => this.state.count !== 0 && this.setState({count: 0});
  
    render() {
      return (
        <div className="container">
            <div className ="Bg-color">
            <button  className ="btn btn-link" onClick={this.increment}><img src={Btn_smk} alt="Caffeine Button Counter " style={ButtonSize} ></img></button>
           {/* <button className="button_storke" onClick={this.decrement}>-</button>*/}
            
 
          </div>
          <h1 style={colorfont}> Smoking <span style={colorLightNR}>(roll)</span> : {this.state.count}
          <button className="btn btn-link"onClick={this.reset}> <span style={colorLightNR}>Reset</span> </button></h1>
          
          
        </div>
    
      )
    }
  };

    export default BtnSmoking;