import React, { Component } from "react";
import "./ConversationListItem.css";
import Avatar from "@material-ui/core/Avatar";

//contains a single profile picture and a name for each conversation
export default class ConversationListItem extends Component {
  componentDidMount() {}

  //updates who is selected
  HandleConversationClick = (name, address, tenGuid) => {
    this.props.HandleConversationClick(name, address, tenGuid);
  };

  render() {
    return (
      <div
        Key={this.props.data.tenGuid}
        onClick={() =>
          this.HandleConversationClick(
            this.props.data.name,
            this.props.data.address,
            this.props.data.tenGuid
          )
        }
        className={`conversation-list-item ${
          this.props.ConvoSelected === this.props.data.name ? " selected" : ""
        }
    `}
      >
        <Avatar
          classes={{ root: "AvatarStyle" }}
          alt={this.props.data.name}
          src={this.props.data.photo}
        />

        <div className="conversation-info">
          <h5 className="conversation-title">{this.props.data.name}</h5>
        </div>
      </div>
    );
  }
}
