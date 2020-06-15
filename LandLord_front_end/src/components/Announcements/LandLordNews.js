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

//parent component that holds the news page
export default class LandLordNews extends Component {
  state = {
    PropNews: [],
    PropNewsFiltered: [],
    DialogBoxMessage: "",
    OpnModal: false,
    OpnModalVeiw: false,
  };

  //gets all the news related to Landlord's property
  componentDidMount() {
    this.GetPropNews();
  }

  //makes api call to get the news property
  GetPropNews = async () => {
    //gets logged in user ID
    const BearerToken = await this.props.auth.getTokenSilently();

    //makes api call  and sets state
    var results = Axios.get(
      "https://localhost:5001/api/Announcements/GetNews",
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then((results) => {
      this.setState({
        PropNews: results.data,
      });
    });
  };

  //filters the property to display on the Modal
  FilterProp = (iD) => {
    let PropNewsFiltered = this.state.PropNews;
    PropNewsFiltered = PropNewsFiltered.filter(
      (PropNewsItem) => PropNewsItem.iD === iD
    );
    return PropNewsFiltered;
  };

  //opens the view modal and set the property to be displayed
  OpnModalVeiw = (iD) => {
    var PropNewsFiltered = this.FilterProp(iD);
    this.setState({
      OpnModalVeiw: true,
      PropNewsFiltered: PropNewsFiltered,
    });
  };
  //opens the edit modal and set the property to be displayed
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

  //function that handles the delete button click
  HandleClick = (iD) => {
    Window.NewsToDel = iD;
    this.OpenSaveWarnBox();
  };

  //function that is called to delete a news item
  DeleteNews = async () => {
    //gets logged in user ID
    const BearerToken = await this.props.auth.getTokenSilently();
    //closes warning box
    this.CloseSaveWarnBox();
    //makes API to delete new item and gets new list
    await Axios.delete(
      `https://localhost:5001/api/Announcements/DeleteNews/${Window.NewsToDel}`,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then(() => this.GetPropNews());
    //open notification alert
    this.OpenNoti("Delete was deleted");
  };

  //function used to open warning box
  OpenSaveWarnBox = (DialogBoxMessage) => {
    this.setState({
      OpnSaveWarningBox: true,
      DialogBoxMessage: "Are you sure you want to delete the record?",
    });
  };
  //function used to close warning box
  CloseSaveWarnBox = (Message) => {
    this.setState({
      OpnSaveWarningBox: false,
    });
  };

  //function used to open notification alert
  OpenNoti = (Message) => {
    this.setState({
      OpenNoti: true,
      Message: Message,
    });
  };
  //function used to close notification alert
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
