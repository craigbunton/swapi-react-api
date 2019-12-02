import React, { Component } from "react";
import CharInfo from "./CharInfo";

export default class ListPeople extends Component {
  render() {
    const people = this.props.people;

    return (
      <div className="ListPeople">
        {people.map(p => {
          return (
            <div key={p.url}>
              <p className="char-name">{p.name}</p>
              <CharInfo charInfo={p} />
            </div>
          );
        })}
      </div>
    );
  }
}
