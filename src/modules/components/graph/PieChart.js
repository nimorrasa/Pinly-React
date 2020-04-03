
import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

import ReactTooltip from "react-tooltip";
const PieChart = (props) => {
    const series= [props.value];

    const options= {
        chart: {
        type: 'radialBar',
        toolbar: {
            show: false
        }
        },
        plotOptions: {
        radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
            margin: 0,
            size: '70%',
            background: 'transparent',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
            }
            },
            track: {
            background: props.theme == 'dark' ? 'white' : 'black',
            strokeWidth: '67%',
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
            show: true,
            name: {
                offsetY: 15,
                show: true,
                color: props.theme == 'dark' ? 'white' : 'black',
                fontSize: props.hourSize ? props.hourSize : '17px',
            },
            value: {
                formatter: function(val) {
                    return `${new Date(props.currentSleep).toLocaleTimeString('en-US')} - ${new Date(props.currentWakeUp).toLocaleTimeString('en-US')}`;
                },
                color: 'grey',
                fontSize: props.timeSize ? props.timeSize : '16px',
                show: props.showTime,
            }
            }
        }
        },
        fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#3dbacb'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
        }
        },
        stroke: {
        lineCap: 'round'
        },
        labels: [parseInt(props.totalSleep / 60) +"h "+ parseInt(props.totalSleep % 60)+ " m"],
    }
    
    return (
        <div id="card">
            <div id="chart" data-tip data-for="pie_graph">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="radialBar"
                    // width="300"
                />
            </div>
            <ReactTooltip id="pie_graph">
                  <h4>{`${new Date(props.currentSleep).toLocaleTimeString('en-US')} - ${new Date(props.currentWakeUp).toLocaleTimeString('en-US')}`}</h4>
            </ReactTooltip>
        </div>
    );
}

export default PieChart;