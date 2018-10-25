import React, { Component } from "react";

class DataTable extends Component {
  render() {
    const { data } = this.props;

    return (
      <table>
        <tr>
          <td>Id</td>
          <td>FirstName</td>
          <td>LastName</td>
          <td>Age</td>
        </tr>
        {
          data.map((el) => (
            <tr key={el.id}>
              <td>{el.id}</td>
              <td>{el.name}</td>
              <td>{el.surname}</td>
              <td>{el.age}</td>
            </tr>
          ))
        }
      </table>
    );
  }
}

export default DataTable;
