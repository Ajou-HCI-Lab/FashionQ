/* eslint-disable no-unused-vars,no-console */
import React, { Component, PureComponent } from 'react';
import axios from 'axios';

import Csrftoken from './csrftoken';
import ReactDOM from 'react-dom';
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
import flagshipImage from './flagshipImagesJson';
// import flagshipImageFiles from "./flagship_Images"
// const scatterJson = getJSON("groups.json", function(json){
// });

// function escapeHtml(unsafe) {
//     return unsafe
//          .replace(/&/g, "&amp;")
//          .replace(/</g, "&lt;")
//          .replace(/>/g, "&gt;")
//          .replace(/"/g, "&quot;")
//          .replace(/'/g, "&#039;");
//  }
// const Example = ({type, color}) => (
//     <ReactLoading type={type} color={color} height={667} width={375}/>
// );
function importAll(r) {
  return r.keys().map(r);
}

var flagstaticImages = {};
// const images =

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      htmlcode: null,
    };
  }

  scatterChartRef = React.createRef();

  // handleChange = (e) => {
  //     this.setState({
  //         [e.target.id]: e.target.value
  //     })
  // };

  handleImageChange = e => {
    this.setState({
      file: e.target.files[0],
    });
  };

  handleSubmit = e => {
    ReactDOM.render(
      <ReactLoading type="bars" color="#0000ff" />,
      document.getElementById('root'),
    );
    e.preventDefault();
    // console.log(this.state);
    let form_data = new FormData();
    form_data.append('file', this.state.file);
    // form_data.append('title', this.state.title);
    // form_data.append('content', this.state.content);
    let url = 'fashionq/posts/';

    axios
      .post(url, form_data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then(res => {
        // let temp = escapeHtml(res.datas_json);

        // ReactDOM.render(res.datas_json.split('\n').map(line=> {
        //   return (<span>{line}<br/></span>)
        // }), document.getElementById('root'))
        console.log(res.data);

        const column_data = {
          series: res.data['datas_json'],
        };
        const columns_options = {
          chart: {
            width: 400,
            height: 400,
            title: 'FashionQ Style',
          },
          yAxis: {
            title: 'Attributes',
            min: 0,
            max: 1,
          },
          xAxis: {
            title: 'Month',
          },
          legend: {
            align: 'top',
          },
        };

        const lineChart_options = {
          chart: {
            width: 700,
            height: 400,
            title: 'FashionQ Trend',
          },
          yAxis: {
            title: 'Temperature (Celsius)',
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
            suffix: '°C',
          },
        };

        const group_res = res.data['prediction_df_NMF'];
        const linedata = {
          categories: [
            2010,
            2011,
            2012,
            2013,
            2014,
            2015,
            2016,
            2017,
            2018,
            2019,
          ],
          series: linechartJson[group_res],
        };

        const ColumnChartprops = () => (
          <ColumnChart data={column_data} options={columns_options} />
        );

        console.log(this.state.file.name);
        ReactDOM.render(
          <img
            width="180"
            height={'auto'}
            src={'/static/' + this.state.file.name}
          />,
          document.getElementById('image'),
        );
        ReactDOM.render(
          <LineChart data={linedata} options={lineChart_options} />,
          document.getElementById('linechart'),
        );

        ReactDOM.render(
          <ColumnChart data={column_data} options={columns_options} />,
          document.getElementById('chart-area'),
        );

        ReactDOM.render(
          <TuiScatter
            ref={this.scatterChartRef}
            onChangeCheckedLegends={this.onchangeCheckedLegends}
            data={scatter_group_data}
            options={scatter_options}
            onSelectLegend={this.handleClickButton}
            onSelectSeries={this.selectSeries}
          />,
          document.getElementById('scatter'),
        );

        let groupName = res.data['prediction_df_NMF'];
        var flagshipBrand = flagshipBrandJson[groupName];
        var randomBrand =
          flagshipBrand[Math.floor(Math.random() * flagshipBrand.length)];

        // const randomFile = require("../node_modules/select-random-file")
        // var dir = '/flagship_Images/' + groupName.toString()
        // console.log(dir)
        // var files = flagshipImage[groupName.toString()]
        // console.log(dir + "/" + files[Math.floor(Math.random() * files.length)])
        console.log('./flagship_Images/' + groupName.toString());
        // const files = importAll(require.context('./flagship_Images/'+groupName.toString(), false, /\.(png|jpe?g|svg)$/));

        ReactDOM.render(
          <img
            width="180"
            height={'auto'}
            src={
              flagstaticImages[groupName.toString()][
                Math.floor(
                  Math.random() * flagstaticImages[groupName.toString()].length,
                )
              ]
            }
          />,
          document.getElementById('flagship_image'),
        );

        let groupName_html =
          '<h1>' +
          res.data['prediction_df_NMF'] +
          'brand : ' +
          randomBrand +
          '</h1>';
        ReactDOM.render(
          ReactHtmlParser(groupName_html),
          document.getElementById('root'),
        );

        // ReactDOM.render(<BarChart
        //     width={1000}
        //     height={300}
        //     datas_json={res.datas_json}
        //     margin={{
        //         top: 5, right: 30, left: 20, bottom: 5,
        //     }}
        // >
        //     <CartesianGrid strokeDasharray="3 3"/>
        //     <XAxis font-size="2px" dataKey="name"/>
        //     <YAxis/>
        //     <Tooltip/>
        //     <Legend/>
        //     <Bar dataKey="attribute" fill="#8884d8"/>
        // </BarChart>, document.getElementById("root"));
      })
      .catch(err => console.log(err));
  };

  testee() {
    for (var i = 1; i < 26; i++) {
      var flagshipImages = importAll(
        require.context(
          './flagship_Images/group1',
          false,
          /\.(png|jpe?g|svg)$/,
        ),
      );
      flagstaticImages['group' + i.toString()] = flagshipImages;
    }
  }

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

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <Csrftoken />
          <p>
            <input
              type="file"
              id="image"
              accept="image/png, image/jpeg"
              onChange={this.handleImageChange}
              required
            />
          </p>
          <input type="submit" />
        </form>
        <div id="dataframe" />
        <div>{this.testee()}</div>
      </div>
    );
  }
}

const scatter_options = {
  chart: {
    width: 1200,
    height: 500,
    title: {
      text: 'FashionQ Map',
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
    template: function(category, items) {
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
