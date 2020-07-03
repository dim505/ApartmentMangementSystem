import React, { Component } from "react";
import ReceiptExpensesChart from "./ReceiptExpensesChart";
import NumberOfTenantsAdded from "./NumberOfTenantsAdded";
import NumberOfPropertiesAdded from "./NumberOfPropertiesAdded";
import Grid from "@material-ui/core/Grid";
import GraphModal from "./GraphModal";
import Tooltip from "../shared/Tooltip";

//parent component used to house all the charts on the main page
export default class Chart extends Component {
  state = {
    GraphClicked: "",
    OpnGraphModal: false,
  };

  //function used to select the graph to display in the modal for a closer view
  OpenGraphModal(GraphClicked) {
    console.log(GraphClicked);
    this.setState({
      OpnGraphModal: true,
      GraphClicked: GraphClicked,
    });
  }

  //this closes the graph modal
  CloseGraphModal = () => {
    this.setState({ OpnGraphModal: false });
  };

  render() {
    return (
      <div>
        <GraphModal
          GraphClicked={this.state.GraphClicked}
          OpnGraphModal={this.state.OpnGraphModal}
          CloseGraphModal={this.CloseGraphModal}
          auth={this.props.auth}
          Receipts={this.props.Receipts}
        />

        <Grid container>
          <Grid
            item
            xs={4}
            onClick={() => this.OpenGraphModal("ReceiptExpensesChart")}
          >
            <Tooltip placement="top" tooltip="Click ME!!!">
              <ReceiptExpensesChart
                auth={this.props.auth}
                Receipts={this.props.Receipts}
              />
            </Tooltip>
          </Grid>

          <Grid
            item
            xs={4}
            onClick={() => this.OpenGraphModal("NumberOfTenantsAdded")}
          >
            <Tooltip placement="top" tooltip="Click ME!!">
              <NumberOfTenantsAdded auth={this.props.auth} />
            </Tooltip>
          </Grid>

          <Grid
            item
            xs={4}
            onClick={() => this.OpenGraphModal("NumberOfPropertiesAdded")}
          >
            <Tooltip placement="top" tooltip="Click ME!">
              <NumberOfPropertiesAdded auth={this.props.auth} />
            </Tooltip>
          </Grid>
        </Grid>
      </div>
    );
  }
}
