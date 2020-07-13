import React from "react";
import ConversationList from "./ConversationList/ConversationList";
import MessageList from "./MessageList/MessageList";
import "./Messenger.css";
import Fade from "react-reveal/Fade";

//parent that houses the land lord chat application
export default class Messenger extends React.Component {
  state = {
    ConvoSelected: "",
  };

  //this tracks what conversation is being selected
  HandleConversationClick = (ConvoSelected) => {
    this.setState({
      ConvoSelected: ConvoSelected,
    });
  };

  render() {
    return (
      <div className="messenger">
        <div className="scrollable sidebar">
          <ConversationList
            auth={this.props.auth}
            HandleConversationClick={this.HandleConversationClick}
          />
        </div>

        <div className="scrollable content">
          <MessageList ConvoSelected={this.state.ConvoSelected} />
        </div>
      </div>
    );
  }
}
