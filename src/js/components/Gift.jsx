import React from 'react';

import NavActions from '../actions/NavActions.js';
import Button from './Button.jsx';

export default class Gift extends React.Component {
  constructor(props) {
    super(props);
  }

  getGift() {
    if (!this.props.isAuth) {
      return NavActions.navigate('register');
    }

    console.log(this.props.isAuth, this.props.id);
  }

  render() {
    let style = {
      backgroundImage: `url(${this.props.image})`
    };

    return (
      <div className="ppsp-deal-item">
        <div className="ppsp-deal-item-img" style={style}></div>
        <div className="ppsp-deal-item-content">
          <div className="ppsp-deal-title">{this.props.title}</div>
          <span className="ppsp-deal-price">{`${this.props.points} олдиков`}</span>
          <span className="ppsp-deal-text">{this.props.text}</span>
          <Button
            title="Получить"
            classMod="ppsp-blue-btn ppsp-deal-btn type-small type-active"
            onClick={this.getGift.bind(this)}
          />
        </div>
      </div>
    );
  }
}
