import React from "react";

const SelectField = ({
  id,
  label,
  value,
  onChange,
  options,
  error,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="form-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`form-input ${
          error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
        }`}
      >
        {/* <option value="">Select an option</option> */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default SelectField;
