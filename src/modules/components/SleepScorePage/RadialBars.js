import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from "react-apexcharts";
import './text.css';

const RadialBars = (props) => {

      const [optionsRadial,setOptionRadial] = useState( {
        plotOptions: {
          radialBar: {
            startAngle: 0,
            endAngle: 360,
            hollow: {
              margin: 0,
              size: "60%",
              background: "#141313",
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: "#fff",
              strokeWidth: "100%",
              
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },

            dataLabels: {
              //showOn: "always",
              name: {
                offsetY: -10,
                show: true,
                color: "#fff",
                fontSize: "10px"
              },
              value: {
               // formatter: function(val) {
                //  return val;
                //},
                color: "#3cc7c3", // color font percent
                fontSize: "25px",
                show: true
              }
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "vertical",
            shadeIntensity: 0.5,
            gradientToColors: ["#3cc7c3"],
            //inverseColors: true,
            //opacityFrom: 1,
            //opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: "round"
        },
        labels: ["Percent"]
      });
      const [seriesRadial,setSeriesRadial] = useState([props.value]);

      useEffect (
        () => {
          setSeriesRadial([props.value]);
        },
        [props.value]
      )

    return (
    <div className="col radial-chart">
      <Chart
        options={optionsRadial}
        series={seriesRadial}
        type="radialBar"
        style={{width: "20vw", height: "auto", maxHeight: "10vh"}}
      />
    </div>
    );
  // }
}

export default RadialBars;
