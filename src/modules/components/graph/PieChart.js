
import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";


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
                offsetY: -10,
                show: true,
                color: props.theme == 'dark' ? 'white' : 'black',
                fontSize: '17px'
            },
            value: {
                formatter: function(val) {
                return `${new Date(props.currentSleep).toLocaleTimeString('en-US')} - ${new Date(props.currentWakeUp).toLocaleTimeString('en-US')}`;
                },
                color: 'grey',
                fontSize: '16px',
                show: true,
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
            <div id="chart">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="radialBar"
                    // width="300"
                />
            </div>
        </div>
    );
}

export default PieChart;