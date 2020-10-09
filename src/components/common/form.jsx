import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  handleChange = ({ currentTarget }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(currentTarget);
    if (errorMessage) {
      errors[currentTarget.name] = errorMessage;
    } else delete errors[currentTarget.name];

    let data = { ...this.state.data };
    data[currentTarget.name] = currentTarget.value;
    this.setState({ data, errors });
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = this.validate();
    this.setState({ errors: errors || {} });
    this.doSubmit();
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  renderInput(name, label, type = "text") {
    return (
      <Input
        name={name}
        label={label}
        onChange={this.handleChange}
        value={this.state.data[name]}
        error={this.state.errors[name]}
        type={type}
      />
    );
  }

  renderSelect(name, label, options) {
    return (
      <Select
        name={name}
        options={options}
        label={label}
        onChange={this.handleChange}
        value={this.state.data[name]}
        error={this.state.errors[name]}
      />
    );
  }
}

export default Form;
