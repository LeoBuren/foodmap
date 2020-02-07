import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from '../components/Search';
import DataCard from '../components/DataCard';
import emptyStateImage from '../emptyState.svg';
import CheckBox from '../components/CheckBox';

const items = [
    'Fas 1',
    'Fas 2',
    'Fas 3',
];

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state={
            searchVal: "",
            azSort: false,
            checkBoxes: items.reduce((o, key) => ({ ...o, [key]: true}), {})
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
            if(menu.classList.contains("active")) {
                menu.classList.remove("active");
                asideNav.classList.remove("active");
            }else {
                menu.classList.add("active");
                asideNav.classList.add("active");    
            }
        });
    }


    

    renderSearchCard = data => {
        for(const key in this.props.data[1]) {
            if(this.props.data[1].hasOwnProperty(key) && this.state.searchVal[0] === key) {
                let arr = [];
                for(let i=0; i<this.props.data[1][key].length; i++) {
                    arr[i] = [];
                    if(!this.checkIfEmpty(this.props.data[1][key][i])) {
                        this.props.data[1][key][i][0].filter(val => 
                            val.includes(this.state.searchVal)).map(val =>
                                arr[i].push(val)
                        );
                    }
                    arr[i] = [arr[i]];
                }

                return this.checkIfEmpty(arr)?
                <div className="emptyStateContainer">
                    <img src={emptyStateImage} alt="No results found, an illustration featuring a female painter and a blank canvas"></img>
                    <div className="text-container">
                        <p>"{this.state.searchVal}" hittades inte</p>
                    </div>
                </div>:
                    <DataCard name={this.state.searchVal} key={this.state.searchVal} data={arr}/>;
            }
        }
    }

    formatString = string => string!==''?string[0].toUpperCase() + string.slice(1).toLowerCase():'';

    createCheckboxes = () => items.map(this.createCheckbox);
    createCheckbox = label =>
        (<CheckBox
          label={label}
          handleCheckboxChange={this.toggleCheckbox}
          key={label}
        />)
    toggleCheckbox = data => {
        for(var key in data) {
            this.setState(() => ({
                checkBoxes: {
                    ...this.state.checkBoxes,
                    [key]: data[key]
                }
            }));
        }
    }

    checkIfEmpty = data => {
        if(data[0].length) {
            return !(data.some(val => {
                return val[0].length !== 0;
            }));
        }
        
        return true;
    }

    filterData = data => {
        let arr = data.slice();
        for(const key in this.state.checkBoxes) {
            if (this.state.checkBoxes.hasOwnProperty(key)) {
                let index = Object.keys(this.state.checkBoxes).indexOf(key);

                if(!this.state.checkBoxes[key]) {
                    delete arr[index];
                }
            }
        }

        return arr;
    }

    renderDataCards = () => {
        let cardArray = [];
        
        if(this.state.searchVal) {
            return this.renderSearchCard();
        } else if(this.state.azSort) {
            for(const key in this.props.data[1]) {
                if(this.props.data[1].hasOwnProperty(key)) {
                    cardArray.push(<DataCard name={key} key={key} data={this.filterData(this.props.data[1][key])}/>);
                }
            }
        }else {
            for(const key in this.props.data[0]) {
                if (this.props.data[0].hasOwnProperty(key)) {
                    cardArray.push(<DataCard name={key} key={key} data={this.filterData(this.props.data[0][key])}/>);
                }
            }
        }

        return cardArray;
    }

    handleClick = () => this.setState({azSort: !this.state.azSort});
    handleSearch = val => this.setState({searchVal: this.formatString(val)});
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
                            <li>
                                {this.state.azSort?
                                    <div onClick={this.handleClick}>
                                        <i className="material-icons"> sort </i>
                                        <p>Sortera kategori</p>
                                    </div>
                                    :
                                    <div onClick={this.handleClick}>
                                        <i className="material-icons"> sort_by_alpha </i>
                                        <p>Sortera bokstavsordning</p>
                                    </div>
                                }
                            </li>
                            <li className="checkboxContainer">
                                {this.createCheckboxes()}
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