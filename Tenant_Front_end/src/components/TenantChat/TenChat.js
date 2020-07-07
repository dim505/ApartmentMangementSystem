import React, { Component } from "react";
import { Widget, addResponseMessage, addUserMessage } from "react-chat-widget";
import Axios from "axios";
import Chat from "twilio-chat";
import SnackBar from "../Shared/SnackBar";
import Image from "../Home/Hotel.jpg";

export default class TenChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Message: "",
      ChatMessages: [],
      OpenNoti: false,
      QuickButtonClicked: true,
    };
  }

  async componentDidMount() {
    // Detect all clicks on the document
    document.addEventListener(
      "click",
      function (event) {
        // If the click happened inside the modal, do nothing
        if (event.target.closest(".rcw-close-button")) return;
        window.ClickOpen = false;
      },
      false
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.results.length > 0 && window.ApiCallAlreadyMade !== true) {
      this.GetChatData();
    }
  }

  async GetChatData() {
    window.ApiCallAlreadyMade = true;
    window.ClickOpen = false;
    var Mydata = {};
    var GetToken = {
      device: "browser",
      TenGuid: this.props.results[0].tenGuid,
    };
    Mydata.GetToken = GetToken;

    //makes api call to delete item
    let result = await Axios.post(
      `${process.env.REACT_APP_BackEndUrl}/api/Tenhome/GetToken`,
      Mydata
    )
      .then(async (result) => this.setupChatClient(result))
      .catch(/*this.handleError */);
  }
  async setupChatClient(result) {
    var client = await Chat.create(result.data);

    var channelName =
      this.props.results[0].tenGuid +
      "-" +
      this.props.results[0].landLordAuth0ID;
    this.client = client;
    this.client
      .getChannelByUniqueName(channelName)
      .then((channel) => (this.channel = channel))

      .catch((error) => {
        if (error.body.code === 50300) {
          return this.client.createChannel({ uniqueName: channelName });
        } else {
          this.handleError(error);
        }
      })
      .then((channel) => {
        this.channel
          .getMessages()
          .then((messages) => this.LoadMessages(messages));
        return this.channel.join().catch(() => {});
      })
      .then(() => {
        //;
        console.log("Success");
      })
      .catch(this.handleError);
  }

  OpenNoti = (message) => {
    debugger;
    this.setState({
      OpenNoti: true,
      Message: message,
    });
  };

  CloseNoti = () => {
    this.setState({
      OpenNoti: false,
    });
  };

  handleError = () => {
    this.OpenNoti("Chat failed to Load :C");
  };

  LoadMessages = (messages) => {};

  handleNewUserMessage = (messageText) => {
    var UserMessage = {};
    UserMessage.TenGuid = window.TenGuid;
    UserMessage.message = messageText;

    this.channel.sendMessage(messageText);
    this.setState((prevState) => ({
      ChatMessages: [...prevState.ChatMessages, UserMessage],
    }));

    // addResponseMessage(message);
  };

  handleClick = async (e) => {
    debugger;

    console.log(window.ClickOpen);
    window.ClickOpen = true;
    var WidgetDiv = document.getElementsByClassName("rcw-widget-container")[0];
    if (
      document.getElementById("root").offsetWidth < 800 &&
      window.ClickOpen === true
    ) {
      WidgetDiv.style.width = "75%";
      WidgetDiv.style.height = "75vh";
    } else if (
      document.getElementById("root").offsetWidth < 800 &&
      window.ClickOpen === false
    ) {
      WidgetDiv.style.width = "10%";
      WidgetDiv.style.height = "10vh";
    } else if (document.getElementById("root").offsetWidth > 800) {
      WidgetDiv.style.maxWidth = "370px";
      WidgetDiv.style.height = "";
      WidgetDiv.style.width = "90vw";
    }

    console.log(window.ClickOpen);
  };
  render() {
    return (
      <div className="widget" onClick={this.handleClick}>
        <Widget
          className={"clicked"}
          profileAvatar={Image}
          handleNewUserMessage={this.handleNewUserMessage}
          fullScreenMode={false}
          title="Welcome!"
          subtitle="Please type here to Chat with your landlord!"
        />

        <SnackBar
          OpenNoti={this.state.OpenNoti}
          CloseNoti={this.CloseNoti}
          message={this.state.Message}
        />
      </div>
    );
  }
}
