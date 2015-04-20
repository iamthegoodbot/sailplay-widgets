import React from 'react';

export default class Avatar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: props.path,
      title: props.title
    }
  }

  render() {
    let imagePath = this.state.image ? this.state.image : 'dist/img/img-default.png'
      , style = {
          backgroundImage: `url(${imagePath})`
        };

    return (
      <div>
        <div className="ppsp-ava" style={style}></div>
        <div className="ppsp-ava-title">{this.state.title}</div>
      </div>
    );
  }
}
