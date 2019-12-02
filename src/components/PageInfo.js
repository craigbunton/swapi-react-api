import React, { Component } from "react";

export default class PageInfo extends Component {
  render() {
    const { count, next, previous } = this.props.pageinfo;
    return (
      <div>
        <p>Results: {count}</p>
        {previous ? (
          <button className="btn btn-info" onClick={this.props.clickPrev}>
            Previous
          </button>
        ) : (
          <button className="btn btn-disabled" onClick={this.props.clickPrev}>
            Previous
          </button>
        )}

        {next ? (
          <button className="btn btn-info" onClick={this.props.clickNext}>
            Next
          </button>
        ) : (
          <button className="btn btn-disabled" onClick={this.props.clickNext}>
            Next
          </button>
        )}
        <hr />
      </div>
    );
  }
}
