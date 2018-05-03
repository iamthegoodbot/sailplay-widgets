import React, { Component } from 'react';

import ApiService from '../services/ApiService.js';
import NavActions from '../actions/NavActions.js';
import GiftStore from '../stores/GiftStore.js';
import Button from './Button.jsx';

let onError = err => console.error(err.message);

export default class GiftContent extends Component {
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

  render() {
    let gift = this.state.gift
      , imageStyle = {
          backgroundImage: `url(${gift.image})`
        };

    return (
      <div className="ppsp-deal-detail">
        <div className="ppsp-deal-card">
          <div className="ppsp-card-img" style={imageStyle}></div>
          <div className="ppsp-card-content">
            <div className="ppsp-card-head">
              <div className="ppsp-card-points">{`${gift.points} олдиков`}</div>
              <div className="ppsp-card-title">{gift.title}</div>
            </div>
            <div className="ppsp-card-content-inner" dangerouslySetInnerHTML={{__html: gift.text}} />
            <Button
              title="Получить"
              classMod="ppsp-blue-btn type-active ppsp-card-btn"
              onClick={ApiService.giftPurchase.bind(ApiService, gift.id)}
            />
          </div>
        </div>
        <Button
          title="< Назад"
          classMod="ppsp-grey-btn ppsp-deal-card-btn"
          onClick={NavActions.back}
        />
      </div>
    );
  }

  _onChange() {
    this.setState({ gift: GiftStore.gift });
  }
}
