import React from 'react';

import Leader from './Leader.jsx';
import Empty from './Empty.jsx';

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ppsp-scroll-outer">
        {this._getView()}
      </div>
    );
  }

  _getView() {
    let list = [];

    for (let i = 1; i <= 10; i++) {
      list.push(<Leader position={i} name="andrew.q@yandex.ru" points={9000} avatar="img/image-sample.png" />)
    }

    return this.props.isAuth ?
      list :
      <Empty title="У нас пока что нет лидеров :(" text="Зарегистрируйтесь и станьте первым!" />;
  }
}
