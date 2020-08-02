import React, { Component } from "react";
import Chat from "twilio-chat";
import Toolbar from "../ConversationList/Toolbar";
import ToolbarButton from "../ConversationList/ToolbarButton";
import Message from "./Message";
import moment from "moment";
import Axios from "axios";
import SendIcon from "@material-ui/icons/Send";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./MessageList.css";
import Fade from "react-reveal/Fade";
import Typography from "@material-ui/core/Typography";

//parent that contains all the messages for the selected conversation
export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = { Messages: [], ShowLoader: false };
  }

  componentDidMount() {
    window.address = " ";
    window.ApiCallAlreadyMade = false;
    window.MY_USER_ID = "";

    window.addEventListener("scroll", this.HandleScroll, true);
  }

  HandleScroll = async () => {
    var ChannelMessageCount = await this.channel.getMessagesCount();
    var index = ChannelMessageCount - this.state.Messages.length;

    var Element = document.getElementsByClassName("scrollable content");
    if (
      Element[0].scrollTop === 0 &&
      ChannelMessageCount >= this.state.Messages.length
    ) {
      window.GetOlderMessages = true;
      this.channel
        .getMessages(100, index)
        .then((messages) => this.LoadMessages(messages));
    }
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.HandleScroll, true);
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.tenGuid !== this.props.tenGuid && this.props.tenGuid !== "") {
      await this.CallLoader("open");
      this.GetChatData();
    }
  }

  CallLoader = async (action) => {
    if (action === "open") {
      await this.setState({
        ShowLoader: true,
        Messages: [],
      });
    } else {
      await this.setState({
        ShowLoader: false,
      });
    }
  };
  //this gets access token be to authenticated by the twillo servers
  async GetChatData() {
    window.ClickOpen = false;
    var Mydata = {};
    var GetToken = {
      device: "browser",
      TenGuid: this.props.InitialConversations[0].landLordAuth0ID,
    };
    Mydata.GetToken = GetToken;
    window.MY_USER_ID = this.props.InitialConversations[0].landLordAuth0ID;
    let result = await Axios.post(
      `https://cors-anywhere.herokuapp.com/${process.env.REACT_APP_BackEndUrl}/api/Tenhome/GetToken`,
      Mydata
    )
      .then(async (result) => this.setupChatClient(result))
      .catch(this.handleError);
  }

  //this functions set up twillo chat client and get data from twillo servers
  async setupChatClient(result) {
    var client = await Chat.create(result.data);

    var channelName =
      this.props.tenGuid +
      "-" +
      this.props.InitialConversations[0].landLordAuth0ID;
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
          .getMessages(999)
          .then((messages) => this.LoadMessages(messages));
        return this.channel.join().catch(() => {});
      })
      .then(() => {
        this.channel.on("messageAdded", (message) => {
          if (
            this.props.InitialConversations[0].landLordAuth0ID !==
            message.author
          ) {
            this.LoadMessages(message);
          }
          this.channel.on("messageAdded", (message) => {
            if (
              this.props.InitialConversations[0].landLordAuth0ID !==
              message.author
            ) {
              this.LoadMessages(message);
            }

            console.log(message.author + "in chrome", message.body);
          });
          console.log(message.author + "in chrome", message.body);
        });

        console.log("Success");
      })
      .catch(this.handleError);
  }

  //notifies user when it cant load chat data
  handleError = () => {
    this.OpenNoti("Chat failed to Load :C");
  };

  LoadMessages = async (messages) => {
    var MessageArray = [];
    console.log(messages);

    if (messages.items !== undefined) {
      messages.items.map((message) => {
        var MessageObj = {
          id: message.state.index,
          author: message.state.author,
          message: message.state.body,
          timestamp: message.state.dateUpdated,
        };

        MessageArray.push(MessageObj);
      });
    } else {
      var MessageObj = {
        id: messages.state.index,
        author: messages.state.author,
        message: messages.state.body,
        timestamp: messages.state.dateUpdated,
      };

      MessageArray.push(MessageObj);
    }

    await this.setState((prevState) => ({
      Messages:
        (prevState.Messages.length <= 0 && prevState.ShowLoader === true) ||
        window.GetOlderMessages === true
          ? [...MessageArray, ...prevState.Messages]
          : MessageArray,
    }));

    this.renderMessages();
    var ScrollDiv = document.getElementsByClassName("scrollable content")[0];
    ScrollDiv.scrollTop = ScrollDiv.scrollHeight;
    window.scrollTo(0, document.body.scrollHeight);
    this.CallLoader();
    window.GetOlderMessages = false;
  };

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

  //adds new message to message list

  //builds out message list from data
  renderMessages = () => {
    let i = 0;
    let messageCount = this.state.Messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = this.state.Messages[i - 1];
      let current = this.state.Messages[i];
      let next = this.state.Messages[i + 1];
      let isMine = current.author === window.MY_USER_ID;
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

  //updates the message list after the user hits enter to submit the message
  UpdateMessage = async (messages) => {
    await this.setState((prevState) => ({
      Messages: [
        ...prevState.Messages,
        {
          id: this.state.Messages.length + 1,
          author: window.MY_USER_ID,
          message: document.getElementsByClassName("compose-input")[0].value,
          timestamp: new Date().getTime(),
        },
      ],
    }));

    this.channel.sendMessage(
      document.getElementsByClassName("compose-input")[0].value
    );
    document.getElementsByClassName("compose-input")[0].value = "";
    this.renderMessages();
    var ScrollDiv = document.getElementsByClassName("scrollable content")[0];
    ScrollDiv.scrollTop = ScrollDiv.scrollHeight;
  };

  ShowMessages = () => {
    if (this.props.tenGuid !== "") {
      return (
        <React.Fragment>
          <Fade bottom opposite when={!this.state.ShowLoader}>
            <div className="message-list-container">
              {this.renderMessages()}
            </div>
          </Fade>
          <div className="compose">
            <input
              onKeyPress={this.handleOnKeyPress}
              type="text"
              className="compose-input"
              placeholder="Type a message"
            />

            <SendIcon onClick={this.UpdateMessage} style={{ fontSize: 36 }} />
          </div>
        </React.Fragment>
      );
    } else if (this.state.Messages.length <= 0 && this.props.tenGuid !== "") {
      return (
        <Typography classes={{ root: "CenterText" }} variant="h3" gutterBottom>
          No conversations found. Type Away!!!
        </Typography>
      );
    } else {
      return (
        <Typography classes={{ root: "CenterText" }} variant="h3" gutterBottom>
          Please select a consersation
        </Typography>
      );
    }
  };

  render() {
    return (
      <div className="message-list">
        <Toolbar title={this.props.ConvoSelected + window.address} />
        <Fade top opposite when={this.state.ShowLoader}>
          <LinearProgress />
        </Fade>
        {this.ShowMessages()}
      </div>
    );
  }
}
