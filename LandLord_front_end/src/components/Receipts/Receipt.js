import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import SnackBar from "../shared/SnackBar";
import ReceiptMainTable from "./ReceiptMainTable";
import ReceiptModal from "./ReceiptModal";
import ReceiptViewOnlyModal from "./ReceiptViewOnlyModal";
import Flip from "react-reveal/Flip";
import Axios from "axios";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fade from "react-reveal/Fade";

//this component displays the main receipt page
export default class Receipt extends Component {
  state = {
    Receipts: [],
    ReceiptFilterd: [],
    OpenNoti: false,
    Message: "",
    OpnSaveWarningBox: false,
    OpnReceiptViewModal: false,
    ShowLoader: true,
    ShowBody: false,
  };

  async componentDidMount() {
    //this gets all the receipts
    this.getReceipts();
  }

  //makes api call and sets state
  getReceipts = async () => {
    const BearerToken = await this.props.auth.getTokenSilently();
    var results = Axios.get(`${process.env.REACT_APP_BackEndUrl}/api/receipt`, {
      headers: { Authorization: `bearer ${BearerToken}` },
    }).then((results) =>
      this.setState({
        Receipts: results.data,
        ShowBody: true,
        ShowLoader: false,
      })
    );
  };

  HandleChangeReceiptModal = (newState) => {
    this.setState({ ReceiptFilterd: newState });
  };

  //when the update modal is clicked, this filters out the receipts list to the select receipt
  OpenModal = (id) => {
    let ReceiptFilterd = this.state.Receipts;
    ReceiptFilterd = ReceiptFilterd.filter((Receipt) => Receipt.id === id);

    this.setState({ OpnModal: true, ReceiptFilterd: ReceiptFilterd });
  };

  //this function closes the update receipt modal
  CloseModal = () => {
    this.setState({ OpnModal: false });
  };

  //when the update modal is clicked, this filters out the receipts list to the select receipt
  OpnReceiptViewModal = (id) => {
    let ReceiptFilterd = this.state.Receipts;
    ReceiptFilterd = ReceiptFilterd.filter((Receipt) => Receipt.id === id);

    this.setState({
      OpnReceiptViewModal: true,
      ReceiptFilterd: ReceiptFilterd,
    });
  };

  //this function closes the update receipt modal
  CloseReceiptViewModal = () => {
    this.setState({ OpnReceiptViewModal: false });
  };

  //function used to open notification alert
  OpenNoti = (message) => {
    this.setState({
      OpenNoti: true,
      Message: message,
    });
  };

  //function used to close notification alert
  CloseNoti = () => {
    this.setState({
      OpenNoti: false,
    });
  };

  //this function closes the item has
  OpenItemSavedSnkBar = () => {
    //make api call to update the record, seperate to own function

    //closes the update receipt modal
    this.CloseModal();
    //calls function to update the main receipt table
    this.getReceipts();
    //closes the "Do you want to save " dialog box and opens the "Item has been saved" notification
    this.setState({
      OpnSaveWarningBox: false,
    });
    this.OpenNoti("Item Updated");
  };

  render() {
    return (
      <div>
        <Flip left>
          <Grid container spacing={0}>
            <Grid item xs={3} />
            <Grid item xs={3} />
            <Grid item xs={3} />
            <Grid container item xs={3} justify="flex-end">
              <Link to="/AddReceipt">
                <Button variant="outlined" color="primary">
                  Add New Receipt
                </Button>
              </Link>
            </Grid>
          </Grid>

          <div className="SnackbarClass">
            <SnackBar
              position="bottom"
              OpenNoti={this.state.OpenNoti}
              CloseNoti={this.CloseNoti}
              message={this.state.Message}
            />
          </div>
        </Flip>

        <Fade top when={this.state.ShowLoader}>
          <LinearProgress />
        </Fade>

        <Fade top when={this.state.ShowBody}>
          {this.state.Receipts.length > 0 ? (
            <div>
              <ReceiptModal
                OpnModal={this.state.OpnModal}
                ReceiptFilterd={this.state.ReceiptFilterd}
                CloseModal={this.CloseModal}
                OpenItemSavedSnkBar={this.OpenItemSavedSnkBar}
                HandleChangeReceiptModal={this.HandleChangeReceiptModal}
                auth={this.props.auth}
              />

              <ReceiptViewOnlyModal
                OpnReceiptViewModal={this.state.OpnReceiptViewModal}
                ReceiptFilterd={this.state.ReceiptFilterd}
                CloseReceiptViewModal={this.CloseReceiptViewModal}
              />

              <ReceiptMainTable
                OpenModal={this.OpenModal}
                OpnReceiptViewModal={this.OpnReceiptViewModal}
                Receipts={this.state.Receipts}
                OpenItmRmvNoti={this.OpenNoti}
                getReceipts={this.getReceipts}
                auth={this.props.auth}
              />
            </div>
          ) : (
            <div className="NoReceipt">
              {" "}
              <h1>
                ***** ¯\_(ツ)_/¯ No Receipts Found. Please Add Some
                ¯\_(ツ)_/¯*****{" "}
              </h1>{" "}
            </div>
          )}
        </Fade>
      </div>
    );
  }
}
