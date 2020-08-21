import React, { Component } from "react";
import { Widget, addResponseMessage, addUserMessage } from "react-chat-widget";
import Axios from "axios";
import Chat from "twilio-chat";
import SnackBar from "../Shared/SnackBar";

//contains the chat client that sits in the lower left
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
    //window.addEventListener("scroll", this.HandleScroll, true);
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

  //gets update with each component render
  componentDidUpdate(prevProps) {
    //gets update with each component render after the results load
    if (this.props.results.length > 0 && window.ApiCallAlreadyMade !== true) {
      this.GetChatData();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.HandleScroll);
  }

  ////this gets access token be to authenticated by the twillo servers
  async GetChatData() {
    //gets auth token
    const BearerToken = await this.props.auth.getTokenSilently();
    window.ApiCallAlreadyMade = true;
    window.ClickOpen = false;
    var Mydata = {};
    var GetToken = {
      device: "browser",
      TenGuid: this.props.results[0].tenGuid,
    };
    Mydata.GetToken = GetToken;

    let result = await Axios.post(
      /*https://cors-anywhere.herokuapp.com/*/ `${process.env.REACT_APP_BackEndUrl}/api/Tenhome/GetToken`,
      Mydata,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    )
      .then(async (result) => this.setupChatClient(result))
      .catch(this.handleError);
  }

  //this functions set up twillo chat client and get data from twillo servers

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
          .getMessages(1000)
          .then((messages) => this.LoadMessages(messages));
        return this.channel.join().catch(() => {});
      })
      .then(() => {
        this.channel.on("messageAdded", (message) => {
          if (this.props.results[0].tenGuid !== message.author) {
            this.UpdateIncomingUserMessage(message.author, message.body);
          }

          console.log(message.author + "in chrome", message.body);
        });
        console.log("Success");
      })
      .catch(this.handleError);
  }

  //function responsible for opening up the snack bar notification
  OpenNoti = (message) => {
    this.setState({
      OpenNoti: true,
      Message: message,
    });
  };

  //function responsible for closing the snack bar notification
  CloseNoti = () => {
    this.setState({
      OpenNoti: false,
    });
  };

  //notifies user when it cant load chat data
  handleError = () => {
    this.OpenNoti("Chat failed to Load :C");
  };

  LoadMessages = (messages) => {
    var MessageArray = [];
    messages.items.map((message) => {
      if (message.state.author === this.props.results[0].tenGuid) {
        addUserMessage(message.state.body, this.props.results[0].tenGuid);
      } else {
        addResponseMessage(
          message.state.body,
          this.props.results[0].landLordAuth0ID
        );
      }
    });
  };

  handleNewUserMessage = (messageText) => {
    var UserMessage = {};
    UserMessage.TenGuid = window.TenGuid;
    UserMessage.message = messageText;

    this.channel.sendMessage(messageText);
    this.setState((prevState) => ({
      ChatMessages: [...prevState.ChatMessages, UserMessage],
    }));
  };

  UpdateIncomingUserMessage = (LandLordAuth0, messageText) => {
    addResponseMessage(messageText, LandLordAuth0);

    var UserMessage = {};
    UserMessage.LandLordAuth0 = LandLordAuth0;
    UserMessage.message = messageText;

    this.setState((prevState) => ({
      ChatMessages: [...prevState.ChatMessages, UserMessage],
    }));
  };

  //changes style dynamicly when clicking the widget. Have to do this because of styling issues
  handleClick = async (e) => {
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
  };
  render() {
    return (
      <div className="widget" onClick={this.handleClick}>
        <Widget
          className={"clicked"}
          handleNewUserMessage={this.handleNewUserMessage}
          fullScreenMode={false}
          showTimeStamp={false}
          title="Welcome!"
          subtitle="Please type here to chat with your landlord!"
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
