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
    PropNews: [],
    PropNewsFiltered: [],
    DialogBoxMessage: "",
    OpnModal: false,
    OpnModalVeiw: false,
  };

  componentDidMount() {
    this.GetPropNews();
  }

  GetPropNews = async () => {
    //gets logged in user ID
    const BearerToken = await this.props.auth.getTokenSilently();

    //makes api call  and sets state
    var results = Axios.get(
      "https://amsbackend.azurewebsites.net/api/Announcements/GetNews",
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then((results) => {
      this.setState({
        PropNews: results.data,
      });
    });
  };

  FilterProp = (iD) => {
    let PropNewsFiltered = this.state.PropNews;
    PropNewsFiltered = PropNewsFiltered.filter(
      (PropNewsItem) => PropNewsItem.iD === iD
    );
    return PropNewsFiltered;
  };

  OpnModalVeiw = (iD) => {
    var PropNewsFiltered = this.FilterProp(iD);
    this.setState({
      OpnModalVeiw: true,
      PropNewsFiltered: PropNewsFiltered,
    });
  };

  OpnModal = (propGuid) => {
    var PropNewsFiltered = this.FilterProp(propGuid);
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

  HandleClick = (iD) => {
    Window.NewsToDel = iD;
    this.OpenSaveWarnBox();
  };

  DeleteNews = async () => {
    //gets logged in user ID
    const BearerToken = await this.props.auth.getTokenSilently();

    this.CloseSaveWarnBox();
    //const BearerToken = await this.props.auth.getTokenSilently();
    await Axios.delete(
      `https://amsbackend.azurewebsites.net/api/Announcements/DeleteNews/${Window.NewsToDel}`,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then(() => this.GetPropNews());

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

          {this.state.PropNews.length <= 0 ? (
            <b>No News Found. Please add some</b>
          ) : (
            <div>
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
                auth={this.props.auth}
              />
            </div>
          )}

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
              auth={this.props.auth}
              GetPropNews={this.GetPropNews}
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
