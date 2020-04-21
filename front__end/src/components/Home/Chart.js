//https://github.com/fullstackreact/google-maps-react
import React, { Component } from "react";
import CanvasJSReact from "./canvasjs.react";
//var CanvasJSReact = require('./canvasjs.react');
//var date = new Date()
//const unixTimeZero = new Date(Date.parse('2020-01-03')) + 1	;

//console.log(date.setDate(unixTimeZero + 1))
//const javaScriptRelease = Date.parse('04 Dec 1995 00:12:00 GMT');
//https://canvasjs.com/react-charts/spline-chart/
//https://canvasjs.com/docs/charts/integration/react/
//https://canvasjs.com/docs/charts/chart-options/
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Chart extends Component {
  componentDidMount() {}

  FormatData() {
    
    
    window.dataPoints = [];
    for (var i in this.props.Receipts) {
      var x = this.props.Receipts[i].date;
      var y = this.props.Receipts[i].totalAmount;
      x = this.parseDate(x)
      y = parseFloat(y)
      window.dataPoints.push({ x, y });
    }
  }


   parseDate(input) {
  var parts = input.split('-');
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}



  render() {
    this.FormatData();
    const options = {
      animationEnabled: true,
      title: {
        text: "Monthly Expenses"
      },
      axisX: {
        valueFormatString: "MM-DD-YYYY"
      },
      axisY: {
        title: "Expenses (in USD)",
        prefix: "$",
        includeZero: false
      },
      data: [
        {
          yValueFormatString: "$#,###",
          xValueFormatString: "YY-MM-DD",
          type: "spline",
          dataPoints: window.dataPoints

        }
      ]
    };

    options.data[0].dataPoints = window.dataPoints


    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
