import React, { Component } from 'react'

class Data_card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            submittedVal: ''
        };
        
    }

    handleChange = e => {
        this.setState({value: e.target.value});
        this.props.searchFunc(e.target.value);
    }

    render(){
        console.log(this.props.data);
        return(
            <ul className="data-card-container">
                {this.props.data.map(val => (<li key={val}>
                    <p>{val}</p>
                </li> ))}
                
            </ul>
        );
    }
}

export default Data_card;