import React from 'react';

export default class Avatar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: props.imagePath,
      title: props.userName
    }
  }

  render() {
    let avatarImage = {
      backgroundImage: this.state.image ? this.state.image : '../img/img-default.png'
    };

    return (
      <div>
        <div className="ppsp-ava" style={avatarImage}></div>
        <div className="ppsp-ava-title">{this.state.title}</div>
      </div>
    );
  }
}
