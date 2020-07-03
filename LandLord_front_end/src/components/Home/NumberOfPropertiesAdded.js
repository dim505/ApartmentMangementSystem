 
import React, { Component } from "react";
import CanvasJSReact from "./GraphDepdency/canvasjs.react";
import Axios from "axios";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

//chart shows number of properties added each year
export default class NumberOfPropertiesAdded extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Properties: [],
    };
  }

  //gets data for chart
  componentDidMount() {
    this.GetData();
  }

  //makes api call and sets state
  GetData = async () => {
    const BearerToken = await this.props.auth.getTokenSilently();
    var results = Axios.get(
      `${process.env.REACT_APP_BackEndUrl}/api/Home/NumOfPropPerYear`,
      {
        headers: { Authorization: `bearer ${BearerToken}` },
      }
    ).then((results) =>
      this.setState({
        Properties: results.data,
      })
    );
  };

  //formats date from DB into something the chart can use and puts it into a dataset
  FormatData() {
    window.dataPoints = [];
    for (var i in this.state.Properties) {
      var x = this.state.Properties[i].date;
      var y = this.state.Properties[i].numOfPropPerYr;
      x = new Date(x);
      y = parseFloat(y);
      window.dataPoints.push({ x, y });
    }
  }
  //used to format date
  parseDate(input) {
    var parts = input.split("-");
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1] - 1, parts[2]); // Note: months are 0-based
  }

  render() {
    this.FormatData();
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Number of Properties Added Each Year",
      },
      axisX: {
        valueFormatString: "YYYY",
      },
      axisY: {
        title: "Number of Properties",
      },
      data: [
        {
          type: "stepLine",
          xValueFormatString: "YYYY",
          dataPoints: window.dataPoints,
        },
      ],
    };

    options.data[0].dataPoints = window.dataPoints;

    return (
      <div>
        {this.state.Properties.length > 0 ? (
          <CanvasJSChart options={options} />
        ) : (
          <h3> No Properties Found. Please Add Some </h3>
        )}
      </div>
    );
  }
}
