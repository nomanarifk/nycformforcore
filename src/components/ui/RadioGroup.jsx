import React from "react";

const RadioGroup = ({
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
      <label className="form-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2 space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${id}-${option.value}`}
              type="radio"
              name={id}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <label
              htmlFor={`${id}-${option.value}`}
              className="ml-3 block text-sm text-gray-700"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};
export default RadioGroup;
