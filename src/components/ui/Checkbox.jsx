import React from "react";

const Checkbox = ({ id, label, checked, onChange, disabled = false }) => {
  return (
    <div className="flex items-center mb-4">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2 cursor-pointer disabled:cursor-not-allowed"
      />
      <label
        htmlFor={id}
        className="ml-2 text-sm font-medium text-gray-700 cursor-pointer disabled:cursor-not-allowed"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
