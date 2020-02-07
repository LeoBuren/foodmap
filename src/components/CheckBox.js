import React, { Component } from 'react';
import PropTypes from 'prop-types'

class CheckBox extends Component {
    state = {
      isChecked: true,
    }
  
    toggleCheckboxChange = () => {
        const { handleCheckboxChange, label } = this.props;
    
        this.setState(({ isChecked }) => (
          {
            isChecked: !isChecked,
          }
        ));
    
        handleCheckboxChange({[label]: !this.state.isChecked});
      }
    
      render() {
        const { label } = this.props;
        const { isChecked } = this.state;
    
        return (
          <div className="checkbox">
            <label>
              <input
                    type="checkbox"
                    value={label}
                    checked={isChecked}
                    onChange={this.toggleCheckboxChange}
                />
              {label}
            </label>
          </div>
        );
      }
    }
    
    CheckBox.propTypes = {
      label: PropTypes.string.isRequired,
      handleCheckboxChange: PropTypes.func.isRequired,
    };
    
export default CheckBox;