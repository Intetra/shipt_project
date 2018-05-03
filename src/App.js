import React, {Component} from 'react';
import './App.css';
import logo from './static/img/shipt-logo.svg';
import badge0 from './static/img/badge0.png';
import badge1 from './static/img/badge1.png';
import badge2 from './static/img/badge2.png';
var api = require('./utils/api')

function CreditBar() {
    return (
      <div className="credit-bar">
        GET $50 + $15 CREDIT*
      </div>
    )
}

function SignUpBar() {
    return (
      <div className='sign-up-bar'>
        <img
          className='sign-up-bar-img'
          src={logo}
          alt='Shipt Logo'/>
        <div
            className={["btn", "sign-up-bar-button"].join(' ')}
            onClick={null}>
            <p>SIGN UP</p>
          </div>
      </div>
    )
}

class InputBoxHolder extends Component {
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
        stores: 'THIS ZIPCODE IS INVALID! PLEASE TRY AGAIN.',
        error: true});
      event.preventDefault();
      }
    }
    componentDidUpdate() {
      this.scrollToBottom();
    }
    scrollToBottom() {
      this.el.scrollIntoView({ behavior: 'smooth' });
    }
    render() {
      return (
        <div>
          <div className="input-div">
            <div className="input-div-paragraph">
              <p className="idp-1">Target exclusive offer.</p>
              <p className="idp-2">$49 membership (reg. $99) + $15 credit with qualifying purchase.*</p>
            </div>
            <div className="input-box-holder">
              <form onSubmit={this.handleSubmit}>
                  <input
                    className="input-box"
                    type="text"
                    placeholder="Enter ZIP code"
                    style={this.state.error ? { color: '#d0021b' }: null}
                    value={this.state.value}
                    onChange={this.handleChange}/>
                <input
                  className={["btn", "input-button"].join(' ')}
                  type="submit"
                  value="GET STARTED"/>
              </form>
            </div>
            <div className="input-div-paragraph-2">
              <p className="idp2-1">*Membership offer valid for new members only. Target order of $100 or more must be placed to qualify for $15 credit, which expires 30 days after qualifying order is placed and can be applied to any order from Shipt.</p>
              </div>
          </div>
          <div ref={el => { this.el = el; }} />
          <StoreGrid stores={this.state.stores} error={this.state.error}/>
          </div>
      )
    }
}

function StoreGrid(props) {
  if (Array.isArray(props.stores)) {
    var stores = props.stores.sort((a, b) => a.name > b.name)
    return (
      <div className='store-grid'>
      <ul className='store-list'>
        {
          stores.map(function(store, index) {
            var q = new Date();
            var m = q.getMonth();
            var d = q.getDay();
            var y = q.getFullYear();
            var date = new Date(y, m, d);
            var formatted_date = store.launch_date.slice(0, 10).replace(/-/g, "/")
            var store_date = new Date(formatted_date);

            return (
                <li className='store' key={store.name}>
                  <h2>{store.name}</h2>
                  <br/>
                  <p className='store-date'>
                    {
                      date > store_date
                        ? 'Available Now'
                        : 'Coming ' + formatted_date.slice(5, 10)
                    }
                  </p>
                  <hr className="store-hr"/>
                </li>)
          })
        }
      </ul>
      <div
        className={["btn", "grid-button"].join(' ')}
        onClick={null}>
        GET STARTED
      </div>
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

function InfoPane() {
  var strings = [
    'Scroll through the aisles.',
    'Our shoppers work their magic.',
    'We deliver your groceries.'];
  var subStrings = [
    'Create an order from your local store in our app or on our website.',
    'Connect with your shopper and get live updates from the aisles.',
    'Schedule a delivery, and your order will arrive in as soon as 1 hour.'];
  var badgePics = [badge0, badge1, badge2]
    return (
      <div className='info-pane'>
        <p className='info-pane-top-paragraph'>
          Everything you love about Target at your fingertips.
        </p>
        <ul className='info-badges-holder'>
        {
          strings.map(function(store, index) {
            return (
              <li key={'badge' + index} className='info-badge'>
                  <img className='info-badge-img' src={badgePics[index]} alt=''/>
                  <div className='info-badge-paragraph'>
                    <p className='info-badge-string'>{strings[index]}</p>
                    <p className='info-badge-subString'>{subStrings[index]}</p>
                  </div>
              </li>
            )
          })
        }
        </ul>
        <div
          className={["btn", "info-pane-button"].join(' ')}
          onClick={null}>
          GET STARTED
        </div>
      </div>
    )
}

function Footer() {
    return (
      <div className="footer-bar">
        © 2018 Shipt, Inc. and its services are not necessarily affiliated or endorsed by the retailers on this site.
      </div>
    )
}

class App extends Component {
  render() {
    return (
      <div className="container">

        <CreditBar />
        <SignUpBar />
        <InputBoxHolder />
        <InfoPane />
        <Footer />
        
      </div>);
  }
}

export default App;
