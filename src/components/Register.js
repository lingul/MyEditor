import React, { Component } from "react";
import {
  Redirect,
  Link,
} from "react-router-dom";
let queryString = require('query-string');
const url = require("../config");
const ENDPOINT = url + "/register";

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
            headers: {'Content-Type':'application/json'}, // this line is important, if this content-type is not set it wont work
            body: JSON.stringify({email: this.state.email, password: this.state.password})
        });

    };
    async submitHandler(e) {
        await this.registerUser();
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
                    <label>Email </label>
                    <br/>
                    <input
                        type='text'
                        name='email'
                        required
                        onChange={this.changeHandler}
                        autoComplete='username'
                    />
                    <br/>
                    <label>Lösenord (minimum 8)</label>
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