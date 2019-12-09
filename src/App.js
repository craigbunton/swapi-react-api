import React, { Component } from "react";
import axios from "axios";
import ListPeople from "./components/ListPeople";
import PageInfo from "./components/PageInfo";
import ItemDetail from "./components/ItemDetail";
import Films from "./components/Films";
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
    //
    if (p.films[0].slice(0, 5) === "https") {
      let promises = [];
      p.films.map(async film => {
        axios.get(film).then(res => {
          promises.push(<li key={res.data.title}>{res.data.title}</li>);
        });
      });

      prevState.currentdetail.filmlist = promises;
    }
    //

    if (p.homeworld.slice(0, 5) === "https") {
      const response = await axios.get(p.homeworld);
      const { name } = response.data;
      prevState.currentdetail.homeworld = name;
    }
    //
    //
    if (p.species[0].slice(0, 5) === "https") {
      const response = await axios.get(p.species[0]);
      const { name } = response.data;
      prevState.currentdetail.species = name;
    }
    //

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
    const { filmlist } = this.state.currentdetail;

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
            <ItemDetail p={currentdetail} />
            <Films f={filmlist} />
          </div>
        </div>
      </div>
    );
  }
}
