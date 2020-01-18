import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from '../components/Search'
import Data_card from '../components/Data_card'

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state={
            searchVal: ""
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
        return <Data_card data={this.props.data}/>
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