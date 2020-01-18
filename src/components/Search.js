import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            submittedVal: ''
        };
        
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({submittedVal: this.state.value.toUpperCase()});
    }

    handleChange = e => {
        this.setState({value: e.target.value});
        this.props.searchFunc(e.target.value);
    }

    getRoomList(){
        return (
            
            this.state.rooms.map(room =>{
                if(this.state.query === ''){
                    return "";
                } else if(room.name.startsWith(this.state.query.toUpperCase())){
                    this.props.searchFunc(room.name);
                }   
                return "";
            }
            ))
    }

    renderRedirect = () => {
        if (this.state.submittedVal) {
          return <Redirect to={`/rooms/${this.state.submittedVal}`} />
        }
    }

    render(){
        return(
            <nav id="searchbar">
                {this.renderRedirect()}
                <div><i className="material-icons"> search </i></div>
                <form onSubmit={this.handleSubmit}>
                    <input id="searchInput" type="search" placeholder="Sök efter mat" onChange={this.handleChange} />
                </form>
            </nav>
        );
    }
}

export default Search;

