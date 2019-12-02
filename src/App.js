import React, { Component } from "react";
import axios from "axios";
import ListPeople from "./components/ListPeople";
import PageInfo from "./components/PageInfo";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageinfo: {
        count: 0,
        next: null,
        previous: null,
        current: "https://swapi.co/api/people/?page=1"
      },
      people: []
    };
    this.getPeople = this.getPeople.bind(this);
    this.clickNext = this.clickNext.bind(this);
    this.clickPrev = this.clickPrev.bind(this);
  }

  getPeople() {
    const current = this.state.pageinfo.current;
    return axios.get(this.state.pageinfo.current).then(response => {
      const { count, next, previous, results } = response.data;
      this.setState({
        pageinfo: {
          count: count,
          next: next,
          previous: previous,
          current: current
        },
        people: results
      });
    });
  }

  clickNext() {
    const nextpage = this.state.pageinfo.next;
    if (nextpage) {
      const prevState = this.state;
      prevState.pageinfo.current = nextpage;
      this.setState(prevState);
      this.getPeople();
    }
  }

  clickPrev() {
    const prevpage = this.state.pageinfo.previous;
    if (prevpage) {
      const prevState = this.state;
      prevState.pageinfo.current = prevpage;
      this.setState(prevState);
      this.getPeople();
    }
    // console.log("THIS STATE AFTER CLICKNEXT: ", this.state);
  }

  componentDidMount() {
    this.getPeople();
  }

  // componentDidUpdate() {
  //   this.getPeople();
  // }

  render() {
    const { people } = this.state;
    const { pageinfo } = this.state;
    return (
      <div className="App">
        <div className="container">
          <h1>SWAPI</h1>
          <div>
            <PageInfo
              clickNext={this.clickNext}
              clickPrev={this.clickPrev}
              getPeople={this.getPeople}
              pageinfo={pageinfo}
            />
            <ListPeople people={people} />
          </div>
        </div>
      </div>
    );
  }
}
