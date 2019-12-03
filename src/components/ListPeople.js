import React, { Component } from "react";

export default class ListPeople extends Component {
  render() {
    const people = this.props.people;
    const getPersonDetail = this.props.getPersonDetail;

    return (
      <ul key="p.url" className="listpeople">
        {people.map(p => (
          <li>
            <button
              className="listbtn"
              href="/"
              onClick={() => getPersonDetail(p)}
            >
              {p.name}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
