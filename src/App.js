import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RoomPage from './pages/RoomPage'

class App extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    fetch('./data.json', {
      headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
    })
    .then((response) => response.json())
    .then(data => {
        this.handleData(data);
    });
  }

  handleData = data => {
    let arr = [];
    data.map((val, i) => {
        for(const key in val) {
            if (val.hasOwnProperty(key)) {
                if(arr[key] === undefined) {
                    arr[key] = [];
                }
                if(arr[key][i] === undefined) {
                    arr[key][i] = [];
                }

                arr[key][i].push(val[key]);
            }
        }
    })

    this.setState({data: arr});
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={(props) => <HomePage data={this.state.data} {...props} />}/>
        <Route path={`/foodId`} render={(props) => <RoomPage data={this.state.data} {...props} />} />
        <Route render={(props) => <HomePage data={this.state.data} {...props} />}/>
      </Switch>
    );
  }
}

export default App;