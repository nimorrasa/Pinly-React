
import React, { Component, useState, useEffect } from "react";
import { Row, Col } from 'reactstrap';
import Chart from "react-apexcharts";

const Bar = (props) => {

  const sleep_score_style = {
    display: "flex",
    justifyContent: "center"
};

  const [hours,setHours] = useState(props.values.hours);
  const [series,setSeries] = useState(props.values.series);
      // const [options,setOptions] = useState()
      // const [series,setSeries] = useState( )
      // const [fill,setFill] = useState ({
      //   type: 'gradient',
      //   gradient: {
      //     shade: 'dark',
      //     type: "vertical",
      //     shadeIntensity: 0.35,
      //     gradientToColors: ["#3cc7c3"],
      //     inverseColors: true,
      //     opacityFrom: 0.7,
      //     opacityTo: 0.7,
      //     Stops: [90, 0, 100]
      //   }
      // })

  useEffect(
    () => {
      setHours(props.values.hours);
      setSeries(props.values.series);
    },
    [props.values]
  )

  return (
    <div>
      <Row style={{marginLeft: "22%"}}>
        <strong>Snore Level (dB)</strong>
      </Row>
      <Row style={{marginLeft: "22%"}}>
        <p>0 - no sound, 100 - very loud</p>
      </Row>
      <div style={sleep_score_style}>
        <Chart
          id="bar_graph"
          options={ {
            dataLabels: {
              enabled: true,
              enabledOnSeries: undefined,
              formatter: function (val, opts) {
                  return val
              },
              textAnchor: 'middle',
              distributed: false,
              offsetX: 0,
              offsetY: 0,
              style: {
                  fontSize: '24px',
                  fontWeight: 'bold',
                  colors: ['white']
              },
              background: {
                enabled: false,
              },
            },
            chart: {
              id: "basic-bar",
              toolbar: {
                show: true
              }
            },
            tooltip: {
              enabled: true,
              enabledOnSeries: undefined,
              shared: true,
              followCursor: false,
              intersect: false,
              inverseOrder: false,
              custom: undefined,
              fillSeriesColor: false,
              theme: props.theme,
              style: {
                fontSize: '12px',
                fontFamily: undefined
              },
              onDatasetHover: {
                  highlightDataSeries: false,
              },
              x: {
                  show: true,
                  format: 'dd MMM',
                  formatter: undefined,
              },
              y: {
                  formatter: undefined,
                  title: {
                      formatter: (seriesName) => seriesName,
                  },
              },
              z: {
                  formatter: undefined,
                  title: 'Size: '
              },
              marker: {
                  show: false,
              },
              fixed: {
                  enabled: false,
                  position: 'topRight',
                  offsetX: 0,
                  offsetY: 0,
              },
          },
            stroke: {
              width: [2, 0, 0]
            },
            yaxis: {
              labels: {
                show: true,
                align: 'right',
                minWidth: 0,
                maxWidth: 160,
                style: {
                    colors: props.theme == 'dark' ? 'white' : 'black',
                    fontSize: '15px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    cssClass: 'apexcharts-yaxis-label',
                },
                offsetX: 0,
                offsetY: 0,
                rotate: 0
            },
            },
            xaxis: {
              categories: hours,
              labels: {
                show: true,
                align: 'right',
                minWidth: 0,
                maxWidth: 160,
                style: {
                    colors: props.theme == 'dark' ? 'white' : 'black',
                    fontSize: '22px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    cssClass: 'apexcharts-yaxis-label',
                },
                offsetX: 0,
                offsetY: 0,
                rotate: 0
            },
            }
          }}
          series={[
            {
              name: "sound",
              background: "#141313",
              data: series,
            }
          ]}
          type="bar"
          style={{width: "auto", height: "auto", minWidth: "25vw", maxHeight: "10vh"}}
        />
      </div>
    </div>
     
  );
}

export default Bar;
