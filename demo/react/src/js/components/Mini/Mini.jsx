import React from 'react';

export default class Mini extends React.Component {
  constructor(props) {
    super(props);
  }

  handler(e) {
    e.preventDefault();

    this.props.onClick();
  }

  render() {
    return (
      <div>
        <div className="capslocked-text">УЗНАЙТЕ, СКОЛЬКО У ВАС БОНУСНЫХ БАЛЛОВ </div>
        <button onClick={this.handler.bind(this)}>Участвовать</button>
      </div>
    );
  }
}
