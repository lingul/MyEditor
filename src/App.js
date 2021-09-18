let App = require('./App.css');
let { Component } = require('react');
let PropTypes = require('prop-types');
let CKEditor = require('ckeditor4-react');
let queryString = require('query-string');




class TwoWayBinding extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            data: 'test2',
            name: 'default.txt',
            files: [],
            oldData: []
        };
        
    }
    
    componentDidMount() {
        this.getApiFiles();
    }

    onEditorChange = ( evt ) => {
        this.setState({data: evt.editor.getData()});
    }
 
    async getApiFiles() {
        return fetch('http://localhost:1337/getdocs', { method: 'GET' })
            .then(data => data.json()) // Parsing the data into a JavaScript object
            .then(json => this.setState({files: json.mess})); // Displaying the stringified data in an alert popup
    }

    async postApi() {
        return fetch('http://localhost:1337/save', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'}, // this line is important, if this content-type is not set it wont work
            body: queryString.stringify({filename:this.state.name, data:this.state.data}) //use the stringify object of the queryString class
        });
    }

    async getApiFileData(idToData) {
        let myURL = 'http://localhost:1337/getdata?id=' + idToData;
        await fetch(myURL, { method: 'GET' })
            .then(data => data.json()) // Parsing the data into a JavaScript object
            .then(json => this.setState({oldData: json.mess}));
        }

    async setFileAndData(e) {
        await this.getApiFileData(e);
        {this.state.oldData.map((f) => (
            this.setState({data: f.data}),
            this.setState({name: f.filename})
            )) 
        }
    }

    async reloadFile(fileName) {
        //console.log(fileName);
        await this.setFileAndData(fileName);
        //await this.getApiFiles();
    }

    onSelect(e) {
        console.log(this);
        this.reloadFile(e.target.value);
    }
    
    async handleClick() {
        await this.postApi();
        await this.getApiFiles();
    }
    
    changeTitle(e){
        this.setState({name: e.target.value});
    }
    
    render() {
        return (
            <div>
                <CKEditor
                    data={this.state.data}
                    onChange={this.onEditorChange} />
                    <input type="text" id="text-input" value={this.state.name} onChange={(e) => this.changeTitle(e)}/>
                    <button id="submit-button" onClick={(e) => this.handleClick(e)}>
                        Spara
                    </button>
                    <select id="file-select" onChange={(e) => this.onSelect(e)}>
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

export default TwoWayBinding;
