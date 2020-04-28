import React, { Component } from "react";
import ReceiptExpensesChart from "./ReceiptExpensesChart"
import NumberOfTenantsAdded from "./NumberOfTenantsAdded";
import NumberOfPropertiesAdded from "./NumberOfPropertiesAdded";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";



//parent component used to house all the charts on the main page 
export default class GraphModal extends Component {
  state = {

  };
 
 
  render() {
 
    return (
      
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.OpnGraphModal}
          onClose={this.props.CloseGraphModal}
        >
              <Fade in={this.props.OpnGraphModal} timeout={500}>
      <div className="CenterChart">

      {
        this.props.GraphClicked === "ReceiptExpensesChart" ? 
        <ReceiptExpensesChart 
                
        auth = {this.props.auth}
        Receipts={this.props.Receipts} /> : <div></div>

      }

      {
        this.props.GraphClicked === "NumberOfTenantsAdded" ? 
        <NumberOfTenantsAdded
                auth = {this.props.auth}
                  /> : <div></div>

      }


      {
        this.props.GraphClicked === "NumberOfPropertiesAdded" ? 
        <NumberOfPropertiesAdded
        auth = {this.props.auth}
          /> : <div></div>

      }

      </div>
             </Fade>
        </Modal>



  
    );
  }
}
