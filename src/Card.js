import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index : props.index,
      code : props.code,
      image : props.image,
      value : props.value,
      suit : props.suit
    };
  }

  render() {
    return (
      <>
      <img 
        src={this.state.image}
        alt={this.state.code}
        class="img-fluid mx-2"
        style={{ width: '100px', height: 'auto' }}
      />
      </>
    )
  }
}


export default Card;