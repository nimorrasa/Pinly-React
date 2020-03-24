
import React, { Component, useState, useEffect } from "react";
import { Row, Col } from 'reactstrap';
import Chart from "react-apexcharts";

const Bar = (props) => {


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
    <Row>
    <Row>
      <Col lg="2" md="2" xs="2">

      </Col>
      <Col lg="18" md="8" xs="8">
      <Row>
          <strong>Snore Level (dB)</strong>
        </Row>
        <Row>
          <p>0 - no sound, 100 - very loud</p>
        </Row>
        <Chart
          options={ {
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
              categories: hours
              
            }
          }}
          series={[
            {
              name: "series-1",
              background: "#141313",
              data: series,
            }
          ]}
          type="bar"
          style={{width: "30vw", height: "auto", maxHeight: "10vh"}}
        />
      </Col>

    </Row>
    </Row>
  );
}

export default Bar;
