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
    let azArr = [];

    data.map((val, i) => {
        for(const key in val) {
            if (val.hasOwnProperty(key)) {
                if(arr[key] === undefined) {
                    arr[key] = [];
                }
                if(azArr[i] === undefined) {
                  azArr[i] = [];
                }
                if(arr[key][i] === undefined) {
                    arr[key][i] = [];
                }

                azArr[i].push(val[key]);
                arr[key][i].push(val[key]);
            }
        }
    })


    let newArr = [];
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ".split("");

    //flattening & sorting alphabetically
    for(let i = 0; i < azArr.length; i++) {
      azArr[i] = azArr[i].flat().sort();
      alphabet.forEach(letter => {
        if(newArr[letter] === undefined) {
          newArr[letter] = [];
        }
        if(newArr[letter][i] === undefined) {
          newArr[letter][i] = [];
        }

        azArr[i].forEach(val => {
          if(val[0].toUpperCase() === letter) {
            newArr[letter][i].push(val);
          }
        });

        newArr[letter][i] = [newArr[letter][i]];
        
        // checks and removes empty arrays
        if(i === azArr.length-1) {
          if(this.checkIfEmpty(newArr[letter])) {
            delete newArr[letter];
          }
        }

      });
    }

    this.setState({data: [arr, newArr]});
  }

  checkIfEmpty = data => {
    return !(data.some(val => {
        return val[0].length !== 0;
    }));
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