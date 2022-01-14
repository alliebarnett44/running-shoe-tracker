import React from "react";
import "./Home.css";
import { useLocation } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { runnerRecord: {} };
  }

  componentDidMount() {

    fetch(`http://localhost:6060/shoes/${this.props.location.email}`)
      .then(res => res.json())
      .then(
        (response) => {
          this.setState({
            runnerRecord: response.runnerRecord
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    return (
      <div className="Home">
        <table>
          <tr>
            <th>User Name</th>
            <th>Shoe Brand</th>
            <th>Mileage</th>
            <th>Condition</th>
            <th>Shoe Age (Months)</th>
          </tr>
          {this.state.runnerRecord.shoe_records.map((val, key) => {
            return (
              <tr key={key}>
                <td>{this.state.runnerRecord.first_name}</td>
                <td>{val.shoeBrand}</td>
                <td>{val.mileage}</td>
                <td>{val.condition}</td>
                <td>{val.shoeAge}</td>
              </tr>
            )
          })}
        </table>
      </div>
    );
  }
}

export default Home;