import React from "react";

const TextField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="form-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`form-input ${
          error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
        }`}
        maxLength={70}
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default TextField;
