import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SnackBar from "../SnackBar";
import DialogBox from "../DialogBox";
import Axios from "axios";
import AnnonModal from "./AnnonModal";
import UpdateNews from "./UpdateNews";
import ViewNews from "./ViewNews";
import AnnouncementHistoryTable from "./AnnouncementHistoryTable";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

export default class LandLordNews extends Component {
  state = {
    PropNews: [
      {
        Property: "All Properties",
        NewsHeader: "Super Pooper Scooper",
        NewsBody:
          "JAJAJAJAJAJA JAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJA",
        NewsBodyShort: "JAJAJAJ AJAJAJ AJ AJAJ AJAJA",
      },
      {
        Property: "12 verde Drive Greenfield MA",
        NewsHeader: "PlumbingBroken",
        NewsBody:
          "JAJAJAJAJAJA JAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJA",
        NewsBodyShort: "JAJAJAJ AJAJAJ AJ AJAJ AJAJA",
      },
      {
        Property: "9 verde Drive Greenfield MA",
        NewsHeader: "Free Rent",
        NewsBody:
          "JAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJA",
        NewsBodyShort: "JAJAJAJAJ AJA JAJAJA AJAJ A",
      },
      {
        Property: "66 verde Drive Greenfield MA",
        NewsHeader: "Free Loader",
        NewsBody:
          "JAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJAJA",
        NewsBodyShort: "JAJAJA JAJAJAJ AJAJAJ AJAJA",
      },
    ],
    PropNewsFiltered: [],
    DialogBoxMessage: "",
    OpnModal: false,
    OpnModalVeiw: false,
  };

  FilterProp = (Property) => {
    let PropNewsFiltered = this.state.PropNews;
    PropNewsFiltered = PropNewsFiltered.filter(
      (PropNewsItem) => PropNewsItem.Property === Property
    );
    return PropNewsFiltered;
  };

  OpnModalVeiw = (Property) => {
    var PropNewsFiltered = this.FilterProp(Property);
    this.setState({
      OpnModalVeiw: true,
      PropNewsFiltered: PropNewsFiltered,
    });
  };

  OpnModal = (Property) => {
    var PropNewsFiltered = this.FilterProp(Property);
    this.setState({
      OpnModal: true,
      PropNewsFiltered: PropNewsFiltered,
    });
  };

  CloseModal = () => {
    this.setState({
      OpnModal: false,
    });
  };

  CloseModalView = () => {
    this.setState({
      OpnModalVeiw: false,
    });
  };

  HandleClick = (property) => {
    Window.PropertyToDel = property;
    this.OpenSaveWarnBox();
  };

  DeleteNews = async () => {
    //gets logged in user ID
    const BearerToken = await this.props.auth.getTokenSilently();

    this.CloseSaveWarnBox();
    //const BearerToken = await this.props.auth.getTokenSilently();
    await Axios.delete(
      `https://localhost:5001/api/receipt/delete/${Window.PropertyToDel}`,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    );

    this.OpenNoti("Delete was deleted");
  };

  OpenSaveWarnBox = (DialogBoxMessage) => {
    this.setState({
      OpnSaveWarningBox: true,
      DialogBoxMessage: "Are you sure you want to delete the record?",
    });
  };
  CloseSaveWarnBox = (Message) => {
    this.setState({
      OpnSaveWarningBox: false,
    });
  };

  OpenNoti = (Message) => {
    this.setState({
      OpenNoti: true,
      Message: Message,
    });
  };

  CloseNoti = () => {
    this.setState({
      OpenNoti: false,
    });
  };

  render() {
    return (
      <Fade top>
        <Paper classes={{ root: "CardFormStyle" }} elevation={10}>
          <Grid container>
            <Grid item xs={9} />
            <Grid container item xs={3} justify="flex-end">
              <Link to="AddNews">
                <Button variant="outlined">Add Announcement</Button>
              </Link>
            </Grid>
          </Grid>

          <Paper classes={{ root: "PayHistTitle" }} elevation={5}>
            {" "}
            <Typography align="center" variant="h4" gutterBottom>
              Announcement History
            </Typography>
          </Paper>

          <AnnouncementHistoryTable
            OpnModalVeiw={this.OpnModalVeiw}
            OpnModal={this.OpnModal}
            PropNews={this.state.PropNews}
            HandleClick={this.HandleClick}
          />
          <SnackBar
            OpenNoti={this.state.OpenNoti}
            CloseNoti={this.CloseNoti}
            message={this.state.Message}
          />

          <DialogBox
            OpnSaveWarningBox={this.state.OpnSaveWarningBox}
            CloseSaveWarnBox={this.CloseSaveWarnBox}
            Save={this.DeleteNews}
            message={this.state.DialogBoxMessage}
          />

          <AnnonModal
            OpnModal={this.state.OpnModal}
            CloseModal={this.CloseModal}
            PropNewsFiltered={this.state.PropNewsFiltered}
          />

          <AnnonModal
            OpnModal={this.state.OpnModal}
            CloseModal={this.CloseModal}
          >
            <UpdateNews
              PropNewsFiltered={this.state.PropNewsFiltered}
              CloseModal={this.CloseModal}
              OpenNoti={this.OpenNoti}
            />
          </AnnonModal>

          <AnnonModal
            OpnModal={this.state.OpnModalVeiw}
            CloseModal={this.CloseModalView}
          >
            <ViewNews PropNewsFiltered={this.state.PropNewsFiltered} />
          </AnnonModal>
        </Paper>
      </Fade>
    );
  }
}
