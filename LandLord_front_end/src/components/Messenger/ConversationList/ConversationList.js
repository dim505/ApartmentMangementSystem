import React from "react";

import ConversationSearch from "./ConversationSearch/ConversationSearch";
import ConversationListItem from "./ConversationListItem/ConversationListItem";
import Toolbar from "./Toolbar";

import axios from "axios";

export default class ConversationList extends React.Component {
  state = {
    FilteredConversations: [],
    InitialConversations: [],
    ConvoSelected: ""
  };

  //gets consersations for the side bar on the left
  componentDidMount() {
    if (this.state.FilteredConversations.length <= 0) {
      this.getConversations();
    }
  }

  // Api call that gets the conversation data
  getConversations = () => {
    axios.get("https://randomuser.me/api/?results=20").then(response => {
      let newConversations = response.data.results.map(result => {
        return {
          photo: result.picture.large,
          name: `${result.name.first} ${result.name.last}`,
          text:
            "Hello world! This is a long message that needs to be truncated."
        };
      });
      this.setState({
        InitialConversations: newConversations,
        FilteredConversations: newConversations
      });
    });
  };

  //loads new conversation in the conversation window on the right
  HandleConversationClick = name => {
    console.log(name);
    this.setState({ ConvoSelected: name });
    this.props.HandleConversationClick(name);
  };

  /* //function used to produce product filtered list 
filterList = (SearchTextBoxVal) => {
	  //makes a copy of the products list
      let products = this.state.IntialProducts
	  //returns all products that match the search phrase 
      products = products.filter ( 
          (product) => { return product.name.toLowerCase().search(SearchTextBoxVal.toString().toLowerCase()) !== -1}
        

      )
	  //sets state of products to be displayed 
      this.setState({products:products})
       



}*/

  //filters the list of people who are typed in the  search people search bar
  HandlePeopleSearch = e => {
    debugger;
    let conversations = this.state.InitialConversations;

    conversations = conversations.filter(conversation => {
      return (
        conversation.name.toLowerCase().search(e.target.value.toLowerCase()) !==
        -1
      );
    });

    this.setState({
      FilteredConversations: conversations
    });
    console.log(conversations);
  };
  render() {
    debugger;
    return (
      <div className="conversation-list">
        <Toolbar title="Messenger" />
        <ConversationSearch HandlePeopleSearch={this.HandlePeopleSearch} />
        {this.state.FilteredConversations.length === 0 ? (
          <p> No people were found </p>
        ) : (
          this.state.FilteredConversations.map(conversation => (
            <ConversationListItem
              key={conversation.name}
              id={conversation.name}
              data={conversation}
              HandleConversationClick={this.HandleConversationClick}
              ConvoSelected={this.state.ConvoSelected}
            />
          ))
        )}
      </div>
    );
  }
}
