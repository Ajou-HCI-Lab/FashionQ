import React, {Component} from 'react';
import axios from 'axios';
import Csrftoken from "./csrftoken";
import ReactDOM from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
import ReactLoading from 'react-loading';

// function escapeHtml(unsafe) {
//     return unsafe
//          .replace(/&/g, "&amp;")
//          .replace(/</g, "&lt;")
//          .replace(/>/g, "&gt;")
//          .replace(/"/g, "&quot;")
//          .replace(/'/g, "&#039;");
//  }
const Example = ({type, color}) => (
    <ReactLoading type={type} color={color} height={667} width={375}/>
);


class App extends Component {


    state = {
        file: null,
        htmlcode: null,
    };


    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleImageChange = (e) => {
        this.setState({
            file: e.target.files[0]
        })
    };


    handleSubmit = (e) => {
        ReactDOM.render(
            <ReactLoading type="bars" color="#0000ff"/>, document.getElementById("root"));
        e.preventDefault();
        // console.log(this.state);
        let form_data = new FormData();
        form_data.append('file', this.state.file);
        // form_data.append('title', this.state.title);
        // form_data.append('content', this.state.content);
        let url = 'fashionq/posts/';

        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => {
                // console.log(res.data);
                // let temp = escapeHtml(res.data);

                // ReactDOM.render(res.data.split('\n').map(line=> {
                //   return (<span>{line}<br/></span>)
                // }), document.getElementById('root'))
                ReactDOM.render(ReactHtmlParser(res.data), document.getElementById("root"));
                // ReactDOM.render(res.data,document.getElementById('root'))

            })
            .catch(err => console.log(err))
    };


    render() {
        return (
            <div className="App">
                <form onSubmit={this.handleSubmit}>
                    <Csrftoken/>
                    <p>
                        <input type="file"
                               id="image"
                               accept="image/png, image/jpeg" onChange={this.handleImageChange} required/>
                    </p>
                    <input type="submit"/>
                </form>
                <div id="dataframe"/>
            </div>
        );
    }
}

export default App;