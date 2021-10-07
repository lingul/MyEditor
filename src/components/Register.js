import React, { Component } from "react";
import {
  Redirect,
  Link,
} from "react-router-dom";
let queryString = require('query-string');
const url = require("../config");
const ENDPOINT = url + "/register"

class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            redirect: null };
    }

    async registerUser() {
        await fetch(ENDPOINT, {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'}, // this line is important, if this content-type is not set it wont work
            body: queryString.stringify({email: this.state.email, password: this.state.password})
        });
        console.log("I gerister");
                
/*
        fetch(ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('success, ', data);
                    //creates a redirect to login site
                    this.setState({ redirect: '/login'});
                })
                .catch((error) => {
                    console.error('Error: ', error);
                });*/
    };
    async submitHandler(e) {
        console.log("Innan");
        await this.registerUser();
        console.log("Efter");

    };

    changeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value})
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <main>
                <h3>Registrera dig</h3>
                <form onSubmit={(e) => this.submitHandler(e)}>
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
                    <label>Enter Password (minimum 8 characters)</label>
                    <br/>
                    <input
                        type='password'
                        name='password'
                        required
                        onChange={this.changeHandler}
                        minLength='8'
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



export default Register;