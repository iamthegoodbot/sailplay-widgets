import React from 'react';

export default class Mini extends React.Component {
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
        , right: -3
        , width: 73
        , margin: '-65px 0 0'
        , padding: '5px 8px 5px 5px'
        , border: '3px solid #F55B00'
        , borderRadius: 5
        , color: '#FFFFFF'
        , textAlign: 'center'
        , font: 'bold 10px/14px Arial, sans-serif'
        , background: '#F55B00'
        , overflow: 'hidden'
        , zIndex: 99994
        }
      , btnStyle = {
          width: 70
        , height: 26
        , padding: 0
        , margin: '3px auto 0'
        , border: 0
        , borderRadius: 2
        , fontSize: 9
        , background: '#FFFFFF'
        , outline: 'none'
        };

    return (
      <div style={miniStyle}>
        <div className="capslocked-text">УЗНАЙТЕ, СКОЛЬКО У ВАС БОНУСНЫХ БАЛЛОВ </div>
        <button style={btnStyle} onClick={this.handler.bind(this)}>Участвовать</button>
      </div>
    );
  }
}
