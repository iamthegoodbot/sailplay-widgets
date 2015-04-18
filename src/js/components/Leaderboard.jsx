import React from 'react';

import LeaderboardStore from '../stores/LeaderboardStore.js';
import Leader from './Leader.jsx';
import Empty from './Empty.jsx';

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboard: LeaderboardStore.leaderboard
    }
  }

  componentDidMount() {
    LeaderboardStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    LeaderboardStore.removeChangeListener(this._onChange.bind(this));
  }

  render() {
    return (
      <div className="ppsp-scroll-outer">
        {this._getView.call(this)}
      </div>
    );
  }

  _onChange() {
    this.setState({ leaderboard: LeaderboardStore.leaderboard });
  }

  _getView() {
    let leaderboard = this.state.leaderboard;

    if (leaderboard) {
      let members = leaderboard.members.members;

      return members.map(member =>
          <Leader key={member.rank} position={member.rank} name={member.full_name} points={member.score} />
      );
    } else {
      return <Empty title="У нас пока что нет лидеров :(" text="Зарегистрируйтесь и станьте первым!" />;
    }
  }
}
