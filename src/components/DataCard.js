import React, { Component } from 'react'

class DataCard extends Component {
    constructor(props){
        super(props);
        this.state={
            active: true
        }
    }

    componentDidMount() {
        /*
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
        */
    }

    handleClick = e => {
        e.preventDefault();
        if(e.target === e.currentTarget) {
            this.setState({active: !this.state.active});
        }

        
    }

    render(){
        return(
            <div className="data-card-dropdown" onClick={e => this.handleClick(e)}>
                <div>
                    <p>{this.props.name}</p>
                    {this.state.active?<i className="material-icons">expand_more</i>:<i className="material-icons active">expand_more</i>}
                    {this.state.active?<i className="material-icons active">expand_less</i>:<i className="material-icons">expand_less</i>}
                </div>
                {this.state.active?
                    (<ul className="data-card-container">
                        {this.props.data.map((kategori, i) => {
                            if(i === 0 && kategori[0].length) {
                                return <li key={kategori}>
                                    {kategori.map(data => data.map(val => <p key={val} style={{ color: 'green' }}>{val}</p>))}
                                </li>
                            }else if(i === 1 && kategori[0].length) {
                                return <li key={kategori}>
                                    {kategori.map(data => data.map(val => <p key={val} style={{ color: 'orange' }}>{val}</p>))}
                                </li>
                            }else if(i === 2 && kategori[0].length) {
                                return <li key={kategori}>
                                    {kategori.map(data => data.map(val => <p key={val} style={{ color: 'red' }}>{val}</p>))}
                                </li>
                            }
                        })}
                    </ul>):''}
            </div>
            
        );
    }
}

export default DataCard;