import React from 'react';

export default class MainMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    let classString = `ppsp-nav-item type-${this.props.menuType}`;

    this.props.isActive && (classString += ' type-active');

    return (
      <a
        href="#"
        className={classString}
        onClick={e => { e.preventDefault() }}>
        {this.props.menuText}
      </a>
    );
  }
}
