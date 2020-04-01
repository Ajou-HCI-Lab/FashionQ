import React, { Component } from 'react';
import axios from 'axios';
import Csrftoken from './csrftoken';

class DataFrame extends Component {
  state = {
    file: null,
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleImageChange = e => {
    this.setState({
      file: e.target.files[0],
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
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
        console.log(res.data);
        this.render()();
      })
      .catch(err => console.log(err));
  };

  render() {
    return <div className="DataFrame">Hello</div>;
  }
}

export default DataFrame;
