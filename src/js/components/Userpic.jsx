import React from 'react';

export default class Userpic extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let imagePath = this.props.pic ? this.props.pic : 'dist/img/img-default-s.png'
      , style = {
          backgroundImage: `url(${imagePath})`
        };

    return (
      <div className={this.props.type} style={style}></div>
    );
  }
}
