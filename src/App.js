let App = require('./App.css');
let { Component } = require('react');
let PropTypes = require('prop-types');
let CKEditor = require('ckeditor4-react');
let queryString = require('query-string');




class TwoWayBinding extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            data: '',
            name: 'default.txt',
            fileId: 'nothing',
            files: [],
            oldData: []
        };
        this.getApiFiles();
    }
    

    onEditorChange = ( evt ) => {
        this.setState({data: evt.editor.getData()});
    }
 
    getApiFiles() {
        fetch('http://localhost:1337/getdocs', { method: 'GET' })
            .then(data => data.json()) // Parsing the data into a JavaScript object
            .then(json => this.setState({files: json.mess})); // Displaying the stringified data in an alert popup
    }

    postApi() {
        fetch('http://localhost:1337/save', {
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

    onSelect = (e) => {
        console.log(e.target.value);
        this.setState({fileId: e.target.value});
        this.setFileAndData(e.target.value);
        this.getApiFiles();
        this.render();
    }
    
    handleClick = () => {
        this.postApi();
        //console.log(this.state.fileId);
        //console.log(this.state.data.replace(/(<([^>]+)>)/gi, ""));
        //console.log(this.state.selectValue);
    }
    
    changeTitle = (e) =>{
        this.setState({name: e.target.value});
    }
    
    render() {
        return (
            <div>
                <CKEditor
                    data={this.state.data}
                    onChange={this.onEditorChange} />
                    <input type="text" value={this.state.name} onChange={this.changeTitle}/>
                    <button onClick={this.handleClick}>
                        Spara
                    </button>
                    <select onChange={this.onSelect}>
                    {this.state.files.map((f) => (
                        <option value={f._id}
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
