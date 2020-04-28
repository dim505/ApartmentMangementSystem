import React, { Component } from "react";
import CanvasJSReact from "./GraphDepdency/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

//chart shows Monthly Expenses
export default class ReceiptExpensesChart extends Component {
  componentDidMount() {}
	
//formats date from DB into something the chart can use and puts it into a dataset
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

//used to format date
   parseDate(input) {
  var parts = input.split('-');
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}



  render() {
    this.FormatData();
    const options = {
        exportEnabled: true,
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
        {this.props.Receipts.length > 0 ? 
                  <CanvasJSChart
                  options={options}
                 
                /> : <h3> No Receipts Found. Please Add Some</h3> 
      
      }

         
      </div>
    );
  }
}
