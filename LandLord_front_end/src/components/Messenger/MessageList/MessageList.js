import React, { Component } from "react";
import Chat from "twilio-chat";
import Toolbar from "../ConversationList/Toolbar";
import ToolbarButton from "../ConversationList/ToolbarButton";
import Message from "./Message";
import moment from "moment";
import Axios from "axios";
import SendIcon from "@material-ui/icons/Send";

import "./MessageList.css";

const MY_USER_ID = "apple";

export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Messages: [
        {
          id: 1,
          author: "apple",
          message:
            "Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.",
          timestamp: new Date().getTime(),
        },
        {
          id: 2,
          author: "orange",
          message:
            "It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!",
          timestamp: new Date().getTime(),
        },
        {
          id: 3,
          author: "orange",
          message:
            "Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.",
          timestamp: new Date().getTime(),
        },
        {
          id: 4,
          author: "apple",
          message:
            "It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!",
          timestamp: new Date().getTime(),
        },
        {
          id: 5,
          author: "apple",
          message:
            "Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.",
          timestamp: new Date().getTime(),
        },
        {
          id: 6,
          author: "apple",
          message:
            "It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!",
          timestamp: new Date().getTime(),
        },
        {
          id: 7,
          author: "orange",
          message:
            "Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.",
          timestamp: new Date().getTime(),
        },
        {
          id: 8,
          author: "orange",
          message:
            "It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!",
          timestamp: new Date().getTime(),
        },
        {
          id: 9,
          author: "apple",
          message:
            "Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.",
          timestamp: new Date().getTime(),
        },
        {
          id: 10,
          author: "orange",
          message:
            "It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!",
          timestamp: new Date().getTime(),
        },
      ],
    };
  }

  //makes aPI call to get data for selected conversation
  async componentDidMount() {
    var Mydata = {};
    var GetToken = {
      device: "browser",
      TenGuid: window.TenGuid,
    };
    Mydata.GetToken = GetToken;
    console.log(Mydata);

    //makes api call to delete item
    let result = await Axios.post(
      "https://webstorebackend.azurewebsites.net/api/cart/UpdateCart",
      Mydata
    )
      .then((result) => {})
      .then((data) => Chat.create(data.token))
      .then(this.setupChatClient)
      .catch(this.handleError);
  }

  //sets up chat channel
  setupChatClient(client) {
    var channelName = window.TenGuid + "-" + window.LandLordGuid;
    this.client = client;
    this.client
      .getChannelByUniqueName(channelName)
      .then((channel) => channel)
      .catch((error) => {
        if (error.body.code === 50300) {
          return this.client.createChannel({ uniqueName: channelName });
        } else {
          this.handleError(error);
        }
      })
      .then((channel) => {
        this.channel = channel;
        return this.channel.join().catch(() => {});
      })
      .then(() => {
        // Success!
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

  //adds new message to message list
  handleNewUserMessage = (messageText) => {
    console.log(messageText);
    var UserMessage = {};
    UserMessage.TenGuid = window.TenGuid;
    UserMessage.message = messageText;
    this.setState((prevState) => ({
      ChatMessages: [...prevState.ChatMessages, UserMessage],
    }));
    console.log(this.state.ChatMessages);

    // addResponseMessage(message);
  };

  //buidsl out message list from data
  renderMessages = () => {
    let i = 0;
    let messageCount = this.state.Messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = this.state.Messages[i - 1];
      let current = this.state.Messages[i];
      let next = this.state.Messages[i + 1];
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(
          currentMoment.diff(previousMoment)
        );
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as("hours") < 1) {
          startsSequence = false;
        }

        if (previousDuration.as("hours") < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as("hours") < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  };

  //adds message to message list when enter is pressed
  handleOnKeyPress = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      this.UpdateMessage();
    }
  };

  UpdateMessage = async () => {
    console.log(document.getElementsByClassName("compose-input")[0].value);
    debugger;
    await this.setState((prevState) => ({
      Messages: [
        ...prevState.Messages,
        {
          id: 11,
          author: "orange",
          message: /*"BTMIEMAA", */ document.getElementsByClassName(
            "compose-input"
          )[0].value,
          timestamp: new Date().getTime(),
        },
      ],
    }));
    document.getElementsByClassName("compose-input")[0].value = "";
    this.renderMessages();
    var ScrollDiv = document.getElementsByClassName("scrollable content")[0];
    ScrollDiv.scrollTop = ScrollDiv.scrollHeight;
  };

  render() {
    return (
      <div className="message-list">
        <Toolbar title={this.props.ConvoSelected + " Boston MA)"} />

        <div className="message-list-container">{this.renderMessages()}</div>

        <div className="compose">
          <input
            onKeyPress={this.handleOnKeyPress}
            type="text"
            className="compose-input"
            placeholder="Type a message"
          />

          <SendIcon onClick={this.UpdateMessage} style={{ fontSize: 36 }} />
        </div>
      </div>
    );
  }
}
