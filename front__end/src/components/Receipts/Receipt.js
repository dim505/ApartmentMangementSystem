import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import ReceiptMainTable from "./ReceiptMainTable";
import ReceiptModal from "./ReceiptModal";
import Bounce from "react-reveal/Bounce";


export default class Receipt extends Component {
  state = {
    Receipts: [
      {
        id: "1",
        Date: "2020-01-20",
        Store: "Home Depot",
        Tax: "4",
        TotalAmount: "20",
        Image: "123"
      },
      {
        id: "2",
        Date: "2020-02-20",
        Store: "Lowes",
        Tax: "4",
        TotalAmount: "20",
        Image: "123"
      },
      {
        id: "3",
        Date: "2020-03-20",
        Store: "BJ",
        Tax: "4",
        TotalAmount: "20",
        Image: "123"
      }
    ],
    ReceiptFilterd: [],
    OpenItmRmvNoti: false,
    OpenItemSavedNoti: false,
    OpnSaveWarningBox: false
  };

  async componentDidMount() {
    this.getReceipts();
  }

  async getReceipts() {
    // var results = await Axios({
    //  url: "https://amsbackend.azurewebsites.net/api/receipt"
    // }).then(console.log(() => results));
  }

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
        <Link to="/AddReceipt">
          <Button className="ReceiptAddBtn" variant="outlined" color="primary">
            ADD New Receipt
          </Button>
        </Link>

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

        

        <ReceiptModal
          OpnModal={this.state.OpnModal}
          ReceiptFilterd={this.state.ReceiptFilterd}
          CloseModal={this.CloseModal}
          OpenItemSavedSnkBar={this.OpenItemSavedSnkBar}
        />

        <ReceiptMainTable
          OpenModal={this.OpenModal}
          Receipts={this.state.Receipts}
          OpenItmRmvNoti={this.OpenItmRmvNoti}
        />

        
      </div>
    );
  }
}
