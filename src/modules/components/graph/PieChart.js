
import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";


const PieChart = (props) => {
    const series= [75];
    const options= {
        chart: {
        type: 'radialBar',
        toolbar: {
            show: true
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
                return "0:30AM-6.00AM";
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
            gradientToColors: ['#ABE5A1'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
        }
        },
        stroke: {
        lineCap: 'round'
        },
        labels: ['6h 30m'],
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