import React, { Component } from "react";
import axios from "axios";
import ListPeople from "./components/ListPeople";
import PageInfo from "./components/PageInfo";
import ItemDetail from "./components/ItemDetail";
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
      people: [],
      currentdetail: {
        name: "select a character..."
      }
    };
  }

  getPeople = async () => {
    const current = this.state.pageinfo.current;
    const currentdetail = this.state.currentdetail;
    const response = await axios.get(this.state.pageinfo.current);
    const { count, next, previous, results } = response.data;
    const prevState = this.state;
    prevState.pageinfo.count = count;
    prevState.pageinfo.next = next;
    prevState.pageinfo.previous = previous;
    prevState.pageinfo.current = current;
    prevState.people = results;
    prevState.currentdetail = currentdetail;
    this.setState(prevState);
  };

  getPersonDetail = async p => {
    const prevState = this.state;
    prevState.currentdetail = p;
    console.log("slice: ", p.homeworld.slice(0, 4));
    if (p.homeworld.slice(0, 5) === "https") {
      const response = await axios.get(p.homeworld);
      const { name } = response.data;
      prevState.currentdetail.homeworld = name;
    }
    this.setState(prevState);
  };

  clickNext = () => {
    const nextpage = this.state.pageinfo.next;
    if (nextpage) {
      const prevState = this.state;
      prevState.pageinfo.current = nextpage;
      this.setState(prevState);
      this.getPeople();
    }
  };

  clickPrev = () => {
    const prevpage = this.state.pageinfo.previous;
    if (prevpage) {
      const prevState = this.state;
      prevState.pageinfo.current = prevpage;
      this.setState(prevState);
      this.getPeople();
    }
  };

  componentDidMount() {
    this.getPeople();
  }

  render() {
    const { people } = this.state;
    const { pageinfo } = this.state;
    const { currentdetail } = this.state;

    return (
      <div className="App">
        <div className="container">
          <h1>SWAPI</h1>
          <div>
            <PageInfo
              clickNext={this.clickNext}
              clickPrev={this.clickPrev}
              pageinfo={pageinfo}
            />
          </div>
          <div className="datapanel">
            <ListPeople
              people={people}
              getPersonDetail={this.getPersonDetail}
            />
            <ItemDetail p={currentdetail} className="itemdetail" />
          </div>
        </div>
      </div>
    );
  }
}
