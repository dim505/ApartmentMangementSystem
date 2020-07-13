import React, { Component } from "react";
import "./ConversationListItem.css";
import Avatar from "@material-ui/core/Avatar";

export default class ConversationListItem extends Component {
  HandleConversationClick = (name) => {
    this.props.HandleConversationClick(name);
  };

  render() {
    return (
      <div
        Key={this.props.data.Auth0ID}
        onClick={() => this.HandleConversationClick(this.props.data.name)}
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
