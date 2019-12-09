import React, { Component } from "react";

export class Films extends Component {
  render() {
    const f = this.props.f;
    console.log("filmlist: ", this.props);
    return (
      <div className="filmlist">
        <h2>Films</h2>
        <ul>{f}</ul>
      </div>
    );
  }
}

export default Films;
