/* eslint-disable prettier/prettier,no-unused-vars,no-console,no-undef,react/no-unescaped-entities,jsx-a11y/alt-text */
import React from 'react';
import ReactDOM from 'react-dom'
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardAvatar from 'components/Card/CardAvatar.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';

import avatar from 'assets/img/faces/marc.jpg';
import Popup from "reactjs-popup";
import AttributeBoxContent from "../Dashboard/attributeBoxContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import QuantitativeContent from "../Dashboard/quantitativeContent";
import scatterJsonarray from "../../datas_json/group_top_new_25_array";
import Chart from "react-apexcharts";
import linechartJson from "../../datas_json/trend_by_city_ver2";
import axios from "axios";
import {Steps, Tag} from "antd";
import Carousel, {Modal, ModalGateway} from "react-images";
import flagshipImagesJson from "../../datas_json/flagshipImagesJson";

const {Step} = Steps;

const styles = {
    cardCategoryWhite: {
        color: 'rgba(255,255,255,.62)',
        margin: '0',
        fontSize: '14px',
        marginTop: '0',
        marginBottom: '0',
    },
    cardTitleWhite: {
        color: '#FFFFFF',
        marginTop: '0px',
        minHeight: 'auto',
        fontWeight: '300',
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: '3px',
        textDecoration: 'none',
    },
};

const useStyles = makeStyles(styles);

let colors = [
    '#665f5f',
    '#665f5f',
    '#665f5f',
    '#665f5f',
    '#665f5f',
    '#665f5f',
    '#665f5f',
    '#665f5f',
    '#665f5f',
    '#665f5f',
    '#665f5f',
    '#665f5f',
    '#665f5f',
    '#665f5f',
    '#665f5f',
    '#665f5f',
    '#665f5f',
    '#665f5f',
    '#665f5f',
    '#665f5f',
    '#665f5f',
    '#665f5f',
    '#665f5f',
    '#665f5f',
    '#665f5f',
];
let apexChartScatterOptions = {
    options: {
        legend: {
            show: false
        },

        colors: colors,
        chart: {
            height: '300',
            type: 'scatter',
            zoom: {
                enabled: false,
                type: 'xy',
            },
        },
        xaxis: {
            // tickAmount: 10,
            labels: {
                show: false,
                formatter: function (val) {
                    return parseFloat(val).toFixed(1);
                },
            },
        },
        yaxis: {
            show: false,
            tickAmount: 7,
        },
    },
};
const scatter_group_data_array = {
    series: [
        {
            name: 'group1',
            data: scatterJsonarray['group1'],
        },
        {
            name: 'group2',
            data: scatterJsonarray['group2'],
        },
        {
            name: 'group3',
            data: scatterJsonarray['group3'],
        },
        {
            name: 'group4',
            data: scatterJsonarray['group4'],
        },
        {
            name: 'group5',
            data: scatterJsonarray['group5'],
        },
        {
            name: 'group6',
            data: scatterJsonarray['group6'],
        },
        {
            name: 'group7',
            data: scatterJsonarray['group7'],
        },
        {
            name: 'group8',
            data: scatterJsonarray['group8'],
        },
        {
            name: 'group9',
            data: scatterJsonarray['group9'],
        },
        {
            name: 'group10',
            data: scatterJsonarray['group10'],
        },
        {
            name: 'group11',
            data: scatterJsonarray['group11'],
        },
        {
            name: 'group12',
            data: scatterJsonarray['group12'],
        },
        {
            name: 'group13',
            data: scatterJsonarray['group13'],
        },
        {
            name: 'group14',
            data: scatterJsonarray['group14'],
        },
        {
            name: 'group15',
            data: scatterJsonarray['group15'],
        },
        {
            name: 'group16',
            data: scatterJsonarray['group16'],
        },
        {
            name: 'group17',
            data: scatterJsonarray['group17'],
        },
        {
            name: 'group18',
            data: scatterJsonarray['group18'],
        },
        {
            name: 'group19',
            data: scatterJsonarray['group19'],
        },
        {
            name: 'group20',
            data: scatterJsonarray['group20'],
        },
        {
            name: 'group21',
            data: scatterJsonarray['group21'],
        },
        {
            name: 'group22',
            data: scatterJsonarray['group22'],
        },
        {
            name: 'group23',
            data: scatterJsonarray['group23'],
        },
        {
            name: 'group24',
            data: scatterJsonarray['group24'],
        },
        {
            name: 'group25',
            data: scatterJsonarray['group25'],
        },
    ],
};

var apexChartLineOptions = {
    series: [linechartJson['group1'][0]],
    options: {
        legend: {
            show: false
        },
        chart: {
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Trending',
            align: 'left'
        },
        // grid: {
        //   row: {
        //     colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        //     opacity: 0.5
        //   },
        // },
        xaxis: {
            categories: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
        }
    }
};

export default function UserProfile() {
    const classes = useStyles();

    axios.get('http://localhost:8000/fashionq/test/' + 'group1').then(res => {


        ReactDOM.render(<Steps current={3}>
            <Step title="Upload File" description="Upload your own image file"/>
            <Step title="Style Check"
                  description="Check your style and attributes"
            />
            <Step title="Style Result" description="FashionQ!!"/>
        </Steps>, document.getElementById('fashionqStep'));


        let groupNumState = 'group1';
        let imagesList = flagshipImagesJson[groupNumState];
        let carouselList = [];
        for (let i = 0; i < imagesList.length; i++) {
            let temp = {};
            temp['source'] =
                '/static/Representative_Images/' + groupNumState + '/' + imagesList[i];
            carouselList.push(temp);
        }
        ReactDOM.render(<div>
                {imagesList.map(img => {
                    return (<div style={{padding: '10'}} key={img}>
                            <img
                                style={{width: '15%', float: 'left', padding: '10'}}
                                src={'/static/Representative_Images/' + groupNumState + '/' + img}
                            />{' '}</div>
                    );
                })} </div>,
            document.getElementById('images1'),
        );

        ReactDOM.render(<div>
                {imagesList.map(img => {
                    return (<div style={{padding: '10'}} key={img}>
                            <img
                                style={{width: '15%', float: 'left', padding: '10'}}
                                src={'/static/Representative_Images/' + groupNumState + '/' + img}
                            />{' '}</div>
                    );
                })} </div>,
            document.getElementById('images2'),
        );

        ReactDOM.render(<div>
                {imagesList.map(img => {
                    return (<div style={{padding: '10'}} key={img}>
                            <img
                                style={{width: '15%', float: 'left', padding: '10'}}
                                src={'/static/Representative_Images/' + groupNumState + '/' + img}
                            />{' '}</div>
                    );
                })} </div>,
            document.getElementById('images3'),
        );

        ReactDOM.render(<div>
                {imagesList.map(img => {
                    return (<div style={{padding: '10'}} key={img}>
                            <img
                                style={{width: '16%', float: 'left', padding: '10'}}
                                src={'/static/Representative_Images/' + groupNumState + '/' + img}
                            />{' '}</div>
                    );
                })} </div>,
            document.getElementById('intersectionLook'),
        );


        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        let attributeList = res.data['attribute_names'];
        let unique = attributeList.filter(onlyUnique);
        let result = '';
        for (let j = 0; j < unique.length; j++) {
            result = result + unique[j] + '<br/>';
        }
        ReactDOM.render(
            <>
                {unique.map(index => {
                    return (
                        <span key={index}>
                            <Tag color="white">
                                <h1 style={{color: '#000000', fontFamily: 'BebasNeue-Bold'}}>{index}</h1>
                            </Tag>
                        </span>
                    );
                })}
            </>,
            document.getElementById('attributes'),
        );

        ReactDOM.render(
            <div>
                <img width="200" src={'/static/Brand_Images/chanel.png'}/>
                <a href={'https://www.vogue.com/fashion-shows/fall-2010-ready-to-wear/chanel'} target={'_blank'}>
                    <div
                        style={{textAlign: 'center', fontSize: '40px', fontFamily: 'BebasNeue-Bold'}}>
                        2010 FW
                    </div>
                </a>
            </div>
            , document.getElementById('intersectionShow'));

    });

    return (
        <div>
            <GridContainer>
                <GridItem xs={12}>
                    <GridItem xs={12} sm={12}>
                        <Card>
                            <CardHeader color="rose">
                            <span style={{
                                color: '#FFFFFF', fontFamily: 'BebasNeue-Bold', fontSize: '30px'
                            }} className={classes.cardCategory}>TrendQ</span>

                            </CardHeader>
                            <GridContainer
                                justify="center"
                                direction="row">
                                <GridItem xs={12} sm={2} style={{float: 'left', marginRight: '20px'}}>
                                    <div
                                        style={{textAlign: 'left', fontSize: '40px', fontFamily: 'BebasNeue-Bold'}}>
                                        STYLE MAP
                                    </div>
                                    {/*<span id="scatterChart" className={classes.stats}></span>*/}
                                    <Chart
                                        height={500}
                                        options={apexChartScatterOptions.options}
                                        series={scatter_group_data_array.series}
                                        type="scatter"
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={9}>
                                    <GridContainer>
                                            <GridItem xs={12}>
                                                <div
                                                    style={{
                                                        textAlign: 'left',
                                                        fontSize: '40px',
                                                        fontFamily: 'BebasNeue-Bold'
                                                    }}>
                                                    TREND GROUP
                                                </div>
                                            </GridItem>
                                            <GridItem xs={12}>
                                              <GridContainer>
                                                <GridItem xs={12} sm={4}>
                                                    <Chart width={550} height={200}
                                                           options={apexChartLineOptions.options}
                                                           series={apexChartLineOptions.series} type={'line'}/>
                                                    <div id={'images1'}/>
                                                </GridItem>
                                                <GridItem xs={12} sm={4}>
                                                    <Chart width={550} height={200}
                                                           options={apexChartLineOptions.options}
                                                           series={apexChartLineOptions.series} type={'line'}/>
                                                    <div id={'images2'}/>
                                                </GridItem>
                                                <GridItem xs={12} sm={4}>
                                                    <Chart width={550} height={200}
                                                           options={apexChartLineOptions.options}
                                                           series={apexChartLineOptions.series} type={'line'}/>
                                                    <div id={'images3'}/>
                                                </GridItem>
                                              </GridContainer>
                                            </GridItem>
                                    </GridContainer>
                                </GridItem>
                            </GridContainer>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12}>
                        <Card>
                            <CardHeader color="rose">
                                <span style={{
                                    color: '#FFFFFF', fontFamily: 'BebasNeue-Bold', fontSize: '30px'
                                }} id={'quantitative'} className={classes.cardCategory}>
                                  FashionQ{' '}
                                </span>

                            </CardHeader>
                            {/*<GridContainer>*/}
                            <GridContainer
                                justify="center"
                                direction="row">
                                <GridItem xs={12} sm={3}>
                                    <div
                                        style={{textAlign: 'left', fontSize: '40px', fontFamily: 'BebasNeue-Bold'}}>
                                        INTERSECTION ATTRIBUTES
                                    </div>
                                    <br/>
                                    <br/>
                                    <div style={{textAlign: 'left'}} id={'attributes'}/>
                                    <br/>
                                </GridItem>
                                <GridItem xs={12} sm={6}>
                                    <GridItem>
                                        <div
                                            style={{textAlign: 'left', fontSize: '40px', fontFamily: 'BebasNeue-Bold'}}>
                                            INTERSECTION LOOK
                                        </div>
                                        <div id={'intersectionLook'}></div>
                                    </GridItem>
                                </GridItem>
                                <GridItem xs={12} sm={3}>
                                    <GridItem>
                                        <div
                                            style={{textAlign: 'left', fontSize: '40px', fontFamily: 'BebasNeue-Bold'}}>
                                            INTERSECTION SHOW
                                        </div>
                                        <div id={'intersectionShow'}></div>
                                    </GridItem>
                                </GridItem>
                            </GridContainer>
                        </Card>
                    </GridItem>
                </GridItem>
            </GridContainer>
        </div>
    );
}
