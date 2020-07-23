import React from "react";
import ConversationSearch from "./ConversationSearch/ConversationSearch";
import ConversationListItem from "./ConversationListItem/ConversationListItem";
import Toolbar from "./Toolbar";
import axios from "axios";
import { FormatImage } from "../../shared/SharedFunctions";

//contains all the conversations that belongs to the landlord. One convo for each tenant
export default class ConversationList extends React.Component {
  state = {
    FilteredConversations: [],
    InitialConversations: [],
    ConvoSelected: "",
  };

  //gets consersations for the side bar on the left
  componentDidMount() {
    if (this.state.FilteredConversations.length <= 0) {
      this.getConversations();
    }
  }

  // Api call that gets the conversation data
  getConversations = async () => {
    const BearerToken = await this.props.auth.getTokenSilently();
    var TenPic = [];
    axios
      .get(`${process.env.REACT_APP_BackEndUrl}/api/Message/GetTenantsInfo`, {
        headers: { Authorization: `bearer ${BearerToken}` },
      })
      .then(async (response) => {
        await this.setState({
          InitialConversations: response.data,
          FilteredConversations: response.data,
        });

        var MyData = {};
        var emails = "";
        this.state.InitialConversations.map((conversation) => {
          emails += conversation.email + ", ";
        });

        MyData.emails = emails;

        axios
          .get(
            `${process.env.REACT_APP_BackEndUrl}/api/Message/GetTenantProfileImages/${emails}`,
            {
              headers: { Authorization: `bearer ${BearerToken}` },
            }
          )
          .then(async (response) => {
            TenPic = response.data;
            var PhotoURLs = [];
            var PhotoURLs = TenPic.map((photo) => {
              var objectURL = FormatImage(photo.image, photo.contentType);

              return [{ Auth0ID: photo.auth0ID, objectURL: objectURL }];
            });

            var InitialConversations = [];
            this.state.InitialConversations.map((conversation) => {
              PhotoURLs.map((PhotoUrl) => {
                if (PhotoUrl[0].Auth0ID === conversation.tenAuth0ID) {
                  conversation.photo = PhotoUrl[0].objectURL;
                  InitialConversations.push(conversation);
                }
              });

              if (conversation.photo === "") {
                InitialConversations.push(conversation);
              }
            });

            await this.setState({
              InitialConversations: InitialConversations,
              FilteredConversations: InitialConversations,
            });

            this.props.UpdateConvoList(InitialConversations);
          });
      });
  };

  //loads new conversation in the conversation window on the right
  HandleConversationClick = (name, address, tenGuid) => {
    window.address = " (" + address + ")";
    console.log(name);
    this.setState({ ConvoSelected: name });
    this.props.HandleConversationClick(name, tenGuid);
  };

  //filters the list of people who are typed in the  search people search bar
  HandlePeopleSearch = (e) => {
    let conversations = this.state.InitialConversations;

    conversations = conversations.filter((conversation) => {
      return (
        conversation.name.toLowerCase().search(e.target.value.toLowerCase()) !==
        -1
      );
    });

    this.setState({
      FilteredConversations: conversations,
    });
    console.log(conversations);
  };
  render() {
    return (
      <div className="conversation-list">
        <Toolbar title="Messenger" />
        <ConversationSearch HandlePeopleSearch={this.HandlePeopleSearch} />
        {this.state.FilteredConversations.length === 0 ? (
          <p> No people were found </p>
        ) : (
          this.state.FilteredConversations.map((conversation) => (
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
