import React from 'react';

import NavActions from '../../actions/NavActions.js';
import GiftActions from '../../actions/GiftActions.js';

import Button from '../Button.jsx';

export default class Gift extends React.Component {
  constructor(props) {
    super(props);
  }

  getGift(available) {
    if (!this.props.isAuth) {
      return NavActions.navigate('auth');
    }

    if (!available) {
      return false;
    }

    GiftActions.giftSelected(this.props);
    NavActions.navigate('gift_detail');
  }

  render() {
    let isAvailable = this.props.userPoints >= this.props.points
      , pointsDelta = this.props.points - this.props.userPoints
      , btnClass = `ppsp-blue-btn ppsp-deal-btn type-small ${isAvailable ? 'type-active' : 'type-disabled'}`
      , btnText = isAvailable ? 'Получить': `Ещё ${pointsDelta} баллов`
      , style = {
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
            title={btnText}
            classMod={btnClass}
            onClick={this.getGift.bind(this, isAvailable)}
          />
        </div>
      </div>
    );
  }
}
