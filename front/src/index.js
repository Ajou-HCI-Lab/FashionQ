/* eslint-disable prettier/prettier,no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import Admin from './layouts/Admin.js';
import { createBrowserHistory } from 'history';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RTL from './layouts/RTL.js';

const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path="/result" component={Admin}/>
            <App/>
            <Redirect from="/" to="/" />
        </Switch>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createBrowserHistory } from 'history';
// import { Router, Route, Switch, Redirect } from 'react-router-dom';
// import App from './App';
//
// // core components
// import Admin from './layouts/Admin.js';
//
// import './assets/css/material-dashboard-react.css?v=1.8.0';
//
// const hist = createBrowserHistory();
//
//
// ReactDOM.render(
//   <Router history={hist}>
//     <Switch>
//       <Route path="/result" component={Admin} />
//       <Route path="/rtl" component={RTL} />
//       <Redirect from="/" to="/result/maps" />
//     </Switch>
//   </Router>,
//   document.getElementById('root'),
// );
