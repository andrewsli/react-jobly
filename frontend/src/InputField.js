import React, { Component } from 'react';

class InputField extends Component {
  constructor(props) {
    super(props)
    this.changeField = this.changeField.bind(this);
  }

  changeField(evt){
    this.props.attributes.handleChange(evt);
  }

  render() {
    const { id, placeholder, value, type, step} = this.props.attributes;
    return (
      <div style={{display: "inline-block"}}>
        <label htmlFor={id}>{`${placeholder}: `}</label>
        <input
          id={id}
          type={type || "text"}
          step={step || undefined}
          name={id}
          value={value}
          onChange={this.changeField}
          placeholder={placeholder} />
      </div>
    )
  }
}

export default InputField;