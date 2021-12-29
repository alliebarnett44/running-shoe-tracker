import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = { shoeData: [] };
  }

  componentDidMount() {
    fetch("http://localhost:6060/shoes")
      .then(res => res.json())
      .then(
        (response) => {
          this.setState({
            shoeData: response.result
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
      <div className="App">
        <table>
          <tr>
            <th>User Name</th>
            <th>Shoe Brand</th>
            <th>Mileage</th>
            <th>Condition</th>
            <th>Shoe Age (Months)</th>
          </tr>
          {this.state.shoeData.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.userName}</td>
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

export default App;
