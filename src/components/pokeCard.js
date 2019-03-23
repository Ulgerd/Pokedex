import React, { Component } from 'react';

class PokeCard extends Component {

  render() {
    let {name, id, imgLink} = this.props;

    return (
      <div
        className="col-sm-6 col-md-4 country-card"
        key={id}
      >
        <div
          className="country-card-container border-gray rounded border mx-2 my-3 d-flex flex-row align-items-center p-0 bg-light">
          <div
            className="h-100 position-relative border-gray border-right px-2 bg-white rounded-left">

            <img
              src = {`${imgLink}${id}.png`}
              format="png"
              className="d-block h-100 s96"
              alt={name}
            />

          </div>
          <div className="px-3">
            <span className="text-dark d-block font-weight-bold">{ name }</span>
          </div>
        </div>
      </div>
    )
  }
}

export default PokeCard;
