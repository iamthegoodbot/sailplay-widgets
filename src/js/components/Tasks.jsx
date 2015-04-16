import React from 'react';

import Task from './Task.jsx';

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ppsp-task-list-bl">
        <div className="ppsp-scroll-outer">
          <Task type="vk" text="Вступите в группу ВК" points={15} />
          <Task type="fb" text="Вступите в группу FB" points={15} />
          <Task type="gp" text="Вступите в группу G+" points={15} />
          <Task type="invite" text="Пригласить друга" points={15} />
          <Task type="profile" text="Заполнить профиль" points={15} />
          <Task type="feedback" text="Оставить отзыв" points={15} />
        </div>
      </div>
    );
  }
}
