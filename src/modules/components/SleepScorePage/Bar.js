
import React, { Component, useState, useEffect } from "react";
import { Col } from 'reactstrap';
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
      console.log("Update",props)
      setHours(props.values.hours);
      setSeries(props.values.series);
    },
    [props.values]
  )

  return (
    <Col lg="12" md="12" xs="12" style={{paddingLeft: "15%"}}>
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
  );
}

export default Bar;
