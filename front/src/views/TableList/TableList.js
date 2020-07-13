/* eslint-disable prettier/prettier,no-unused-vars,no-console */
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import BugReport from '@material-ui/core/SvgIcon/SvgIcon';
import {ScatterChart as TuiScatter, LineChart, TuiChart} from '@toast-ui/react-chart';
import linechartJson from '../../datas_json/trend_by_city_ver2';
// import scatterJson from "../../datas_json/group  _top_new_100";
import Chart from 'react-apexcharts';

import scatterJson from '../../../src/datas_json/group_top50.json';

import scatterJsonarray from '../../../src/datas_json/group_top_new_25_array.json';
import App from '../../App';
import Popup from 'reactjs-popup';
import StyleMap from './styleMap';
import axios from "axios";
import flagshipImagesJson from "../../datas_json/flagshipImagesJson";
import Carousel, {Modal, ModalGateway} from "react-images";
import {Steps} from "antd";

const {Step} = Steps;
const styles = {
    cardCategoryWhite: {
        '&,& a,& a:hover,& a:focus': {
            color: 'rgba(255,255,255,.62)',
            margin: '0',
            fontSize: '14px',
            marginTop: '0',
            marginBottom: '0',
        },
        '& a,& a:hover,& a:focus': {
            color: '#FFFFFF',
        },
    },
    cardTitleWhite: {
        color: '#FFFFFF',
        marginTop: '0px',
        minHeight: 'auto',
        fontWeight: '300',
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: '3px',
        textDecoration: 'none',
        '& small': {
            color: '#777',
            fontSize: '65%',
            fontWeight: '400',
            lineHeight: '1',
        },
    },
    cardCategory: {
        color: '#ffffff',
        margin: '0',
        fontSize: '25px',
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        marginTop: '0',
        paddingTop: '3px',
        marginBottom: '0',
    },
    circle1: {
        width: '400px',
        height: '400px',
        borderRadius: '200px',
        textAlign: 'center',
        // display: 'inline',
        // margin:'0 auto',
        border: '3pt solid',
        borderColor: '#000000',
        // verticalAlign:'middle',
        float: 'right',
        // lineHeight: '150px',
        position: 'relative',
    },
    circle2: {
        width: '400px',
        height: '400px',
        borderRadius: '200px',
        textAlign: 'center',
        // margin:'0 auto',
        border: '3pt solid',
        float: 'left',
        position: 'absolute',
        borderColor: '#000000',
        // verticalAlign:'middle',
        lineHeight: '200px',
    },
    boxA: {
        textAlign: 'center',
        width: '700px',
        boder: 'solid 8px',
        color: 'pink',
    },
};

const useStyles = makeStyles(styles);

let apexChartScatterOptions = {
    options: {
        chart: {
            height: 1300,
            type: 'scatter',
            zoom: {
                enabled: true,
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

export default function TableList() {

    const classes = useStyles();
    const scatterChartRef = React.createRef();

    function onchangeCheckedLegends(e) {
        console.log(this.scatterChartRef.current.getInstance().getScaleOption());
        console.log('changeCheckedLegendschartBase');
    }

    function handleClickButton(e) {
        console.log(e.legend); // 이렇게하면 group3 이런식으로 나
        console.log('이거 클릭됨');
    }

    let lineChart_options = {
        chart: {
            width: 450,
            height: 400,
        },
        yAxis: {
            title: 'Percent(%)',
        },
        plot: {
            showLine: true
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
            visible: false,
            align: 'bottom',
        },
        chartExportMenu: {
            visible: false,
        },

    };
    const theme = {
        series: {
            colors: ['#FF0000', '#00FF00', '#0000FF'],
        }
    };
    // LineChart.registerTheme('mytheme', theme);
    // lineChart_options.theme = 'mytheme';

    const colors = [
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
    const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];

    function selectSeries(e) {
        console.log('selectSeries');
        console.log(e);
    }

    function numberFromString(str) {
        let res;
        res = str.replace(/[^0-9]/g, "");
        return res;
    }

    const [modal1IsOpen, setModal1State] = useState(false);
    const [modal2IsOpen, setModal2State] = useState(false);
    const [modal3IsOpen, setModal3State] = useState(false);

    function toggleModal1() {
        setModal1State(!modal1IsOpen);
    }

    function toggleModal2() {
        setModal2State(!modal2IsOpen);
    }

    function toggleModal3() {
        setModal3State(!modal3IsOpen);
    }

    axios.get('http://localhost:8000/fashionq/map/').then(res => {
            ReactDOM.render(<Steps current={2}>
                <Step title="Upload File" description="This is a description."/>
                <Step title="Style Check"
                      description="This is a description."
                />
                <Step title="Style Result" description="This is a description."/>
            </Steps>, document.getElementById('fashionqStep'));

            let nowGroup = res.data['group'];
            let nowGroupnum = numberFromString(nowGroup);


            let count = 0;
            let whichGroupExist;
            let linedata, linedata2, linedata3;
            let options = []
            options[0] = JSON.parse(JSON.stringify(lineChart_options))
            options[1] = JSON.parse(JSON.stringify(lineChart_options))
            options[2] = JSON.parse(JSON.stringify(lineChart_options));
            let groups = [];
            if (nowGroup != 'group1') {
                linedata = {
                    categories: years,
                    series: [linechartJson['group1'][0]],
                };
                options[count]['chart']['title'] = {
                    text: 'STYLE 1',
                    align: 'center'
                };
                console.log(options[count])
                colors[0] = '#FF0000';
                groups.push('group1');
                count++;
            } else whichGroupExist = 'group1';
            if (nowGroup != 'group3') {
                linedata2 = {
                    categories: years,
                    series: [linechartJson['group3'][0]],
                };
                options[count]['chart']['title'] = {
                    text: 'STYLE 3',
                    align: 'center'
                };
                colors[2] = '#00FF00';
                groups.push('group3');
                count++;
            } else whichGroupExist = 'group3';
            if (nowGroup != 'group3') {
                linedata3 = {
                    categories: years,
                    series: [linechartJson['group4'][0]],
                };
                options[count]['chart']['title'] = {
                    text: 'STYLE 4',
                    align: 'center'
                };
                colors[3] = '#0000FF';
                groups.push('group4');
                count++;
            } else whichGroupExist = 'group4';


            let linedata_existing = {
                categories: years,
                series: [linechartJson['group5'][0]],
            };

            if (count != 3) {
                groups.push('group5');
                // groups.push(nowGroup);
                colors[4] = '#ef19ff';
                colors[nowGroupnum - 1] = 'rgba(36,136,255,0.98)';
                options[count]['chart']['title'] = {
                    text: 'STYLE 5',
                    align: 'center'
                };
                if (whichGroupExist === 'group1') {
                    linedata = linedata_existing;
                } else if (whichGroupExist === 'group3') {
                    linedata2 = linedata_existing;
                } else {
                    linedata3 = linedata_existing;
                }
            } else {
                colors[nowGroupnum - 1] = 'rgba(36,136,255,0.98)';
                // groups.push(nowGroup);
            }


      // let linechart = TuiChart.lineChart(document.getElementById('scatterChart'),linedata,lineChart_options)
            let imagesList1 = flagshipImagesJson[groups[0]];
            let carouselList1 = [];
            for (let i = 0; i < imagesList1.length; i++) {
                let temp = {};
                temp['source'] =
                    '/static/Representative_Images/' + groups[0] + '/' + imagesList1[i];
                carouselList1.push(temp);
            }

            let imagesList2 = flagshipImagesJson[groups[1]];
            let carouselList2 = [];
            for (let i = 0; i < imagesList2.length; i++) {
                let temp = {};
                temp['source'] =
                    '/static/Representative_Images/' + groups[1] + '/' + imagesList2[i];
                carouselList2.push(temp);
            }

            let imagesList3 = flagshipImagesJson[groups[2]];
            let carouselList3 = [];
            for (let i = 0; i < imagesList3.length; i++) {
                let temp = {};
                temp['source'] =
                    '/static/Representative_Images/' + groups[2] + '/' + imagesList3[i];
                carouselList3.push(temp);
            }


            apexChartScatterOptions['options']['colors'] = colors;
            ReactDOM.render(<Chart
                height={900}
                options={apexChartScatterOptions.options}
                series={scatter_group_data_array.series}
                type="scatter"
            />, document.getElementById('scatterChart'))


            ReactDOM.render(<>
                    <GridContainer>
                        <GridItem xs={12} sm={5}>
                            <LineChart
                                style={{textAlign: 'left', width: '90%'}}
                                data={linedata}
                                options={options[0]}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={7}>
                            <p>
                                {imagesList1.map(img => {
                                    return (
                                        <img
                                            key={img}
                                            width={'20%'}
                                            src={'/static/Representative_Images/' + groups[0] + '/' + img}
                                            onClick={toggleModal1}
                                        />
                                    );
                                })}
                                <ModalGateway>
                                    {modal1IsOpen ? (
                                        <Modal onClose={toggleModal1}>
                                            <Carousel views={carouselList1}/>
                                        </Modal>
                                    ) : null}
                                </ModalGateway>
                            </p>
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={5}>
                            <LineChart
                                style={{textAlign: 'left', width: '90%'}}
                                data={linedata2}
                                options={options[1]}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={7}>
                            <p width={'80%'}>
                                {imagesList2.map(img => {
                                    return (
                                        <img
                                            key={img}
                                            width={'20%'}
                                            src={'/static/Representative_Images/' + groups[1] + '/' + img}
                                            onClick={toggleModal2}
                                        />
                                    );
                                })}
                                <ModalGateway>
                                    {modal2IsOpen ? (
                                        <Modal onClose={toggleModal2}>
                                            <Carousel views={carouselList2}/>
                                        </Modal>
                                    ) : null}
                                </ModalGateway>
                            </p>
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={12} sm={5}>
                            <LineChart
                                style={{textAlign: 'left', width: '90%'}}
                                data={linedata3}
                                options={options[2]}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={7}>
                            <p width={'80%'}>
                                {imagesList3.map(img => {
                                    return (
                                        <img
                                            key={img}
                                            width={'20%'}
                                            src={'/static/Representative_Images/' + groups[2] + '/' + img}
                                            onClick={toggleModal3}
                                        />
                                    );
                                })}
                                <ModalGateway>
                                    {modal3IsOpen ? (
                                        <Modal onClose={toggleModal3}>
                                            <Carousel views={carouselList3}/>
                                        </Modal>
                                    ) : null}
                                </ModalGateway>
                            </p>
                        </GridItem>
                    </GridContainer>
                </>
                , document.getElementById('linechartarea'))

        }
    );

    return (
        <GridContainer justify="center">
            <GridItem xs>
                <Card>
                    <CardHeader color="primary">
                        {/*<h4 className={classes.cardTitleWhite}>STYLE MAP</h4>*/}
                        {/*<p className={classes.cardCategoryWhite}>*/}
                        {/*Here is a subtitle for this table*/}
                        {/*</p>*/}
                        <span className={classes.cardCategory}>STYLE MAP</span>
                        <Popup
                            modal
                            style={{
                                zIndex: '99999999 !important',
                            }}
                            trigger={<button>?</button>}
                            position="right center"
                        >
                            {close => <StyleMap close={close}/>}
                        </Popup>
                    </CardHeader>
                    <CardBody id={'scatterChart'}>
                    </CardBody>
                </Card>
            </GridItem>

            <GridItem xs>
                <Card>
                    <CardHeader color="primary">
                        <span className={classes.cardCategory}>TRENDING STYLES</span>
                        <Popup
                            modal
                            style={{
                                zIndex: '99999999 !important',
                            }}
                            trigger={<button>?</button>}
                            position="right center"
                        >
                            {close => <StyleMap close={close}/>}
                        </Popup>
                    </CardHeader>
                    <CardBody id={'linechartarea'}>

                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}


const scatter_options = {
    chart: {
        width: '600',
        height: '1000',
        format: '1,000',
    },
    yAxis: {
        title: 'dim2',
        min: -70,
        max: 60,
    },
    xAxis: {
        min: -60,
        max: 55,
        title: 'dim1',
    },
    series: {
        showLabel: true,
        allowSelect: true,
    },
    tooltip: {
        grouped: true,
        template: function (category, items) {
            return (
                '<div class="tui-chart-default-tooltip">' +
                '<div class="tui-chart-tooltip-head">' +
                items.legend +
                '</div>' +
                '<table class="tui-chart-tooltip-body">' +
                '<tr>' +
                '<td>x</td>' +
                '<td class="tui-chart-tooltip-value">' +
                items.x +
                '</tr>' +
                '<tr>' +
                '<td>y</td>' +
                '<td class="tui-chart-tooltip-value">' +
                items.y +
                '</tr>' +
                '</table>' +
                '</div>'
            );
        },
    },
    legend: {
        showCheckbox: true,
        align: 'bottom',
    },
    plot: {
        hideLine: false,
    },
};

const scatter_group_data = {
    series: [
        {
            name: 'group1',
            data: scatterJson['group1'],
        },
        {
            name: 'group2',
            data: scatterJson['group2'],
        },
        {
            name: 'group3',
            data: scatterJson['group3'],
        },
        {
            name: 'group4',
            data: scatterJson['group4'],
        },
        {
            name: 'group5',
            data: scatterJson['group5'],
        },
        {
            name: 'group6',
            data: scatterJson['group6'],
        },
        {
            name: 'group7',
            data: scatterJson['group7'],
        },
        {
            name: 'group8',
            data: scatterJson['group8'],
        },
        {
            name: 'group9',
            data: scatterJson['group9'],
        },
        {
            name: 'group10',
            data: scatterJson['group10'],
        },
        {
            name: 'group11',
            data: scatterJson['group11'],
        },
        {
            name: 'group12',
            data: scatterJson['group12'],
        },
        {
            name: 'group13',
            data: scatterJson['group13'],
        },
        {
            name: 'group14',
            data: scatterJson['group14'],
        },
        {
            name: 'group15',
            data: scatterJson['group15'],
        },
        {
            name: 'group16',
            data: scatterJson['group16'],
        },
        {
            name: 'group17',
            data: scatterJson['group17'],
        },
        {
            name: 'group18',
            data: scatterJson['group18'],
        },
        {
            name: 'group19',
            data: scatterJson['group19'],
        },
        {
            name: 'group20',
            data: scatterJson['group20'],
        },
        {
            name: 'group21',
            data: scatterJson['group21'],
        },
        {
            name: 'group22',
            data: scatterJson['group22'],
        },
        {
            name: 'group23',
            data: scatterJson['group23'],
        },
        {
            name: 'group24',
            data: scatterJson['group24'],
        },
        {
            name: 'group25',
            data: scatterJson['group25'],
        },
    ],
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
