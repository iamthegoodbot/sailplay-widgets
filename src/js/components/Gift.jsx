import React from 'react';

export default class Gift extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let style = {
      backgroundImage: 'url(../img/img-sample2.png)'
    };

    return (
      <div className="ppsp-deal-item">
        <div className="ppsp-deal-item-img" style={style}></div>
        <div className="ppsp-deal-item-content">
          <div className="ppsp-deal-title">
            Скидка 500 рублей
          </div>

            <span className="ppsp-deal-price">
               450 олдиков
            </span>

            <span className="ppsp-deal-text">
                Купон на скидку 500 руб. при оформлении покупки на сумму от 700 руб.
            </span>

            <span className="ppsp-blue-btn ppsp-deal-btn type-small type-active" href="#">
                Получить
            </span>
        </div>
      </div>
    );
  }
}
