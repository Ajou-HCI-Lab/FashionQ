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
import linechartForecastingJson from "../../datas_json/trend_by_city_ver2_forcasting";
import axios from "axios";
import 'antd/dist/antd.css';
import {Steps, Tag,Menu } from "antd";
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import Carousel, {Modal, ModalGateway} from "react-images";
import flagshipImagesJson from "../../datas_json/flagshipImagesJson";
import attributeGroupJson from "../../datas_json/attributeGroupsJson";
import Attribute from "../Dashboard/Attribute";
import AttributeCompares from "../Dashboard/AttributeCompares";

const {Step} = Steps;
const { SubMenu } = Menu;

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
let trendcolors = [
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
        chart: {
            height: '300',
            type: 'scatter',
            zoom: {
                enabled: false,
                type: 'xy',
            },
            animations: {
                enabled: true,
                speed: 100,
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
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

let apexTrendChartScatterOptions = {
    options: {
        chart: {
            height: '300',
            type: 'scatter',
            zoom: {
                enabled: false,
                type: 'xy',
            },
            animations: {
                enabled: true,
                speed: 100,
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
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
var apexChartLineOptions = {
    series: [linechartForecastingJson['group1'][0]],
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
            align: 'center',
            margin: 10,
            style: {
                fontFamily: 'BebasNeue-Bold',
                fintSize: '22px',
            }
        },
        annotations:{
            xaxis:[{
                x: 2019,
                x2: 2020,
                fillColor: '#96baf7',
                opacity: 0.4,
                label: {
                    borderColor: '#96baf7',
                    style: {
                        fontSize: '10px',
                        color: '#fff',
                        background: '#78a0f7',
                    },
                    offsetY: -10,
                    text: 'Forecasting Value',
                }
            }]
        },
        xaxis: {
            categories: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,2020],
        },
        yaxis:{
            seriesName: '%',
            forceNiceScale: false,
            floating: false,
            decimalsInFloat: 2,
            title: {
                text: '%',
                rotate: -90,
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: undefined,
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 600,
                    cssClass: 'apexcharts-yaxis-title',
                },
            },

        }
    }
};

export default function Dashboard() {
    const classes = useStyles();

    const [groupNumState, setGroupState] = React.useState(null);
    const [modalIsOpen, setState] = React.useState(false);
    const [checkDataPulled, setcheckDataPulledState] = React.useState(false);
    const [trendMenu, setTrendMenuState] = React.useState('trending');
    const [stepState, setStepState] = React.useState(1);

    const [trend1, setTrend1State] = React.useState('group1');
    const [trend2, setTrend2State] = React.useState('group3');
    const [trend3, setTrend3State] = React.useState('group4');

    const [isStyleButtonClicked, setIsStyleButtonClickedState] = React.useState(false);

    const [attributeList, setAttributeList ]= React.useState(null);
    const [attributeListFull, setAttributeFullList ]= React.useState(null);

    function toggleModal() {
        setState(!modalIsOpen);
    }

    function roundNumber(number, decimals) {
        var newnumber = new Number(number + '').toFixed(parseInt(decimals));
        return parseFloat(newnumber);
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    function randomNumberArray(number, length){
        var arr = [];
        while(arr.length < number){
            var r = Math.floor(Math.random() * length) - 1;
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        return arr;
    }


    axios.get('http://localhost:8000/fashionq/posts/').then(res => {
        console.log(res.data)
        if(!checkDataPulled){
            setcheckDataPulledState(true);
            setAttributeList(res.data['attribute_names']);
            setAttributeFullList(res.data['attribute_names']);
        }

        let unique = attributeListFull.filter(onlyUnique);
        console.log(attributeList);
        console.log(attributeListFull);
        console.log(unique);
        // const newAttributeList = [...attributeList, "qweqwe"];
        // setAttributeList(newAttributeList);
        //
        // console.log(attributeList);
        let jaccard_result = res.data['jaccard_result'];
        colors[stringTonumber(jaccard_result[0][0]) - 1] = '#5fa038';
        colors[stringTonumber(jaccard_result[1][0]) - 1] = '#fb4c3d';
        colors[stringTonumber(jaccard_result[2][0]) - 1] = '#fdb40b';

        let position;
        if (groupNumState !== null) {
            if (groupNumState === jaccard_result[0][0]) {
                position = 0;
            } else if (groupNumState === jaccard_result[1][0]) {
                position = 1;
            } else {
                position = 2
            }
        }

        /*
        *  처음 보이는 이미지
        *                 */

        ReactDOM.render(
            <img
                style={{textAlign: 'center', maxWidth: '100%'}}
                width="100%"
                height={'auto'}
                // src={'/static/' + this.state.file.name}
                src={'/static/' + res.data['filename']}
            />,
            document.getElementById('lookImage'),
        );


        function onClickButton(key){
            let temp = Object.assign([], attributeList);
            console.log(temp);
            if(temp.includes(key)){
                const idx = temp.indexOf(key);
                if (idx > -1) temp.splice(idx, 1);
                setAttributeList(temp);
            }else {
                temp.push(key);
                setAttributeList(temp);
            }
            attrGo();
        }
        attrGo();
        function attrGo(){
            ReactDOM.render(
                <>
                    {unique.map(index => {
                        if(attributeList.includes(index)){
                            return (
                                <span key={index}>
                            <Button onClick={() => { onClickButton(index) }} style={{ height:'100%', backgroundColor: '#000000'}}>
                                <h2 style={{color: '#ffffff', fontFamily: 'BebasNeue-Bold'}}>{index}</h2>
                            </Button>
                        </span>
                            );
                        }else{
                            return (
                                <span key={index}>
                            <Button onClick={() => { onClickButton(index) }} style={{ height:'100%', backgroundColor: '#ffffff'}}>
                                <h2 style={{ color: '#000000', fontFamily: 'BebasNeue-Bold'}}>{index}</h2>
                            </Button>
                        </span>
                            );
                        }
                    })}
                </>,
                document.getElementById('attributes'),
            );
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
        }





        ReactDOM.render(<>
            <button onClick={() => {
                onClickAttributeBoxButton(0);
                setGroupState(jaccard_result[0][0])
            }} style={{height: '10%', width: '15%', backgroundColor: '#5fa038'}} id={'firstStyleButton'}>
                <span style={{
                    fontSize: '23px',
                    fontFamily: 'BebasNeue-Bold',
                }}>STYLE {stringTonumber(jaccard_result[0][0])} - {roundNumber(jaccard_result[0][1].toFixed(6) * 100, 6)}%</span>
            </button>
            <button onClick={() => {
                onClickAttributeBoxButton(1);
                setGroupState(jaccard_result[1][0])
            }} style={{height: '10%', width: '15%', backgroundColor: '#fb4c3d'}} id={'seconStyleButton'}>
                <span style={{
                    fontSize: '23px',
                    fontFamily: 'BebasNeue-Bold'
                }}>STYLE {stringTonumber(jaccard_result[1][0])} - {roundNumber(jaccard_result[1][1].toFixed(6) * 100, 6)}%</span>
            </button>
            <button onClick={() => {
                onClickAttributeBoxButton(2);
                setGroupState(jaccard_result[2][0])
            }} style={{height: '10%', width: '15%', backgroundColor: '#fdb40b'}} id={'thirdStyleButton'}>
                <span style={{
                    fontSize: '23px',
                    fontFamily: 'BebasNeue-Bold'
                }}>STYLE {stringTonumber(jaccard_result[2][0])} - {roundNumber(jaccard_result[2][1].toFixed(6) * 100, 6)}%</span>
            </button>
        </>, document.getElementById('button_groups'))


        ReactDOM.render(
            <>
                {attributeGroupJson['Type of clothes'].map(a => {
                    return <AttributeCompares key={a} attr={a} jaccard_position={position} groupNum={groupNumState}/>;
                })}
                {attributeGroupJson['Dominant colors'].map(a => {
                    return <AttributeCompares key={a} attr={a} jaccard_position={position} groupNum={groupNumState}/>;
                })}
                {attributeGroupJson['Garments parts'].map(a => {
                    return <AttributeCompares key={a} attr={a} jaccard_position={position} groupNum={groupNumState}/>;
                })}
                {attributeGroupJson['Textile pattern'].map(a => {
                    return <AttributeCompares key={a} attr={a} jaccard_position={position} groupNum={groupNumState}/>;
                })}
                {attributeGroupJson['Decorations'].map(a => {
                    return <AttributeCompares key={a} attr={a} jaccard_position={position} groupNum={groupNumState}/>;
                })}
                {attributeGroupJson['Finishing'].map(a => {
                    return <AttributeCompares key={a} attr={a} jaccard_position={position} groupNum={groupNumState}/>;
                })}
            </>,
            document.getElementById('AttrsCompare'),
        );


        let lineData = {
            categories: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
            series: linechartJson[groupNumState],
        };

        function stringTonumber(str) {
            var res;
            res = str.replace(/[^0-9]/g, "");
            return res;
        }

        apexChartScatterOptions['options']['colors'] = colors;
        ReactDOM.render(<Chart
            height={500}
            options={apexChartScatterOptions.options}
            series={scatter_group_data_array.series}
            type="scatter"
        />, document.getElementById('scatterChart'))

        //
        ReactDOM.render(<Steps current={stepState}>
            <Step title="Upload File" description="Upload your own image file"/>
            <Step title="Style Check"
                  description="Check your style and attributes"
            />
            <Step title="Style Result" description="FashionQ!!"/>
        </Steps>, document.getElementById('fashionqStep'));


        let imagesList = flagshipImagesJson[groupNumState];
        let carouselList = [];
        for (let i = 0; i < 14; i++) {
            let temp = {};
            temp['source'] =
                '/static/Representative_Images_top15/' + groupNumState + '/' + imagesList[i];
            carouselList.push(temp);
        }


        ReactDOM.render(<div style={{float: 'left'}}>
                {imagesList.map(img => {
                    return (<div style={{padding: '10'}} key={img}>
                            <img
                                style={{width: '6%', float: 'left'}}
                                src={'/static/Representative_Images_top15/' + groupNumState + '/' + img}
                                onClick={toggleModal}
                            />{' '}</div>
                    );
                })}
            {/*    {imagesList.map(img => {*/}
            {/*    return (<div style={{padding: '10'}} key={img}>*/}
            {/*            <img*/}
            {/*                style={{width: '6%', float: 'left'}}*/}
            {/*                src={'/static/Representative_Images_top15/' + groupNumState + '/' + img}*/}
            {/*                onClick={toggleModal}*/}
            {/*            />{' '}</div>*/}
            {/*    );*/}
            {/*})}*/}
            <ModalGateway>
                {modalIsOpen ? (
                    <Modal onClose={toggleModal}>
                        <Carousel views={carouselList}/>
                    </Modal>
                ) : null}
            </ModalGateway></div>,
            document.getElementById('representativeLooks'),
        );


        /*********************
         *
         *
         *       TRENDQ
         *
         *
         * ******************/


        if (isStyleButtonClicked) {
            for(let i=0; i<trendcolors.length; i++){
                trendcolors[i] = '#665f5f';
            }
            trendcolors[stringTonumber(trend1)-1] = '#ff0000';
            trendcolors[stringTonumber(trend2)-1] = '#000aff';
            trendcolors[stringTonumber(trend3)-1] = '#00ff1d';
            apexTrendChartScatterOptions['options']['colors'] = trendcolors;

            ReactDOM.render(<Chart
                width={'100%'}
                height={500}
                options={apexTrendChartScatterOptions.options}
                series={scatter_group_data_array.series}
                type="scatter"
            />, document.getElementById('trendScatter'));

            apexChartLineOptions['options']['colors'] = ['#ff0000'];
            apexChartLineOptions['options']['title']['text'] = trend1;
            ReactDOM.render(<Chart width={'100%'} height={300}
                                   options={apexChartLineOptions.options}
                                   series={[linechartForecastingJson[trend1][0]]}
                                   type={'line'}/>, document.getElementById('trend_chart1'));

            apexChartLineOptions['options']['colors'] = ['#000aff'];
            apexChartLineOptions['options']['title']['text'] = trend2;
            ReactDOM.render(<Chart width={'100%'} height={300}
                                   options={apexChartLineOptions.options}
                                   series={[linechartForecastingJson[trend2][0]]}
                                   type={'line'}/>, document.getElementById('trend_chart2'));

            apexChartLineOptions['options']['colors'] = ['#00ff1d'];
            apexChartLineOptions['options']['title']['text'] = trend3;
            ReactDOM.render(<Chart width={'100%'} height={300}
                                   options={apexChartLineOptions.options}
                                   series={[linechartForecastingJson[trend3][0]]}
                                   type={'line'}/>, document.getElementById('trend_chart3'));


            let trendImageArray = randomNumberArray(6, 15);
            let imagesList_trend1 = [];
            for(let i =0; i<6; i++){
                imagesList_trend1.push(flagshipImagesJson[trend1][trendImageArray[i]]);
            }
            console.log(imagesList_trend1);
            let carouselList_trend1 = [];
            for (let i = 0; i < imagesList_trend1.length; i++) {
                let temp = {};
                temp['source'] =
                    '/static/Representative_Images_top15/' + trend1 + '/' + imagesList_trend1[trendImageArray[i]];
                carouselList_trend1.push(temp);
            }
            ReactDOM.render(<div>
                    {imagesList_trend1.map(img => {
                        return (<div style={{padding: '10'}} key={img}>
                                <img
                                    style={{width: '15%', float: 'left', padding: '10'}}
                                    src={'/static/Representative_Images_top15/' + trend1 + '/' + img}
                                />{' '}</div>
                        );
                    })} </div>,
                document.getElementById('images1'),
            );


            let imagesList_trend2 = [];
            for(let i =0; i<6; i++){
                imagesList_trend2.push(flagshipImagesJson[trend2][trendImageArray[i]]);
            }
            console.log(imagesList_trend2);
            let carouselList_trend2 = [];
            for (let i = 0; i < imagesList_trend2.length; i++) {
                let temp = {};
                temp['source'] =
                    '/static/Representative_Images_top15/' + trend2 + '/' + imagesList_trend2[i];
                carouselList_trend2.push(temp);
            }
            ReactDOM.render(<div>
                    {imagesList_trend2.map(img => {
                        return (<div style={{padding: '10'}} key={img}>
                                <img
                                    style={{width: '15%', float: 'left', padding: '10'}}
                                    src={'/static/Representative_Images_top15/' + trend2 + '/' + img}
                                />{' '}</div>
                        );
                    })} </div>,
                document.getElementById('images2'),
            );

            let imagesList_trend3 = [];
            for(let i =0; i<6; i++){
                imagesList_trend3.push(flagshipImagesJson[trend3][trendImageArray[i]]);
            }
            console.log(imagesList_trend3);
            let carouselList_trend3 = [];
            for (let i = 0; i < imagesList_trend3.length; i++) {
                let temp = {};
                temp['source'] =
                    '/static/Representative_Images_top15/' + trend3 + '/' + imagesList_trend3[i];
                carouselList_trend3.push(temp);
            }
            ReactDOM.render(<div>
                    {imagesList_trend3.map(img => {
                        return (<div style={{padding: '10'}} key={img}>
                                <img
                                    style={{width: '15%', float: 'left', padding: '10'}}
                                    src={'/static/Representative_Images_top15/' + trend3 + '/' + img}
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
                                    src={'/static/Representative_Images_top15/' + groupNumState + '/' + img}
                                />{' '}</div>
                        );
                    })} </div>,
                document.getElementById('intersectionLook'),
            );


            let result = '';
            for (let j = 0; j < unique.length; j++) {
                result = result + unique[j] + '<br/>';
            }

            ReactDOM.render(
                <>
                    {attributeList.map(index => {
                        return (
                            <span key={index}>
                            <Tag color="white">
                                <h1 style={{color: '#000000', fontFamily: 'BebasNeue-Bold'}}>{index}</h1>
                            </Tag>
                        </span>
                        );
                    })}
                </>,
                document.getElementById('intersectionAttributes'),
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
        }

    });

    function onClickAttributeBoxButton(jaccard_position) {
        setIsStyleButtonClickedState(true);
        setStepState(2);

        ReactDOM.render(
            <>
                {attributeGroupJson['Type of clothes'].map(a => {
                    return <AttributeCompares key={a} attr={a} jaccard_position={jaccard_position}
                                              groupNum={groupNumState}/>;
                })}
                {attributeGroupJson['Dominant colors'].map(a => {
                    return <AttributeCompares key={a} attr={a} jaccard_position={jaccard_position}
                                              groupNum={groupNumState}/>;
                })}
                {attributeGroupJson['Garments parts'].map(a => {
                    return <AttributeCompares key={a} attr={a} jaccard_position={jaccard_position}
                                              groupNum={groupNumState}/>;
                })}
                {attributeGroupJson['Textile pattern'].map(a => {
                    return <AttributeCompares key={a} attr={a} jaccard_position={jaccard_position}
                                              groupNum={groupNumState}/>;
                })}
                {attributeGroupJson['Decorations'].map(a => {
                    return <AttributeCompares key={a} attr={a} jaccard_position={jaccard_position}
                                              groupNum={groupNumState}/>;
                })}
                {attributeGroupJson['Finishing'].map(a => {
                    return <AttributeCompares key={a} attr={a} jaccard_position={jaccard_position}
                                              groupNum={groupNumState}/>;
                })}
            </>,
            document.getElementById('AttrsCompare'),
        );
    }
    function onClickTrendMenu (e) {
        console.log('click ', e);
        setTrendMenuState(e.key);
        if(e.key === 'trending'){
            setTrend1State('group1');
            setTrend2State('group3');
            setTrend3State('group4');
        }else if(e.key === 'declining'){
            setTrend1State('group16');
            setTrend2State('group6');
            setTrend3State('group17');
        }else if(e.key === 'upcoming'){
            setTrend1State('group5');
            setTrend2State('group18');
            setTrend3State('group13');
        }else{
            setTrend1State('group9');
            setTrend2State('group22');
            setTrend3State('group24');
        }
    };
    const menuItems = (
        <Menu style={{float: 'left', textAlign: 'left', fontSize: 30}} onClick={onClickTrendMenu} selectedKeys={[trendMenu]} mode="horizontal">
            <Menu.Item key="trending">
                TRENDING STYLE
            </Menu.Item>
            <Menu.Item key="declining">
                DECLINING STYLE
            </Menu.Item>
            <Menu.Item key="upcoming">
                UPCOMING STYLE
            </Menu.Item>
            <Menu.Item key="steady">
                STEADY STYLE
            </Menu.Item>
        </Menu>
    );
    const TrendQ = () =>(
        <div id={'trendQ'} disabled={true}>
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
                                    {/*<Chart*/}
                                    {/*    height={500}*/}
                                    {/*    options={apexChartScatterOptions.options}*/}
                                    {/*    series={scatter_group_data_array.series}*/}
                                    {/*    type="trendScatter"*/}
                                    {/*/>*/}
                                    <div id={'trendScatter'}/>
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
                                                {menuItems}
                                            {/*    <Dropdown  style={{float: 'left',*/}
                                            {/*    textAlign: 'left',}} overlay={menuItems}>*/}
                                            {/*    <a id={'trendMenu'} className="ant-dropdown-link" onClick={e => e.preventDefault()}>*/}
                                            {/*        Trending <DownOutlined />*/}
                                            {/*    </a>*/}
                                            {/*</Dropdown>*/}
                                            </div>

                                        </GridItem>
                                        <GridItem xs={12}>
                                            <GridContainer>
                                                <GridItem xs={12} sm={4}>
                                                    <div id={'trend_chart1'}/>
                                                    <div id={'images1'}/>
                                                </GridItem>
                                                <GridItem xs={12} sm={4}>
                                                    <div id={'trend_chart2'}/>
                                                    <div id={'images2'}/>
                                                </GridItem>
                                                <GridItem xs={12} sm={4}>
                                                    <div id={'trend_chart3'}/>
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
                                    <div style={{textAlign: 'left'}} id={'intersectionAttributes'}/>
                                    <br/>
                                </GridItem>
                                <GridItem xs={12} sm={6}>
                                    <GridItem>
                                        <div
                                            style={{
                                                textAlign: 'left',
                                                fontSize: '40px',
                                                fontFamily: 'BebasNeue-Bold'
                                            }}>
                                            INTERSECTION LOOK
                                        </div>
                                        <div id={'intersectionLook'}></div>
                                    </GridItem>
                                </GridItem>
                                <GridItem xs={12} sm={3}>
                                    <GridItem>
                                        <div
                                            style={{
                                                textAlign: 'left',
                                                fontSize: '40px',
                                                fontFamily: 'BebasNeue-Bold'
                                            }}>
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
    )


    return (
        <div>
            <GridContainer>
                <GridItem xs={12}>
                    <GridItem xs={12}>
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
                                <GridItem xs={12} sm={2}>
                                    <span id="lookImage" className={classes.stats}></span>
                                </GridItem>
                                <GridItem xs={12} sm={9}>
                                    <span>
                                        <div
                                            style={{textAlign: 'left', fontSize: '40px', fontFamily: 'BebasNeue-Bold'}}>
                                            ATTRIBUTES
                                        </div>
                                        <Card style={{width: '100%'}}>
                                            <br/>
                                            <div style={{textAlign: 'left', padding:'10px' }} id={'attributes'}/></Card>
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
                    <GridItem xs={12} sm={12}>
                        <Card>
                            <CardHeader color="rose">
                <span style={{
                    color: '#FFFFFF', fontFamily: 'BebasNeue-Bold', fontSize: '30px'
                }} id={'quantitative'} className={classes.cardCategory}>
                  STYLEQ{' '}
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
                                <GridItem xs={12} sm={2}>
                                    <div
                                        style={{textAlign: 'left', fontSize: '40px', fontFamily: 'BebasNeue-Bold'}}>
                                        STYLE MAP
                                    </div>
                                    <CardBody id={'scatterChart'}/>
                                </GridItem>
                                <GridItem xs={12} sm={9}>
                                    <div style={{textAlign: 'left', marginBottom: '20px'}} id={'button_groups'}>
                                        <button id={'firstStyleButton'}></button>
                                        <button id={'seconStyleButton'}></button>
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
                                    <GridItem xs={12} sm={9}>
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
            <div id={'trendQQ'}>
                {isStyleButtonClicked ? <TrendQ/> : null}
            </div>
        </div>
    );
}
