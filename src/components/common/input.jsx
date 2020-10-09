import React from "react";

const Input = ({ error, name, label, value, onChange, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}> {label} </label>
      <input
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type={type}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
