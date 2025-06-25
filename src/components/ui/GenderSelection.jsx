import React from "react";

const GenderSelection = ({ value, onChange, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-2">
        Gender <span className="text-red-500">*</span>
      </label>
      <div className="flex items-center space-x-6">
        <div className="flex items-center">
          <input
            id="gender-male"
            name="gender"
            type="radio"
            value="male"
            checked={value === "male"}
            onChange={() => onChange("male")}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
          />
          <label
            htmlFor="gender-male"
            className="ml-2 block text-sm text-gray-700"
          >
            Male
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="gender-female"
            name="gender"
            type="radio"
            value="female"
            checked={value === "female"}
            onChange={() => onChange("female")}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
          />
          <label
            htmlFor="gender-female"
            className="ml-2 block text-sm text-gray-700"
          >
            Female
          </label>
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default GenderSelection;
