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
    let members = this.state.leaderboard.members.members
      , list = members.map(member =>
        <Leader position={member.rank} name={member.full_name} points={member.score} />
      );

    return this.props.isAuth ?
      list :
      <Empty title="У нас пока что нет лидеров :(" text="Зарегистрируйтесь и станьте первым!" />;
  }
}
