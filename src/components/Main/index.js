import React, { Component } from "react";
import DataTable from "../DataTable";
import DataService from "../../services/DataService";
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";


/**
 * @description Class representing a container for filters.
 * @extends Component
 */
class Main extends Component {
  constructor() {
    super();

    this.handleData = this.handleData.bind(this);
    this.query = this.query.bind(this);

    this.searchFieldRef = React.createRef();
    this.selectRef = React.createRef();

    this.state = {
      data: [],
      selectedAge: "",
      searchValue: ""
    };
  }
  
  componentDidMount() {
    this.subscription = DataService.fetchedData.subscribe(this.handleData);
    DataService.getDataFromServer();

    fromEvent(this.selectRef.current, "change")
      .pipe(
        map(e => {
          this.setState({ selectedAge: e.target.value });
          return e.target.value;
        })
      )
      .subscribe(() => DataService.getDataFromServer(this.query()));

    fromEvent(this.searchFieldRef.current, "input")
      .pipe(
        map(e => {
          this.setState({ searchValue: e.target.value });
          return e.target.value;
        }),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(() => {
        DataService.getDataFromServer(this.query());
      });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }
  
  /**
   * @description Gives query string that needs
   *  to be passed to the main url
   * @return string string
   */
  query() {
    const name = this.state.searchValue.trim(),
      age = this.state.selectedAge;
    
    if (name !== "" && age !== "" && !isNaN(age)) {
      return `name=${name}&age=${age}`;
    } else if (name !== "" && (age === "" || isNaN(age))) {
      return `name=${name}`;
    } else if (age !== "" && !isNaN(age)) {
      return `age=${age}`;
    } else {
      return "";
    }
  }
  
  /**
   * @description Handles data change
   */
  handleData(data) {
    this.setState({ data: data });
  }

  render() {
    const { data } = this.state;

    return (
      <div style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}>
      <div>
        <input type="text" ref={this.searchFieldRef} placeholder="Search" />
        <select ref={this.selectRef}>
          <option value="age">Age</option>
          <option value="18">18</option>
          <option value="25">25</option>
          <option value="41">41</option>
          <option value="42">42</option>
        </select>
      </div>
        <DataTable data={data} />
      </div>
    );
  }
}

export default Main;
