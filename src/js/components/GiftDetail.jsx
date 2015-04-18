import React from 'react';

import SailplayService from '../services/SailplayService.js';
import NavActions from '../actions/NavActions.js';
import MessageActions from '../actions/MessageActions.js';
import GiftStore from '../stores/GiftStore.js';
import Button from './Button.jsx';

export default class GiftContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gift: GiftStore.gift
    };
  }

  componentDidMount() {
    GiftStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    GiftStore.removeChangeListener(this._onChange.bind(this));
  }

  getGift(id) {
    SailplayService.giftPurchase(id)
      .then(
        () => { MessageActions.showMessage('Поздравляем, вы приобрели подарок! Проверьте почту.') },
        err => { console.error(err.message) }
      );
  }

  render() {
    let gift = this.state.gift
      , imageStyle = {
          backgroundImage: `url(${gift.image})`
        };

    let back = () => { NavActions.navigate('gift') };

    return (
      <div className="ppsp-deal-detail">
        <div className="ppsp-deal-card">
          <div className="ppsp-card-img" style={imageStyle}></div>
          <div className="ppsp-card-content">
            <div className="ppsp-card-head">
              <div className="ppsp-card-points">{`${gift.points} олдиков`}</div>
              <div className="ppsp-card-title">{gift.title}</div>
            </div>
            <div className="ppsp-card-content-inner">{gift.text}</div>
            <Button
              title="Получить"
              classMod="ppsp-blue-btn type-active ppsp-card-btn"
              onClick={this.getGift.bind(this, gift.id)}
            />
          </div>
        </div>
        <Button
          title="< Назад"
          classMod="ppsp-grey-btn ppsp-deal-card-btn"
          onClick={back}
        />
      </div>
    );
  }

  _onChange() {
    this.setState({ gift: GiftStore.gift });
  }
}
