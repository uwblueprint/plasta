import React, { Component } from 'react';
import { Form, Text } from 'react-form';
import "./LoginPage.css";

class LoginPage extends Component {
  render() { 
    return(
      <div id="div-wrapper">
        <Form 
        onSubmit={submittedValues => this.setState({ submittedValues })}
        render={({submitForm}) => ( 
          <form onSubmit={submitForm} className= "login-page">
            <h1 className="title">Plastics For Change</h1>
            <div className="input-block">
              <label className="block" htmlFor="username">Username</label>  
              <Text className="block input-field" field="username" id="username"/> 
            </div>
            <div className="input-block">
              <label className="block" htmlFor="password">Password</label>
              <Text className="block input-field" field="password" type="password" id="password"/>
            </div>
            <div className="btn">
              <button type="submit">
                LOGIN
              </button>
            </div>
          </form>
          )} 
        />
      </div>
    );
  }
}

export default LoginPage;
