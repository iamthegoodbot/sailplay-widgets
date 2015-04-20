import React from 'react';

export default class CloseBtn extends React.Component {
  constructor(props) {
    super(props);
    this.closeAction = props.closeAction
  }

  render() {
    return (
      <a
        className="ppsp-close"
        onClick={e => { e.preventDefault(); this.closeAction(); }}
        href="#">
      </a>
    )
  }
}