import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"; 
import './index.css';
import Login from './login-component/Login';
import UserInfo from './user-info-component/UserInfo';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <div>
    <Route exact path="/">
      <Redirect to="/login" /> 
    </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route path="/user-info">
        <UserInfo />
      </Route>
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
