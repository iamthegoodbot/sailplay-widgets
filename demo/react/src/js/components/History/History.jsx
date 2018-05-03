import React, { Component } from 'react';

import HistoryStore from '../../stores/HistoryStore.js';
import HistoryItem from './HistoryItem.jsx';

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = { history: HistoryStore.history }
  }

  componentDidMount() {
    HistoryStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    HistoryStore.removeChangeListener(this._onChange.bind(this));
  }

  render() {
    let getHumanDate = (dateStr) => {
      let date = new Date(dateStr)
        , day = date.getDate()
        , month = date.getMonth() + 1;

      return `${ day < 10 ? '0' + day : day }.${ month < 10 ? '0' + month : month }.${ date.getFullYear() }`
    };

    let history = this.state.history
      , content = history ? history.map((entry, key) =>
          <HistoryItem
            key={key}
            text={entry.name}
            date={getHumanDate(entry.action_date)}
            points={entry.points_delta > 0 ? `+${entry.points_delta}` : entry.points_delta}
          />
        ) : null;

    return (
      <div className="ppsp-point-bl">
        <div className="ppsp-scroll-outer">
          {content}
        </div>
      </div>
    );
  }

  _onChange() {
    this.setState({ history: HistoryStore.history });
  }
}
