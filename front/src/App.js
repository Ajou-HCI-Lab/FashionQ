/* eslint-disable no-unused-vars,no-console,prettier/prettier,jsx-a11y/alt-text */
import React, {Component, PureComponent} from 'react';
import axios from 'axios';

import Popup from 'reactjs-popup';
import LookContent from './views/Dashboard/lookContent.js';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Csrftoken from './csrftoken';
import ReactDOM from 'react-dom';
import ModalImage from "react-modal-image";
import {Tag, Divider, Button} from 'antd';
import 'antd/dist/antd.css';
import {Upload, message} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
// import "billboard.js/dist/theme/insight.css";
// import bb from "billboard.js";
import ReactHtmlParser from 'react-html-parser';
import ReactLoading from 'react-loading';
import 'tui-chart/dist/tui-chart.css';
import {
    ScatterChart as TuiScatter,
    LineChart,
    ColumnChart,
} from '@toast-ui/react-chart';
import scatterJson from './datas_json/group_top_new_100.json';
import linechartJson from './datas_json/trend_by_city';
import flagshipBrandJson from './datas_json/flagship_Brands';
import flagshipImage from './datas_json/flagshipImagesJson';
import Admin from './layouts/Admin';

import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
// @material-ui/icons
import Menu from '@material-ui/icons/Menu';
// core components

// import styles from 'assets/jss/material-dashboard-react/components/headerStyle.js';
import {Steps} from 'antd';

const {Step} = Steps

function importAll(r) {
    return r.keys().map(r);
}

const hist = createBrowserHistory();
var flagstaticImages = {};

// const images =

var listOfImages = [];
let listOfImagesBase64 = [];
let i=0;
class App extends React.Component {
    importAll(r) {
        return r.keys().map(r);
    }

    constructor(props) {
        super(props);

        this.state = {
            file: null,
            htmlcode: null,
        };
        listOfImages = this.importAll(require.context('./datas_json/start_images', false, /\.(png|jpe?g|svg)$/));

    }

    scatterChartRef = React.createRef();


    handleImageChange = e => {
        console.log(e.target.files)
        this.setState({
            file: e.target.files[0],
        });
    };

    handleSubmit = e => {
        ReactDOM.render(
            <div style={{
                width: '50%',
                padding: '20px',
                alignContent: 'center',
                justifyContent: 'center',
                height: '50%',
                position: 'absolute',
                overflow: 'auto',
                top: '0',
                bottom: '0',
                margin: 'auto',
                left: '0',
                right: '0'
            }}>
          <span style={{
              color: '#000000', fontFamily: 'BebasNeue-Bold', fontSize: '60px'
          }}>LOADING</span>
                <ReactLoading type="bars" color="#0000ff"/></div>,
            document.getElementById('root'),
        );
        e.preventDefault();
        console.log(this.state.file)
        let form_data = new FormData();
        form_data.append('file', this.state.file);
        let url = 'fashionq/posts/';
        console.log(form_data);
        axios
            .post(url, form_data, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            })
            .then(res => {
                console.log(this.file);
                ReactDOM.render(
                    <Router history={hist}>
                        <Switch>
                            <Route path="/" component={Admin}/>
                            <Redirect from="/" to="/"/>
                        </Switch>
                    </Router>,
                    document.getElementById('root'),
                );
            })
            .catch(err => console.log(err));
        // ReactDOM.render(
        //     <Route path="/result" component={Admin}/>
        // );
    };

    handleSubmit3 = e => {
        ReactDOM.render(
            <div style={{
                width: '50%',
                padding: '20px',
                alignContent: 'center',
                justifyContent: 'center',
                height: '50%',
                position: 'absolute',
                overflow: 'auto',
                top: '0',
                bottom: '0',
                margin: 'auto',
                left: '0',
                right: '0'
            }}>
          <span style={{
              color: '#000000', fontFamily: 'BebasNeue-Bold', fontSize: '60px'
          }}>LOADING</span>
                <ReactLoading type="bars" color="#0000ff"/></div>,
            document.getElementById('root'),
        );
        console.log(this.state.file)
        let form_data = new FormData();
        form_data.append('file', this.state.file);
        let url = 'fashionq/posts/';
        console.log(form_data);
        axios
            .post(url, form_data, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            })
            .then(res => {
                console.log(this.file);
                ReactDOM.render(
                    <Router history={hist}>
                        <Switch>
                            <Route path="/" component={Admin}/>
                            <Redirect from="/" to="/"/>
                        </Switch>
                    </Router>,
                    document.getElementById('root'),
                );
            })
            .catch(err => console.log(err));
        // ReactDOM.render(
        //     <Route path="/result" component={Admin}/>
        // );
    };

handleSubmit4 = (id) => {
        ReactDOM.render(
            <div style={{
                width: '50%',
                padding: '20px',
                alignContent: 'center',
                justifyContent: 'center',
                height: '50%',
                position: 'absolute',
                overflow: 'auto',
                top: '0',
                bottom: '0',
                margin: 'auto',
                left: '0',
                right: '0'
            }}>
          <span style={{
              color: '#000000', fontFamily: 'BebasNeue-Bold', fontSize: '60px'
          }}>LOADING</span>
                <ReactLoading type="bars" color="#0000ff"/></div>,
            document.getElementById('root'),
        );
        let url = 'fashionq/posts/'+id;
        axios
            .get(url)
            .then(res => {
                ReactDOM.render(
                    <Router history={hist}>
                        <Switch>
                            <Route path="/" component={Admin}/>
                            <Redirect from="/" to="/"/>
                        </Switch>
                    </Router>,
                    document.getElementById('root'),
                );
            })
            .catch(err => console.log(err));
    };


    handleClickButton = e => {
        console.log(e.legend); // 이렇게하면 group3 이런식으로 나
        console.log('이거 클릭됨');
    };

    selectSeries = e => {
        console.log('selectSeries');
        console.log(e);
    };
    onchangeCheckedLegends = e => {
        console.log(this.scatterChartRef.current.getInstance().getScaleOption());
        console.log(e);
        console.log('changeCheckedLegendschartBase');
    };

    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

    toggleDataSeries(e) {
        if (typeof e.dataSeries.visible === 'undefined' || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        this.chart.render();
    }

    // render(){
    //     return(<Router history={hist}>
    //             <Switch>
    //                 <Route path="/" component={Admin} />
    //                 <Redirect from="/" to="/stylecheck"/>
    //             </Switch>
    //         </Router>)
    // }

    toDataURL(src, callback, outputFormat) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function() {
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var dataURL;
            canvas.height = this.naturalHeight;
            canvas.width = this.naturalWidth;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
        };
        img.src = src;
        if (img.complete || img.complete === undefined) {
            img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
            img.src = src;
        }
    }


    convertImgToBase64(url, callback, outputFormat){
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this,0,0);
            var dataURL = canvas.toDataURL(outputFormat || 'image/png');
            callback(dataURL);
            canvas = null;
        };
        img.src = url;
    }

    dataURLtoFile = (dataurl, fileName) => {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], fileName, {type:mime});
    }

    imageClick= e =>{
        
        this.handleSubmit4(e.target.id)
//         let that = this;
//         console.log(img.target.src)
//         this.convertImgToBase64(img.target.src, function (base64) {
//             console.log(base64)
//             var file = that.dataURLtoFile(base64);
//             console.log(file);
//             that.setState({
//                 file:file
//             }, (e) => {
//                 that.handleSubmit3(e)
//             });
//         })
//         console.log("qqq")
    };

    imageView2() {
        let i=0;
        return (
            <div style={{
                textAlign: 'left'
            }}>
                {listOfImages.map(img => {
                    console.log(img);
                    return (
                        <div
                             key={img}
                             style={{width: '20%', display: 'inline-block',}}>
                            <img
                                id={i++}
                                onClick={this.imageClick}
                                width={'100%'}
                                style={{cursor:'pointer'}}
                                src={img}
                            />
                            {/*<input width={'100%'} name="submit" id="submitme" type="image"*/}
                            {/*       src={img}*/}
                            {/*       />*/}
                        </div>
                    );
                })}
            </div>
        )
    }

    render() {
        return (<>
                <div style={{
                    width: '1000px',
                    padding: '20px',
                    alignContent: 'center',
                    justifyContent: 'center',
                    height: '95%',
                    position: 'absolute',
                    overflow: 'auto',
                    top: '0',
                    bottom: '0',
                    margin: 'auto',
                    left: '0',
                    right: '0'
                }} className="App">

                    <div style={{textAlign: 'center'}}>

          <span style={{
              textAlign: 'center',
              color: '#000000', fontFamily: 'BebasNeue-Bold', fontSize: '60px'
          }}>FashionQ Project</span>
                        <div style={{
                            color: '#000000', fontFamily: 'BebasNeue-Bold', fontSize: '30px'
                        }}>you can upload your own image
                        </div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <form onSubmit={this.handleSubmit}>
                            <Csrftoken/>
                            <p>
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/png, image/jpeg"
                                    onChange={this.handleImageChange}
                                    required
                                />
                            </p>
                            <input style={{backgroundColor: '#5241fe', color: '#ffffff', width: '200px'}}
                                   type="submit"/>
                        </form>
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <div style={{
                            color: '#000000', fontFamily: 'BebasNeue-Bold', fontSize: '30px'
                        }}>you can Select these images
                        </div>
                        <div style={{padding: '20px', position: 'initial'}}>{this.imageView2()}</div>
                    </div>
                </div>

            </>
        );
    }
}

const scatter_options = {
    chart: {
        width: 1200,
        height: 500,
        title: {
            text: 'FashionQComponent Map',
            align: 'center',
        },
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
export default App;
