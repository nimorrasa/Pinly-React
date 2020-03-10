
import React, { Component } from "react";
import Chart from "react-apexcharts";

class Bar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar",
          toolbar: {
            show: true
          }
        },
        stroke: {
          width: [2, 0, 0]
        },

        xaxis: {
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
          
        }
      },
      series: [
        {
          name: "series-1",
          background: "#141313",
          data: [30, 40, 45, 50, 49, 60, 70, 91,20,26,50,100],
          
        }
      ],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: "vertical",
          shadeIntensity: 0.35,
          gradientToColors: ["#3cc7c3"],
          inverseColors: true,
          opacityFrom: 0.7,
          opacityTo: 0.7,
          Stops: [90, 0, 100]
        }
      },
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Bar;
