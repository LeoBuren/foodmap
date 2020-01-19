import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from '../components/Search'
import DataCard from '../components/DataCard'

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state={
            searchVal: "",
            azSort: true
        }
      }

      componentDidMount() {
        const menu = document.body.getElementsByClassName("menu")[0];
        const asideNav = document.getElementById("asideNav");
    
        asideNav.addEventListener('click', e => {
            if(e.target === asideNav) {
                menu.classList.remove("active");
                asideNav.classList.remove("active");
            }
        });
    
        menu.addEventListener('click', () => {
            menu.classList.add("active");
            asideNav.classList.add("active");
        });
    }

    

    renderDataCards = () => {
        let cardArray = [];
        if(this.state.searchVal) {
            for(const key in this.props.data[1]) {
                if(this.props.data[1].hasOwnProperty(key) && this.state.searchVal[0].toUpperCase() === key) {
                    cardArray.push(<DataCard name={key} key={key} data={this.props.data[1][key]}/>);
                }
            }
        } else if(!this.state.azSort) {
            for(const key in this.props.data[1]) {
                if(this.props.data[1].hasOwnProperty(key)) {
                    cardArray.push(<DataCard name={key} key={key} data={this.props.data[1][key]}/>);
                }
            }
        }else {
            for(const key in this.props.data[0]) {
                if (this.props.data[0].hasOwnProperty(key)) {
                    cardArray.push(<DataCard name={key} key={key} data={this.props.data[0][key]}/>);
                }
            }
        }

        return cardArray;
    }

    handleSearch = val => this.setState({searchVal: val});
    render() {
        return (
            <div id="index">
                <aside>
                    <header><div className="logo"><i className="material-icons"> fastfood </i></div><div className="menu">
                                <i className="material-icons"> menu </i>
                            </div></header>
                    <nav id="asideNav">
                        <ul>
                            <li>
                                <Link to="/rooms">
                                    <div>
                                        <i className="material-icons"> restore_from_trash </i>
                                        <p>Återställ objekt</p>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/settings">
                                    <div>
                                        <i className="material-icons"> settings </i>
                                        <p>Inställningar</p>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <Search searchFunc={this.handleSearch} />
                <main>
                    {this.renderDataCards()}
                </main>
            </div>
        );
    }
}

export default HomePage;