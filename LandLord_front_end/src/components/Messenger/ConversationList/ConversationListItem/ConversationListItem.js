import React, { Component } from "react";
import "./ConversationListItem.css";

export default class ConversationListItem extends Component {
  HandleConversationClick = name => {
    this.props.HandleConversationClick(name);
  };

  render() {
    return (
      <div
        onClick={() => this.HandleConversationClick(this.props.data.name)}
        className={`conversation-list-item ${
          this.props.ConvoSelected === this.props.data.name ? " selected" : ""
        }
    `}
      >
        <img
          className="conversation-photo"
          src={this.props.data.photo}
          alt="conversation"
        />
        <div className="conversation-info">
          <h1 className="conversation-title">{this.props.data.name}</h1>
          <p className="conversation-snippet">
            {this.props.data.text.substring(0, 45)}.....
          </p>
        </div>
      </div>
    );
  }
}
