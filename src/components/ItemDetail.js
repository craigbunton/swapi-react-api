import React, { Component } from "react";

export class ItemDetail extends Component {
  render() {
    console.log("This props in itemdetail: ", this.props);
    const p = this.props.p;

    return (
      <div className="itemdetail">
        <h2>{p.name}</h2>
        <p>Homeworld: {p.homeworld}</p>
        <p>Gender: {p.gender}</p>
        <p>Birthyear: {p.birth_year}</p>
        <p>Eye Colour: {p.eye_color}</p>
        <p>Hair Colour: {p.hair_color}</p>
        <p>Skin Colour: {p.skin_color}</p>
        <p>Weight: {p.mass}kg</p>
      </div>
    );
  }
}

export default ItemDetail;
