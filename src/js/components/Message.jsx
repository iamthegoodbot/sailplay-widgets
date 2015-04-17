import React from 'react';

export default class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);

    return (
      <div className={`ppsp-alert-bl ${this.props.show ? '' : 'hidden'}`}>
        {this.props.text}
      </div>
    );
  }
}
