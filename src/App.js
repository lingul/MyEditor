import { BrowserRouter, Switch, Route, Router, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import { createBrowserHistory } from 'history';
const ENDPOINT = require("./config");
let App = require('./App.css');
let { Component } = require('react');
let PropTypes = require('prop-types');
let { CKEditor } = require('@ckeditor/ckeditor5-react');
let ClassicEditor = require('@ckeditor/ckeditor5-build-classic');
let queryString = require('query-string');
let currentRoom = null;
//import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
//import React, { useState } from "react"

//Socket
let io = require('socket.io-client');
//const ENDPOINT = "https://jsramverk-editor-ligm19.azurewebsites.net";
//const ENDPOINT = "http://localhost:1337";
const socket = io(ENDPOINT);
const history = createBrowserHistory();

class TwoWayBinding extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            data: '',
            name: '',
            files: [],
            oldData: [],
            prevData: '',
            checkbox: false,
            token: ''
        };
        socket.on('created', ({data, filename}) => {
            this.setState({data, name: filename, prevData: data});
        });
        socket.on("updated", (data) => {
            this.setState({data, prevData: data});
        })
    }

    onEditorChange = ( evt, editor ) => {
        this.setState({data: editor.getData()});
        if(this.state.prevData !== editor.getData()) {
            currentRoom && socket.emit("update", currentRoom, editor.getData());
        }
    }
 
    async getApiFiles() {
        return fetch(ENDPOINT + '/getdocs', { method: 'GET', headers: {'Authorization': `Bearer ${this.state.token}`}})
            .then(data => data.json()) // Parsing the data into a JavaScript object
            .then(json => this.setState({files: json.mess})); // Displaying the stringified data in an alert popup
    }

    async postApi() {
        return fetch(ENDPOINT + '/save', {
            method: 'POST',
            headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${this.state.token}`}, // this line is important, if this content-type is not set it wont work
            body: JSON.stringify({filename:this.state.name, data:this.state.data, group:this.state.checkbox})
        });
    }

    async getApiFileData(idToData) {
        let myURL = ENDPOINT + '/getdata?id=' + idToData;
        await fetch(myURL, { method: 'GET', headers: {'Authorization': `Bearer ${this.state.token}`}})
            .then(data => data.json()) // Parsing the data into a JavaScript object
            .then(json => this.setState({oldData: json.mess}));
        }

    async setFileAndData(e) {
        await this.getApiFileData(e);
        console.log(this.state.oldData);
        this.state.oldData.map((f) => this.setState({data: f.data, name: f.filename}));
    }

    async reloadFile(fileName) {
        await this.setFileAndData(fileName);
    }

    onSelect(e) {
        if(e.currentTarget.value) {
            if(currentRoom) {
                socket.emit("leave", currentRoom);
            }
            socket.emit("create", e.currentTarget.value);
            currentRoom = e.currentTarget.value;
        }
        //Changed to websocket instead of rest.
        //this.reloadFile(e.target.value);
    }

    handleCheckBox(e) {
        if(this.state.checkbox) {
            this.state.checkbox = false;
        }
        else {
            this.state.checkbox = true;
        }
    }
    
    async handleClick() {
        await this.postApi();
        await this.getApiFiles();
    }
    
    changeTitle(e){
        this.setState({name: e.target.value});
    }
    
    render() {
        if(!this.state.token) {
            return(
                <div>
                    <h1>Logga in här</h1>
                    <BrowserRouter history={history}>
                        <Link to='/login'>Logga in</Link>
                        <Route
                            exact path='/login'
                            render={
                                (props) => (<Login {...props} onToken={(token) => {
                                    this.setState({token: token})
                                    socket.emit('auth', token)
                                    this.getApiFiles();
                                }} />)
                                //Same as above -> function onToken(token){this.setState({token:token})}
                            }
                        />
                    <h1>Registrera dig här</h1>
                        <Link to='/register'>Registrera</Link>
                        <Route exact path='/register' component={Register} />
                    </BrowserRouter>
                </div>
            );
        }
        else {
        return (
            <div>
                <CKEditor editor={ClassicEditor}
                    data={this.state.data}
                    onChange={this.onEditorChange} />
                    <input type="checkbox" id="access" name="accept" value="yes" onClick={(e) => this.handleCheckBox(e)}/>Hemligt dokument?
                    <br />
                    <input type="text" id="text-input" value={this.state.name} onChange={(e) => this.changeTitle(e)}/>
                    <button id="submit-button" onClick={(e) => this.handleClick(e)}>
                        Skapa
                    </button>
                    <select id="file-select" onChange={(e) => this.onSelect(e)}>
                    <option key={'nothing'} value={undefined}
                        >{"--Välj en fil--"}
                    </option>
                    {this.state.files.map((f) => (
                        <option key={f._id} value={f._id}
                        >{f.filename}
                        </option>
                        )) 
                    }
                    </select>
            </div>
        );
        }
    }
    }

export default TwoWayBinding;
/*
if(!this.state.login) {
    return(
        <div>
            <h1>Logga in här</h1>
            <BrowserRouter>
                <a href='/login'>Logga in</a>
                <Route path='/login' component={Login} />
            </BrowserRouter>
            <h1>Registrera dig här</h1>
            <BrowserRouter>
                <a href='/register'>Registrera</a>
                <Route path='/register' component={Register} />
            </BrowserRouter>
        </div>
    );
}
else {
    */