/* eslint-disable prettier/prettier,no-unused-vars,no-console,no-undef,react/no-unescaped-entities,jsx-a11y/alt-text */
import React, {useState} from 'react';
import axios from 'axios';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';
// @material-ui/core
import {Tag, Divider, Button, Steps} from 'antd';
import 'antd/dist/antd.css';
import {makeStyles} from '@material-ui/core/styles';
// @material-ui/icons
import Popup from 'reactjs-popup';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
//import Table from 'components/Table/Table.js';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Tasks from 'components/Tasks/Tasks.js';
import CustomTabs from 'components/CustomTabs/CustomTabs.js';
import Danger from 'components/Typography/Danger.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardIcon from 'components/Card/CardIcon.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';

import {bugs, website, server} from 'variables/general.js';

import ReactHtmlParser from 'react-html-parser';
import 'tui-chart/dist/tui-chart.css';
import '../../index.css'
import {
    ScatterChart as TuiScatter,
    LineChart,
    ColumnChart,
} from '@toast-ui/react-chart';
import scatterJson from '../../datas_json/group_top_new_100.json';
import linechartJson from '../../datas_json/trend_by_city_ver2';
import flagshipBrandJson from '../../../src/datas_json/flagship_Brands';
import Viewer from 'react-viewer';
import attributeGroupJson from '../../datas_json/attributeGroupsJson.json';
import flagshipImagesJson from '../../datas_json/flagshipImagesJson.json';
import Attribute from './Attribute';
import AttributeCompares from './AttributeCompares';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import ReactDOM from 'react-dom';
import Chart from 'react-apexcharts';
import {withStyles} from '@material-ui/core/styles';

import LookContent from './lookContent.js';
import AttributeBoxContent from './attributeBoxContent.js';
import QuantitativeContent from './quantitativeContent.js';

import Carousel, {Modal, ModalGateway} from 'react-images';
import scatterJsonarray from "../../datas_json/group_top_new_25_array";

const {Step} = Steps;
const useStyles = makeStyles(styles);

const lineChart_options = {
    chart: {
        width: 600,
        height: 400,
    },
    yAxis: {
        title: 'Percent(%)',
    },
    xAxis: {
        title: 'Month',
        pointOnColumn: true,
        dateFormat: 'MMM',
        tickInterval: 'auto',
    },
    series: {
        showDot: false,
        zoomable: true,
    },
    tooltip: {
        suffix: '%',
    },
    legend: {
        align: 'bottom',
    },
    chartExportMenu: {
        visible: false,
    },
};

let apexChartScatterOptions = {
    options: {
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

export default function Dashboard() {

    const [groupNumState, setGroupState] = React.useState('group1');

    let colorList = [
        '#bfaa3a',
        '#9bbf36',
        '#50bf60',
        '#51b9bf',
        '#bf5861',
        '#9673bf',
    ];

    let attributeList = [];
    //TODO : test -> post로 바꾸기
    axios.get('http://localhost:8000/fashionq/test/' + groupNumState).then(res => {
        ReactDOM.render(<Steps current={1}>
            <Step title="Upload File" description="Upload your own image file"/>
            <Step title="Style Check"
                  description="Check your style and attributes"
            />
            <Step title="Style Result" />
        </Steps>, document.getElementById('fashionqStep'));
        console.log(res.data);

        ReactDOM.render(
            <img
                style={{textAlign: 'center', maxWidth: '80%'}}
                width="100%"
                height={'auto'}
                // src={'/static/' + this.state.file.name}
                src={'/static/' + res.data['filename']}
            />,
            document.getElementById('lookImage'),
        );

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        attributeList = res.data['attribute_names'];
        let unique = attributeList.filter(onlyUnique);

        // let groupNum = res.data['prediction_df_NMF'];
        // setGroupState(res.data['jaccard_result'][0][0]);
        console.log(groupNumState);

        ReactDOM.render(
            <>
                {attributeGroupJson['Type of clothes'].map(a => {
                    return (
                        <Attribute
                            key={a}
                            attr={a}
                            list={attributeList}
                            group={'Type of clothes'}
                        />
                    );
                })}
                {attributeGroupJson['Dominant colors'].map(a => {
                    return <Attribute key={a} attr={a} list={attributeList}/>;
                })}
                {attributeGroupJson['Garments parts'].map(a => {
                    return <Attribute key={a} attr={a} list={attributeList}/>;
                })}
                {attributeGroupJson['Textile pattern'].map(a => {
                    return <Attribute key={a} attr={a} list={attributeList}/>;
                })}
                {attributeGroupJson['Decorations'].map(a => {
                    return <Attribute key={a} attr={a} list={attributeList}/>;
                })}
                {attributeGroupJson['Finishing'].map(a => {
                    return <Attribute key={a} attr={a} list={attributeList}/>;
                })}
            </>,
            document.getElementById('yourLookAttrs'),
        );

        ReactDOM.render(
            <>
                {attributeGroupJson['Type of clothes'].map(a => {
                    return <AttributeCompares key={a} attr={a} groupNum={groupNumState}/>;
                })}
                {attributeGroupJson['Dominant colors'].map(a => {
                    return <AttributeCompares key={a} attr={a} groupNum={groupNumState}/>;
                })}
                {attributeGroupJson['Garments parts'].map(a => {
                    return <AttributeCompares key={a} attr={a} groupNum={groupNumState}/>;
                })}
                {attributeGroupJson['Textile pattern'].map(a => {
                    return <AttributeCompares key={a} attr={a} groupNum={groupNumState}/>;
                })}
                {attributeGroupJson['Decorations'].map(a => {
                    return <AttributeCompares key={a} attr={a} groupNum={groupNumState}/>;
                })}
                {attributeGroupJson['Finishing'].map(a => {
                    return <AttributeCompares key={a} attr={a} groupNum={groupNumState}/>;
                })}
            </>,
            document.getElementById('AttrsCompare'),
        );

        var result = '';
        for (var j = 0; j < unique.length; j++) {
            result = result + unique[j] + '<br/>';
        }

        const attrList = unique.map((attr, index) => (
            <Tag color={'#f50'} key={index}>
                {attr}
            </Tag>
        ));
        // ReactDOM.render(
        //   ReactHtmlParser('<span >' + result + '</span>'),
        //   document.getElementById('attributes'),
        // );

        // ReactDOM.render(
        //        <>{attrList}</>, document.getElementById('attributes'));

        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
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

        let lineData = {
            categories: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
            series: linechartJson[groupNumState],
        };

        let jaccard_result = res.data['jaccard_result'];
        colors[stringTonumber(jaccard_result[0][0])-1] = '#5fa038';
        colors[stringTonumber(jaccard_result[1][0])-1] = '#fb4c3d';
        colors[stringTonumber(jaccard_result[2][0])-1] = '#fdb40b';

        apexChartScatterOptions['options']['colors'] = colors;
        ReactDOM.render(<Chart
            height={500}
            options={apexChartScatterOptions.options}
            series={scatter_group_data_array.series}
            type="scatter"
        />, document.getElementById('scatterChart'))


        ReactDOM.render(
            `QUANTITATIVE STYLE ${groupNumState.toUpperCase()}`,
            document.getElementById('quantitative'),
        );

        /*
                  <Button id={'yourLookButton'}>YOUR LOOK</Button>
                  <Button id={'firstStyleButton'}>YOUR LOOK</Button>
                  <Button id={'secondStyleButton'}>YOUR LOOK</Button>
                  <Button id={'thirdStyleButton'}>YOUR LOOK</Button>
        */
        function stringTonumber(str) {
            var res;
            res = str.replace(/[^0-9]/g, "");
            return res;
        }

        function roundNumber(number, decimals) {
            var newnumber = new Number(number + '').toFixed(parseInt(decimals));
            return parseFloat(newnumber);
        }

        // ReactDOM.render(`YOUR LOOK - STYLE ${jaccard_result[0][0][5]}`,document.getElementById('yourLookButton'));
        // ReactDOM.render(`STYLE ${jaccard_result[1][0][5]} - ${jaccard_result[1][1].toFixed(4)*100}%`,document.getElementById('firstStyleButton'));
        // ReactDOM.render(`STYLE ${jaccard_result[2][0][5]} - ${jaccard_result[2][1].toFixed(4)*100}%`,document.getElementById('secondStyleButton'));
        // ReactDOM.render(`STYLE ${jaccard_result[3][0][5]} - ${jaccard_result[3][1].toFixed(4)*100}%`,document.getElementById('thirdStyleButton'));
        ReactDOM.render(<>
            <button onClick={() => {
                onClickAttributeBoxButton(0);
                setGroupState(jaccard_result[0][0])
            }} style={{backgroundColor:'#5fa038'}} id={'firstStyleButton'}>
                <span style={{
                    fontSize: '23px',
                    fontFamily: 'BebasNeue-Bold',
                    padding: '30'
                }}>STYLE {stringTonumber(jaccard_result[0][0])} - {roundNumber(jaccard_result[0][1].toFixed(6) * 100, 6)}%</span>
            </button>
            <button onClick={() => {
                onClickAttributeBoxButton(1);
                setGroupState(jaccard_result[1][0])
            }}  style={{backgroundColor:'#fb4c3d'}} id={'secondStyleButton'}>
                <span style={{
                    fontSize: '23px',
                    fontFamily: 'BebasNeue-Bold'
                }}>STYLE {stringTonumber(jaccard_result[1][0])} - {roundNumber(jaccard_result[1][1].toFixed(6) * 100, 6)}%</span>
            </button>
            <button onClick={() => {
                onClickAttributeBoxButton(2);
                setGroupState(jaccard_result[2][0])
            }}  style={{backgroundColor:'#fdb40b'}} id={'thirdStyleButton'}>
                <span style={{
                    fontSize: '23px',
                    fontFamily: 'BebasNeue-Bold'
                }}>STYLE {stringTonumber(jaccard_result[2][0])} - {roundNumber(jaccard_result[2][1].toFixed(6) * 100, 6)}%</span>
            </button>
        </>, document.getElementById('button_groups'))


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
                    return (<div style={{padding:'10'}} key={img}>
                        <img
                            style={{width: '6%', float:'left', padding:'10'}}
                            src={'/static/Representative_Images/' + groupNumState + '/' + img}
                            onClick={toggleModal}
                        />{' '}</div>
                    );
                })} {imagesList.map(img => {
                return (<div style={{padding:'10'}} key={img}>
                        <img
                            style={{width: '6%', float:'left', padding:'10'}}
                            src={'/static/Representative_Images/' + groupNumState + '/' + img}
                            onClick={toggleModal}
                        />{' '}</div>
                );
            })}<ModalGateway>
                {modalIsOpen ? (
                    <Modal onClose={toggleModal}>
                        <Carousel views={carouselList}/>
                    </Modal>
                ) : null}
            </ModalGateway></div>,
            document.getElementById('representativeLooks'),
        );
        // ReactDOM.render(
        //     <TuiScatter
        //         data={scatter_group_data}
        //         options={scatter_options}
        //     />,
        //     document.getElementById('scatter'),
        // );
    });
    const classes = useStyles();
    const imgpath = '';
    const [visible, setVisible] = React.useState(false);

    // var modalIsOpen = false;
    const [modalIsOpen, setState] = useState(false);


    function toggleModal() {
        setState(!modalIsOpen);
    }

    function onClickAttributeBoxButton(jaccard_position) {
        ReactDOM.render(
            <>
                {attributeGroupJson['Type of clothes'].map(a => {
                    return <AttributeCompares key={a} attr={a} jaccard_position={jaccard_position} groupNum={groupNumState}/>;
                })}
                {attributeGroupJson['Dominant colors'].map(a => {
                    return <AttributeCompares key={a} attr={a} jaccard_position={jaccard_position} groupNum={groupNumState}/>;
                })}
                {attributeGroupJson['Garments parts'].map(a => {
                    return <AttributeCompares key={a} attr={a} jaccard_position={jaccard_position} groupNum={groupNumState}/>;
                })}
                {attributeGroupJson['Textile pattern'].map(a => {
                    return <AttributeCompares key={a} attr={a} jaccard_position={jaccard_position} groupNum={groupNumState}/>;
                })}
                {attributeGroupJson['Decorations'].map(a => {
                    return <AttributeCompares key={a} attr={a} jaccard_position={jaccard_position} groupNum={groupNumState}/>;
                })}
                {attributeGroupJson['Finishing'].map(a => {
                    return <AttributeCompares key={a} attr={a} jaccard_position={jaccard_position} groupNum={groupNumState}/>;
                })}
            </>,
            document.getElementById('AttrsCompare'),
        );
    }

    return (
        <div>
            <GridContainer>
                <GridItem>
                    <GridItem xs={20}>
                        <Card>
                            <CardHeader color="rose">
                                <span style={{
                                    color: '#FFFFFF', fontFamily: 'BebasNeue-Bold', fontSize: '30px'
                                }} className={classes.cardCategory}>AttributeQ</span>
                                {/*<Popup*/}
                                {/*    modal*/}
                                {/*    trigger={<Button color={'#ff0000'} type={'primary'}>?</Button>}*/}
                                {/*    position="right center"*/}
                                {/*>*/}
                                {/*    {close => <AttributeBoxContent close={close}/>}*/}
                                {/*</Popup>*/}
                            </CardHeader>
                            <GridContainer
                                justify="center"
                                direction="row">
                                <GridItem xs={20} sm={2}>
                                    <span id="lookImage" className={classes.stats}></span>
                                </GridItem>
                                <GridItem xs={20} sm={17}>
                                    <span>
                                        <div
                                            style={{textAlign: 'left', fontSize: '40px', fontFamily: 'BebasNeue-Bold'}}>
                                            ATTRIBUTES
                                        </div>
                                        <Card style={{width: '100%'}}>
                                            <br/>
                                            <div style={{textAlign: 'left'}} id={'attributes'}/></Card>
                                    </span>
                                    <Table
                                        alignItems="center"
                                        justify="center"
                                        style={{textAlign: 'center', width: '70%'}}
                                        className={classes.table}
                                    >
                                        <TableBody>
                                            <TableRow>
                                                <TableCell
                                                    style={{
                                                        fontFamily: 'BebasNeue-Bold',
                                                        //backgroundColor: '#bfaa3a',
                                                        textAlign: 'center',
                                                        fontSize: 25,
                                                        border: '1px solid #000000',
                                                    }}
                                                    colSpan={60}
                                                >
                                                    Type of clothes
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        fontFamily: 'BebasNeue-Bold',
                                                        //backgroundColor: '#9bbf36',
                                                        textAlign: 'center',
                                                        fontSize: 25,
                                                        border: '1px solid #000000',
                                                    }}
                                                    colSpan={15}
                                                >
                                                    Dominant colors
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        fontFamily: 'BebasNeue-Bold',
                                                        //backgroundColor: '#50bf60',
                                                        textAlign: 'center',
                                                        fontSize: 25,
                                                        border: '1px solid #000000',
                                                    }}
                                                    colSpan={27}
                                                >
                                                    Garments parts
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        fontFamily: 'BebasNeue-Bold',
                                                        //backgroundColor: '#51b9bf',
                                                        textAlign: 'center',
                                                        fontSize: 25,
                                                        border: '1px solid #000000',
                                                    }}
                                                    colSpan={21}
                                                >
                                                    Textile pattern
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        fontFamily: 'BebasNeue-Bold',
                                                        //backgroundColor: '#bf5861',
                                                        textAlign: 'center',
                                                        fontSize: 25,
                                                        border: '1px solid #000000',
                                                    }}
                                                    colSpan={15}
                                                >
                                                    Decorations
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        fontFamily: 'BebasNeue-Bold',
                                                        //backgroundColor: '#9673bf',
                                                        textAlign: 'center',
                                                        fontSize: 25,
                                                        border: '1px solid #000000',
                                                    }}
                                                    colSpan={9}
                                                >
                                                    Finishing
                                                </TableCell>
                                            </TableRow>
                                            <TableRow id={'yourLookAttrs'} style={{width: '80%'}}>
                                            </TableRow>
                                            {/*<TableRow id={'AttrsCompare'} style={{width: '80%'}}>*/}
                                            {/*</TableRow>*/}
                                        </TableBody>
                                    </Table>
                                    <br/>
                                </GridItem>
                            </GridContainer>
                        </Card>
                    </GridItem>
                    <GridItem xs={20} sm={20}>
                        <Card>
                            <CardHeader color="rose">
                <span style={{
                    color: '#FFFFFF', fontFamily: 'BebasNeue-Bold', fontSize: '30px'
                }} id={'quantitative'} className={classes.cardCategory}>
                  QUANTITATIVE{' '}
                </span>
                                {/*<Popup*/}
                                {/*    modal*/}
                                {/*    trigger={<Button type={'primary'}>?</Button>}*/}
                                {/*    position="right center"*/}
                                {/*>*/}
                                {/*    {close => <QuantitativeContent close={close}/>}*/}
                                {/*</Popup>*/}
                            </CardHeader>

                            <GridContainer
                                justify="center"
                                direction="row">
                                <GridItem xs={2} sm={2}>
                                    <div
                                        style={{textAlign: 'left', fontSize: '40px', fontFamily: 'BebasNeue-Bold'}}>
                                        STYLE MAP
                                    </div>
                                    <CardBody id={'scatterChart'}/>
                                </GridItem>
                                <GridItem xs={17} sm={17}>
                                    <div style={{textAlign: 'left', marginBottom: '20px'}} id={'button_groups'}>
                                        <button id={'firstStyleButton'}></button>
                                        <button id={'secondStyleButton'}></button>
                                        <button id={'thirdStyleButton'}></button>
                                    </div>
                                    <Table
                                        alignItems="center"
                                        justify="center"
                                        style={{textAlign: 'center', width: '70%'}}
                                        className={classes.table}
                                    >
                                        <TableBody>
                                            <TableRow>
                                                <TableCell
                                                    style={{
                                                        fontFamily: 'BebasNeue-Bold',
                                                        //backgroundColor: '#bfaa3a',
                                                        textAlign: 'center',
                                                        fontSize: 25,
                                                        border: '1px solid #000000',
                                                    }}
                                                    colSpan={60}
                                                >
                                                    Type of clothes
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        fontFamily: 'BebasNeue-Bold',
                                                        //backgroundColor: '#9bbf36',
                                                        textAlign: 'center',
                                                        fontSize: 25,
                                                        border: '1px solid #000000',
                                                    }}
                                                    colSpan={15}
                                                >
                                                    Dominant colors
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        fontFamily: 'BebasNeue-Bold',
                                                        //backgroundColor: '#50bf60',
                                                        textAlign: 'center',
                                                        fontSize: 25,
                                                        border: '1px solid #000000',
                                                    }}
                                                    colSpan={27}
                                                >
                                                    Garments parts
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        fontFamily: 'BebasNeue-Bold',
                                                        //backgroundColor: '#51b9bf',
                                                        textAlign: 'center',
                                                        fontSize: 25,
                                                        border: '1px solid #000000',
                                                    }}
                                                    colSpan={21}
                                                >
                                                    Textile pattern
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        fontFamily: 'BebasNeue-Bold',
                                                        //backgroundColor: '#bf5861',
                                                        textAlign: 'center',
                                                        fontSize: 25,
                                                        border: '1px solid #000000',
                                                    }}
                                                    colSpan={15}
                                                >
                                                    Decorations
                                                </TableCell>
                                                <TableCell
                                                    style={{
                                                        fontFamily: 'BebasNeue-Bold',
                                                        //backgroundColor: '#9673bf',
                                                        textAlign: 'center',
                                                        fontSize: 25,
                                                        border: '1px solid #000000',
                                                    }}
                                                    colSpan={9}
                                                >
                                                    Finishing
                                                </TableCell>
                                            </TableRow>
                                            <TableRow id={'AttrsCompare'} style={{width: '80%'}}>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                    <GridItem xs={17} sm={17}>
                                        <br/>
                                        <div
                                            style={{textAlign: 'left', fontSize: '40px', fontFamily: 'BebasNeue-Bold'}}>
                                            REPRESENTATIVE LOOKS
                                        </div>
                                            <div id={'representativeLooks'}></div>
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
