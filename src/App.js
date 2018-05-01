import React, {Component} from 'react';
import './App.css';
var api = require('./utils/api')

function StoreGrid(props) {
  console.log(props)
  if (Array.isArray(props.stores)) {
    return (
      <div className='store-grid'>
      <ul className='store-list'>
        {
          props.stores.map(function(store, index) {
            var q = new Date();
            var m = q.getMonth();
            var d = q.getDay();
            var y = q.getFullYear();
            var date = new Date(y, m, d);
            var formatted_date = store.launch_date.slice(0, 10).replace(/-/g, "/")
            var store_date = new Date(formatted_date);

            return (<li className='store' key={store.name}>
              <h2>{store.name}</h2>
              <br/>
              <h3>
                {
                  date > store_date
                    ? 'Available Now'
                    : 'Coming ' + formatted_date.slice(5, 10)
                }
              </h3>
            </li>)
          })
        }
      </ul>
    </div>)
  }
  else {
    return (
      <p
        className="store-grid-string"
        style={props.error ? { color: '#d0021b' }: null}
        >
        {props.stores}
      </p>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedZip: null,
      stores: null,
      error: false
    };
    this.updateZip = this.updateZip.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  updateZip(zip) {
    this.setState(function() {
      return {
        selectedZip: zip,
        stores: null,
        error: false}
    });

    api.fetchStores(zip).then(function(response) {
      this.setState(function() {
        return {
            stores: response
        }
      })
    }.bind(this));
  }
  handleChange(event) {
    this.setState({selectedZip: event.target.value});
  }
  handleSubmit(event) {
    var zip = this.state.selectedZip;

    if (zip.length === 5 && !isNaN(zip)) {
      this.updateZip(this.state.selectedZip)
      event.preventDefault();
    }
    else {
    this.setState({
      stores: 'THIS ZIPCODE IS INVALID! PLEASE TRY AGAIN',
      error: true});
    event.preventDefault();
    }
  }
  render() {
    return (
      <div className="container">
      <h1>Shipt Project</h1>
      <form onSubmit={this.handleSubmit}>
          <input
            className="input-box"
            type="text"
            placeholder="Enter ZIP code"
            style={this.state.error ? { color: '#d0021b' }: null}
            value={this.state.value}
            onChange={this.handleChange}/>
        <input type="submit" value="Submit"/>
      </form>

      <StoreGrid stores={this.state.stores} error={this.state.error}/>

    </div>);

  }
}

export default App;
