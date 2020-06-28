import React, { Component } from "react";
import { Widget, addResponseMessage, addUserMessage } from "react-chat-widget";
import Axios from "axios";
import Chat from "twilio-chat";
import SnackBar from "./SnackBar";
import Image from "../Hotel.jpg";

export default class TenChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Message: "",
      ChatMessages: [],
      OpenNoti: false,
      QuickButtonClicked: true
    };
  }

  async componentDidMount() {
    window.ClickOpen = false;
    var Mydata = {};
    var GetToken = {
      device: "browser",
      TenGuid: window.TenGuid
    };
    Mydata.GetToken = GetToken;
    console.log(Mydata);

    //makes api call to delete item
    let result = await Axios.post(
      "https://webstorebackend.azurewebsites.net/api/cart/UpdateCart",
      Mydata
    )
      .then(result => {})
      .then(data => Chat.create(data.token))
      .then(this.setupChatClient)
      .catch(this.handleError);
  }

  setupChatClient(client) {
    var channelName = window.TenGuid + "-" + window.LandLordGuid;
    this.client = client;
    this.client
      .getChannelByUniqueName(channelName)
      .then(channel => channel)
      .catch(error => {
        if (error.body.code === 50300) {
          return this.client.createChannel({ uniqueName: channelName });
        } else {
          this.handleError(error);
        }
      })
      .then(channel => {
        this.channel = channel;
        return this.channel.join().catch(() => {});
      })
      .then(() => {
        // Success!
      })
      .catch(this.handleError);
  }

  OpenNoti = message => {
    debugger;
    this.setState({
      OpenNoti: true,
      Message: message
    });
  };

  CloseNoti = () => {
    this.setState({
      OpenNoti: false
    });
  };

  handleError = () => {
    this.OpenNoti("Chat failed to Load :C");
  };

  handleNewUserMessage = messageText => {
    console.log(messageText);
    var UserMessage = {};
    UserMessage.TenGuid = window.TenGuid;
    UserMessage.message = messageText;
    this.setState(prevState => ({
      ChatMessages: [...prevState.ChatMessages, UserMessage]
    }));
    console.log(this.state.ChatMessages);

    // addResponseMessage(message);
  };

  handleClick = async () => {
    debugger;

    console.log(window.ClickOpen);
    window.ClickOpen = !window.ClickOpen;
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
