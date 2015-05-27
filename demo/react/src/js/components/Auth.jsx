import React, { Component } from 'react';

import ApiService from '../services/ApiService.js';
import Auth from '../services/AuthService.js';
import NavActions from '../actions/NavActions.js';

import Button from './Button.jsx';

export default class Register extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let node = React.findDOMNode(this.refs.authFrame);

    ApiService.loginRemote({
        node
      , params: {
          background: 'transparent'
        , partner_info: 0
      }
    }, this.props.loadActions);
  }

  render() {
    let styleAuth = {
          display: this.props.show ? 'block' : 'none'
        , height: '100%'
        }
      , styleFrame = {
          width: 400
        , height: 430
        };

    return (
      <div style={styleAuth} className="ppsp-enter-bl">
        <div className="ppsp-base-content">
          <iframe
            ref="authFrame"
            style={styleFrame}
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
      </div>
    );
  }
}
