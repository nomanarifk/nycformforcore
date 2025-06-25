import React from "react";
import RadioGroup from "../ui/RadioGroup";

const yesNoOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const EligibilityCheckSection = ({ errors, data, onChange, userRole }) => {

  const update = (field, val) => onChange({ ...data, [field]: val });

  return (
    <div className="space-y-6">
      <RadioGroup
        id="hasAttended"
        label={`Have you previously attended NYC as a ${userRole}?`}
        options={yesNoOptions}
        value={data.hasAttended}
        onChange={(val) => update("hasAttended", val)}
        error={errors?.hasAttended}
        required
      />
      {data.hasAttended === "yes" && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
          <p>Thank you for your interest. As per our guidelines, individuals cannot apply in the same role more than once.
          </p>
          <br />
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-md transition-colors"
          >
            Submit Another Application
          </button>
        </div>
        
      )}
      {data.hasAttended === "no" && (
        <div className="mt-4">
          <p><strong>
            If we find a previous record of your participation as "{userRole}" your submission will be automatically disqualified.
          </strong></p>
        </div>
      )}
    </div>
  );
}

export default EligibilityCheckSection;