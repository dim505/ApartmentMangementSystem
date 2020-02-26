import React, { Component } from "react";
import Bounce from "react-reveal/Bounce";

export default class Home_Dashboard extends Component {
  uploadedCsv(fileData) {
    console.log(fileData);
    //Do stuff with the loaded file data
  }

  render() {
    return (
      <Bounce top>
        <p> This is where the dashboard is going to live</p>;
      </Bounce>
    );
  }
}

/*
https://reactjs-file-uploader.netlify.com/
original 
export default class Home_Dashboard extends Component {
  render() {
    return <p> This is where the dashboard is going to live </p>;
  }
}
*/
