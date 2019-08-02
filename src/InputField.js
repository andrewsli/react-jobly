import React, { Component } from 'react';

class InputField extends Component {
  static defaultProps = {
    type: "text"
  }
  //this.props = {htmlFor, id, LabelName, name, type, value, onChange,placeholder}
  constructor(props) {
    super(props)
    this.state = {
    }
    this.changeField = this.changeField.bind(this);
  }

  changeField(evt){
    this.props.handleChange(evt);
  }

  render() {
    const { id, placeholder, value, type} = this.props;

    return (
      <div>
        <label htmlFor={id}>{`${placeholder}: `}</label>
        <input
          id={id}
          type={type}
          name={id}
          value={value}
          onChange={this.changeField}
          placeholder={placeholder} />
      </div>
    )
  }
}

export default InputField;