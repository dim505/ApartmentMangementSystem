import React from "react";
import ConversationList from "./ConversationList/ConversationList";
import MessageList from "./MessageList/MessageList";
import "./Messenger.css";
import Fade from "react-reveal/Fade";

//parent that houses the land lord chat application
export default class Messenger extends React.Component {
  state = {
    ConvoSelected: "",
    tenGuid: "",
    InitialConversations: [],
  };

  //this tracks what conversation is being selected
  HandleConversationClick = (ConvoSelected, tenGuid) => {
    this.setState({
      ConvoSelected: ConvoSelected,
      tenGuid: tenGuid,
    });
  };
	//updates the message header of the name/address of who was selected
  UpdateConvoList = (InitialConversations) => {
    this.setState({
      InitialConversations: InitialConversations,
    });
  };

  render() {
    return (
      <div className="messenger">
        <div className="scrollable sidebar">
          <ConversationList
            auth={this.props.auth}
            HandleConversationClick={this.HandleConversationClick}
            UpdateConvoList={this.UpdateConvoList}
          />
        </div>

        <div className="scrollable content">
          <MessageList
            ConvoSelected={this.state.ConvoSelected}
            tenGuid={this.state.tenGuid}
            InitialConversations={this.state.InitialConversations}
          />
        </div>
      </div>
    );
  }
}
