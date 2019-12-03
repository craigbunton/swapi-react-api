import React, { Component } from "react";

export class ItemDetail extends Component {
  render() {
    const p = this.props.p;

    return (
      <div className="itemdetail">
        <h2>{p.name}</h2>
        <p>Homeworld: {p.homeworld}</p>
        <p>Gender: {p.gender}</p>
        <p>Species: {p.species}</p>
        <p>Birthyear: {p.birth_year}</p>
        <p>Eye Colour: {p.eye_color}</p>
        <p>Hair Colour: {p.hair_color}</p>
        <p>Skin Colour: {p.skin_color}</p>
        <p>Weight: {p.mass}kg</p>
        <p>Height: {p.height}</p>
        <p>films: {p.films}</p>
        <p>starships: {p.starships}</p>
        <p>vehicles: {p.vehicles}</p>
      </div>
    );
  }
}

export default ItemDetail;
