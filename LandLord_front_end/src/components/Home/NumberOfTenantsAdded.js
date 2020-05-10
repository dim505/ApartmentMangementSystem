//https://github.com/fullstackreact/google-maps-react
import React, { Component } from "react";
import CanvasJSReact from "./GraphDepdency/canvasjs.react";
import Axios from 'axios';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart2 = CanvasJSReact.CanvasJSChart;

export default class NumberOfTenantsAdded extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tenants: []
    };
  }

	//gets data for chart 
  componentDidMount() {this.GetData()}

  	//makes api call and sets state
    GetData = async () => {
      const BearerToken = await this.props.auth.getTokenSilently();
      var results =   Axios.get("https://amsbackend.azurewebsites.net/api/Home/NumOfTenEachMonth",
      {
       headers: {'Authorization': `bearer ${BearerToken}`}
 
     }
      ).then( (results) => 
      this.setState({
        tenants: results.data
      }),
       
      );
 
 
   }
   //format data and puts it into a dataset that the graph can use 
  FormatData() {
   

    window.dataPoints = [];
    for (var i in this.state.tenants) {
      var x = this.state.tenants[i].date;
      var y = this.state.tenants[i].numOfTenPerMonth;
      x = new Date(x);
      y = parseFloat(y);
      window.dataPoints.push({ x, y });
    }
  }

	//formats date into what the graph can use 
  parseDate(input) {
    var parts = input.split("-");
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1] - 1, parts[2]); // Note: months are 0-based
  }


  onClick () {

    alert("test")

  }
  render() {
    this.FormatData();
    const options = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "Number Of Tenants Added Each Month"
      },
      click: () => this.onClick,
      data: [
        {
          // Change type to "doughnut", "line", "splineArea", etc.
          type: "column",
          dataPoints: window.dataPoints
        }
      ]
    };

    options.data[0].dataPoints = window.dataPoints;

    return (
      <div>

        {this.state.tenants.length > 0 ? 
            <CanvasJSChart2
            options={options}

            />
    :<h3> No Tenants Found. Please Add Some </h3>
      }

       </div>
    );
  }
}
