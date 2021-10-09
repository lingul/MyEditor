import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React, { Component } from "react";
import Register from './Register';
import {
    Redirect,
    Link,
} from "react-router-dom";

let queryString = require('query-string');

class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {
          email: "",
          password: "",
          msg: "",
          redirect: false
        };
    }

    submitHandler = (event) => {
        event.preventDefault();
        const url = 'http://localhost:1337/login/';


        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: this.state.email, password: this.state.password})
        })
            .then(response => response.json())
            .then(data => {
                if (data.data) {
                    this.props.onToken(data.data.token);
                    this.setState({ msg: 'Login successful', redirect: true});
                } else if (data.errors) {
                    console.log("DATA", data)
                    this.setState({ msg: data.errors.detail });
                }
            })
            .catch((error) => {
                console.log("CATCH", error)
                this.setState({ msg: error.details });
            });
    };

    changeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value})
    };

    render() {
        if (this.state.redirect) {
            this.props.history.push('/');
            return null;
        }
        return (
            <main>
              <h2>Logga In</h2>
              <p>{this.state.msg}</p>
              <form onSubmit={this.submitHandler}>
                  <label>Enter email </label>
                  <br/>
                  <input
                      type='text'
                      name='email'
                      required
                      onChange={this.changeHandler}
                      autoComplete='username'
                  />
                  <br/>
                  <label>Enter Password </label>
                  <br/>
                  <input
                      type='password'
                      name='password'
                      required
                      onChange={this.changeHandler}
                      autoComplete='current-password'
                  />
                  <br/>
                  <input
                      type='submit'
                  />
              </form>
            </main>
        );
    }
}

export default Login;
