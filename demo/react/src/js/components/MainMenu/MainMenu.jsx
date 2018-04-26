import React, { Component } from 'react';

import MainMenuItem from './MainMenuItem.jsx'

export default class MainMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let curr = this.props.active;

    return (
      <div className="ppsp-nav">
        <MainMenuItem type="gift" text="Подарки" isActive={curr === 'gift'} /> <
         MainMenuItem type="task" text="Задания" isActive={curr === 'task'} /> <
         MainMenuItem type="lider" text="Лидерборд" isActive={curr === 'lider'} /> <
         MainMenuItem type="feedback" text="Отзывы" isActive={curr === 'feedback'} />
      </div>
    );
  }
}
