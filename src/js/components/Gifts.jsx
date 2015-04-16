import React from 'react';

import Gift from './Gift.jsx';

export default class Gifts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ppsp-deal-list">
        <Gift />
        <Gift />
        <Gift />
        <Gift />
      </div>
    );
  }
}
