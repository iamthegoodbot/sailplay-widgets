import React from 'react';

import MainMenuItem from './MainMenuItem.jsx'

export default class MainMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ppsp-nav">
        <MainMenuItem menuType="gift" menuText="Подарки" isActive={true} /> <
         MainMenuItem menuType="task" menuText="Задания" /> <
         MainMenuItem menuType="lider" menuText="Лидерборд" /> <
         MainMenuItem menuType="feedback" menuText="Отзывы" />
      </div>
    );
  }
}
