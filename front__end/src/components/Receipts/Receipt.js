import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import ReceiptMainTable from "./ReceiptMainTable";
import ReceiptModal from "./ReceiptModal";
import Flip from "react-reveal/Flip";
import Axios from 'axios';

export default class Receipt extends Component {
  state = {
    Receipts: [],
    ReceiptFilterd: [],
    OpenItmRmvNoti: false,
    OpenItemSavedNoti: false,
    OpnSaveWarningBox: false
  };

  async componentDidMount() {
    this.getReceipts();
    

    
  }



     getReceipts =  () => {
     var results =   Axios({
      url: "https://amsbackend.azurewebsites.net/api/receipt"
     }).then( (results) => 
     this.setState({
      Receipts: results.data
     }),
      
     );


  }

  HandleChangeReceiptModal = newState => {
    debugger;
    this.setState({ ReceiptFilterd: newState });
  };


  OpenModal = id => {
    debugger;
    let ReceiptFilterd = this.state.Receipts;
    ReceiptFilterd = ReceiptFilterd.filter(Receipt => Receipt.id === id);

    this.setState({ OpnModal: true, ReceiptFilterd: ReceiptFilterd });
  };

  CloseModal = () => {
    this.setState({ OpnModal: false });
  };

  OpenItmRmvNoti = () => {
    this.setState({ OpenItmRmvNoti: true });
  };

  CloseItmRmvNoti = () => {
    this.setState({ OpenItmRmvNoti: false });
  };

  OpenItemSavedSnkBar = () => {
    //make api call to update the record, seperate to own function

    debugger;


    this.CloseModal();
    this.getReceipts();
    this.setState({
      OpnSaveWarningBox: false,
      OpenItemSavedNoti: true
    });
  };

  CloseItemSavedSnkBar = () => {
    this.setState({ OpenItemSavedNoti: false });
  };

  render() {
    return (

      <div>
        <Flip left>
        <div className="ReceiptAddBtn">
            <Link to="/AddReceipt">
              <Button variant="outlined" color="primary">
                Add New Receipt
              </Button>
            </Link>
          </div>
          <div className="SnackbarClass">
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          key={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.OpenItemSavedNoti}
          onClose={() => this.CloseItemSavedSnkBar()}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Item Updated</span>}
        />
        </div>
          <div className="SnackbarClass">
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          key={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.OpenItmRmvNoti}
          onClose={() => this.CloseItmRmvNoti()}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Item Removed</span>}
        />
        </div>
        
        {this.state.Receipts.length > 0 ? ( 
        
        <div>
        <ReceiptModal
          OpnModal={this.state.OpnModal}
          ReceiptFilterd={this.state.ReceiptFilterd}
          CloseModal={this.CloseModal}
          OpenItemSavedSnkBar={this.OpenItemSavedSnkBar}
          HandleChangeReceiptModal={this.HandleChangeReceiptModal}
        />

        <ReceiptMainTable
          OpenModal={this.OpenModal}
          Receipts={this.state.Receipts}
          OpenItmRmvNoti={this.OpenItmRmvNoti}
          getReceipts = {this.getReceipts}
        />
        </div> ) : (

          <h1>***** ¯\_(ツ)_/¯ No Receipts Found. Please Add Some ¯\_(ツ)_/¯***** </h1>
        )

        }

</Flip>
      </div>
    );
  }
}
