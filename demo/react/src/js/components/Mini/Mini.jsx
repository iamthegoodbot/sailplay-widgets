import React, { Component } from 'react';

const staticPath = 'http://sailplay.cdnvideo.ru/static/partners/sailplay-widgets/demo/react/dist/';

export default class Mini extends Component {
  constructor(props) {
    super(props);
  }

  handler(e) {
    e.preventDefault();

    this.props.onClick();
  }

  render() {
    let miniStyle = {
          position: 'fixed'
        , top: '50%'
        , right: 0
        , width: 104
        , height: 180
        , margin: '-90px 0 0'
        , backgroundImage: `url(${staticPath}/img/mini${this.props.isAuth ? '_auth' : ''}.png)`
        , overflow: 'hidden'
        , cursor: 'pointer'
        , zIndex: 99994
      }
      , miniPoints = {
          position: 'absolute'
        , top: '50%'
        , right: 0
        , width: 97
        , textAlign: 'center'
        , color: '#efe813'
        , font: '33px Arial, sans-serif'
        , textShadow: '#0c446e 0 -1px'
      }
      , points = this.props.user ? this.props.user.user_points.total : '';

    return (
      <div className="mini" style={miniStyle} onClick={this.handler.bind(this)}>
        <div className="mini__points" style={miniPoints}>{points}</div>
      </div>
    );
  }
}
