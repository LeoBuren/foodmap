import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Search from '../components/Search'
import { Redirect } from 'react-router-dom'

class RoomPage extends Component {
    componentDidMount() {
        const dropdownList = document.getElementById("data-card-dropdown");
        const dropdownMore = document.getElementById("dropdown-more");
        const dropdownLess = document.getElementById("dropdown-less");

        dropdownList.addEventListener('click', e => {
            if(e.target === dropdownList) {
                if(dropdownList.classList.contains("active")) {
                    dropdownList.classList.remove("active");
                    dropdownMore.classList.add("active");
                    dropdownLess.classList.remove("active");
                }else {
                    dropdownList.classList.add("active");
                    dropdownMore.classList.remove("active");
                    dropdownLess.classList.add("active");
                }
            }
        });
    }

    handleSearch = val => this.setState({searchVal: val});

    checkIfExists = () => {
        if((this.state.rooms.length !== 0)) {
            let bool = false;
            this.state.rooms.map((val, key) => (val.name === this.props.match.params.roomId)?bool=true:false);

            if(!bool) {
                alert("Error: Rummet finns inte");
                return <Redirect to={`/rooms/`} />;
            }
        }
    }

    render() {
        return (
            
            <div id="room">
            {this.checkIfExists()}
            <header>
                  <Link to="/">
                    <div className="logo"><i className="material-icons"> landscape </i></div>
                  </Link>
                  <div className="menu">
                      <i className="material-icons"> menu </i>
                  </div>
            </header>
            <Search searchFunc={this.handleSearch} />
            
              
              <main>
              </main>
          </div>
  )
}
}

export default RoomPage;