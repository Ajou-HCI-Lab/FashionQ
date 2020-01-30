// // import React from 'react';
// // import ImageUploader from 'react-media-upload';
// // import logo from './logo.svg';
// // import './App.css';
// // import FormData from 'form-data'
// // import axios from 'axios';
// //
// // class App extends React.Component {
// //
// //     constructor(props) {
// //         super(props);
// //         this.state = {pictures: []};
// //         this.onDrop = this.onDrop.bind(this);
// //     }
// //
// //     onDrop(picture) {
// //         this.setState({
// //             pictures: this.state.pictures.concat(picture),
// //         });
// //         let formData = new FormData();
// //         let photo = document.getElementById("image");
// //         formData.append('image', photo);
// //
// //         // return (dispatch) => {
// //             axios.post("/fashionq/upload", formData, {
// //                 headers: {
// //                     'accept': 'application/json',
// //                     'Accept-Language': 'en-US,en;q=0.8',
// //                     'Content-Type': 'multipart/form-data',
// //                 }
// //             })
// //                 .then((response) => {
// //                     alert('성공')
// //                 }).catch((error) => {
// //                 alert('실패')
// //             });
// //         // };
// //         // return axios.post("/fashionq/upload/", formData).then(res => {
// //         //     alert('성공')
// //         // }).catch(err => {
// //         //     alert('실패')
// //         // })
// //
// //         console.log(picture);
// //     }
// //
// //     render() {
// //         return (
// // <form>
// //   <input type="file" name="image" id="image"/>
// //     <button type="button" onClick={this.onDrop}>dd</button>
// // </form>
// //
// //         );
// //     }
// // }
// //
// // // function App() {
// // //   return (
// // //     <div className="App">
// // //       <header className="App-header">
// // //         <img src={logo} className="App-logo" alt="logo" />
// // //         <p>
// // //           Edit <code>src/App.js</code> and save to reload.
// // //         </p>
// // //         <a
// // //           className="App-link"
// // //           href="https://reactjs.org"
// // //           target="_blank"
// // //           rel="noopener noreferrer"
// // //         >
// // //           Learn React
// // //         </a>
// // //       </header>
// // //     </div>
// // //   );
// // // }
// // // import React, { Component } from 'react'
// // // import axios from 'axios';
// // //
// // // class App extends Component {
// // //   constructor(props){
// // //     super(props);
// // //     this.state = {
// // //       selectedFile: null,
// // //     }
// // //   }
// // //
// // //   handleFileInput(e){
// // //     this.setState({
// // //       selectedFile : e.target.files[0],
// // //     })
// // //   }
// // //
// // //   handlePost(){
// // //     const formData = new FormData();
// // //     formData.append('file', this.state.selectedFile);
// // //
// // //     return axios.post("/fashionq/upload/", formData).then(res => {
// // //       alert('성공')
// // //     }).catch(err => {
// // //       alert('실패')
// // //     })
// // //   }
// // //
// // //   render() {
// // //     return (
// // //       <div>
// // //         <input type="file" name="file" onChange={e => this.handleFileInput(e)}/>
// // //           <button type="button" onClick={this.handlePost()}>제출</button>
// // //       </div>
// // //     )
// // //   }
// // // }
// //
// // export default App;
//
// import React from 'react'
// import axios, {post} from 'axios';
// import Csrftoken from "./csrftoken";
// import ApiService from "./ApiService"
//
// class App extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             file: null
//         }
//         this.onFormSubmit = this.onFormSubmit.bind(this)
//         this.onChange = this.onChange.bind(this)
//         this.fileUpload = this.fileUpload.bind(this)
//     }
//
//     onFormSubmit(e) {
//         e.preventDefault() // Stop form submit
//         this.fileUpload(this.state.file).then((response) => {
//             console.log(response.file);
//         })
//     }
//
//     onChange(e) {
//         this.setState({file: e.target.files[0]})
//     }
//
//     fileUpload(file) {
//         const url = 'http://127.0.0.1:8000/fashionq/upload/';
//         const formData = new FormData();
//         formData.append('file', file)
//         const config = {
//             headers: {
//                 'content-type': 'multipart/form-data'
//             }
//         }
//         return post(url, formData, config)
//         // return axios.post(url, formData, config).then((response) => {
//         //     alert('성공')
//         // }).catch((error) => {
//         //     alert('실패')
//         // });
//     }
//
//     onFileChangeHandler = (e) => {
//         e.preventDefault();
//         let files = e.target.files;
//         this.setState({file: files[0]});
//
//         const formData = new FormData();
//         formData.append('file', this.state.file);
//
//         // ApiService.upload(formData)
//         //     .then(res => {
//         //         console.log(res.data);
//         //     })
//     };
//
//     render() {
//     return (
//       <form action="" encType="multipart/form-data" onSubmit={this.onFormSubmit}>
//         <h1>File Upload</h1>
//           {form}
//         <input type="file" onChange={this.onChange} />
//         <button type="submit">Upload</button>
//       </form>
//    )
//   }
//     // render() {
//     //     return (
//     //         <div className="container">
//     //             <div className="row">
//     //                 <div className="col-md-6">
//     //                     <div className="form-group files color">
//     //                         <label>Upload Your File </label>
//     //                         <form className="form" onSubmit={this.onFormSubmit}>
//     //                             <Csrftoken/>
//     //                             <div>
//     //                                 <input type="file" className="form-control" name="file"
//     //                                        onChange={this.onChange}/>
//     //                                 <button type="submit">Submit</button>
//     //                             </div>
//     //                         </form>
//     //
//     //                     </div>
//     //                 </div>
//     //             </div>
//     //         </div>
//     //     )
//     // }
// }
//
// export default App;
//
// //
// // import React, { Component } from 'react';
// //
// // class App extends Component {
// //   constructor(props){
// //     super(props);
// //     this.state = {
// //       profilePic: null,
// //     };
// //     this.inpuElement = null;
// //     this.handleChange = this.handleChange.bind(this);
// //     this.handleSubmit = this.handleSubmit.bind(this);
// //   }
// //   handleChange(e){
// //     this.setState({profilePic: e.target.files[0]});
// //   }
// //   handleSubmit(){
// //     let formData = new FormData();
// //     formData.append('photo',this.state.profilePic);
// //     fetch('fashionq/upload', {
// //       method: 'POST',
// //       headers: {
// //         Accept: 'application/json, text/plain, */*',
// //         "Content-Type":"multipart/form-data",
// //       },
// //       body:formData,
// //     }).then(res => res.json())
// //       .then((data) => {
// //         console.log(data);
// //       })
// //       .catch(err => console.log(err));
// //   }
// //
// //   render(){
// //       return(
// //         <div>
// //           <input
// //             type="file"
// //             multiple={false}
// //             ref={(input) => { this.inpuElement = input; }}
// //             accept=".jpg,.jpeg,.png"
// //             onChange={this.handleChange}
// //           />
// //           <button onClick={this.handleSubmit}>submit</button>
// //       </div>
// //     );
// //   }
// // }
// // export default App;

import React, { Component } from 'react';
import axios from 'axios';
import Csrftoken from "./csrftoken";

class App extends Component {

  state = {
    file: null
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
    e.preventDefault();
    console.log(this.state);
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
          console.log(res.data);
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
                   accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
          </p>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default App;