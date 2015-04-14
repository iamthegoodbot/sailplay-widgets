import React from 'react';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  handler(e) {
    e.preventDefault();

    this.props.onClick();
  }

  render() {
    let classString = `ppsp-btn ${this.props.classMod}`;

    return (
      <a href="#" className={classString} onClick={this.handler.bind(this)}>
        {this.props.title}
      </a>
    );
  }
}
