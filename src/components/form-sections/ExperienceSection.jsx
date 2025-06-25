import React from "react";
import TextField from "../ui/TextField";
import RadioGroup from "../ui/RadioGroup";
import SelectField from "../ui/SelectField";
import { PlusCircle, Trash2, Award } from "lucide-react";

const CAMP_OPTIONS = [
  { value: "", label: "Select Program" },
  { value: "PUI", label: "PUI - Programme on Understanding Islam" },
  { value: "MNYC", label: "MNYC - Misbah National Youth Camp" },
  { value: "NYC", label: "NYC - National Youth Camp" },
  { value: "GE", label: "GE - Global Encounters " },
  { value: "Rang", label: "Rang" },
  { value: "HDT", label: "Heritage Discovery Tour" },
];

const YearSelect = ({
  label,
  value,
  onChange,
  error,
  startYear = 2025,
  endYear = 1990,
  includePresent = false, // ← new prop
}) => {
  const years = [];
  if (includePresent) {
    years.push("Present");
  }
  for (let year = startYear; year >= endYear; year--) {
    years.push(year.toString());
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        value={value || ""}
        onChange={onChange}
        className={`w-full rounded-md border ${
          error ? "border-red-500" : "border-gray-300"
        } py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
      >
        <option value="">Select Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default function ExperienceSection({ data, errors, onChange }) {
  // Ensure data structure exists with defaults to avoid potential errors
  const safeData = {
    voluntaryList: Array.isArray(data.voluntaryList) ? data.voluntaryList : [],
    campDetails: Array.isArray(data.campDetails) ? data.campDetails : [],
    participatedInCamp: data.participatedInCamp || "",
    ...data,
  };

  const update = (field, val) => onChange({ ...safeData, [field]: val });

  const updateArrayItem = (arrayField, idx, key, val) => {
    const list = [...safeData[arrayField]];
    if (!list[idx]) list[idx] = {};
    list[idx][key] = val;
    update(arrayField, list);
  };

  const addArrayItem = (arrayField, blankItem) => {
    const list = [...safeData[arrayField], blankItem];
    update(arrayField, list);
  };

  const removeArrayItem = (arrayField, idx) => {
    const list = safeData[arrayField].filter((_, i) => i !== idx);
    update(arrayField, list);
  };

  // Modified validation - only check completeness if ANY field has content
  const isEntryStarted = (entry, fields) => {
    if (!entry) return false;
    return fields.some((field) => entry[field] && entry[field].trim() !== "");
  };

  // Only validate if the user has started filling the entry
  const isVoluntaryEntryComplete = (entry) => {
    if (!isEntryStarted(entry, ["institution", "fromYear", "toYear", "role"])) {
      return true; // Empty entries are considered "complete" for validation
    }

    return ["institution", "fromYear", "toYear", "role"].every(
      (field) => entry[field] && entry[field].trim() !== ""
    );
  };

  // Only validate if the user has started filling the entry
  const isCampEntryComplete = (entry) => {
    if (!isEntryStarted(entry, ["program", "year", "role"])) {
      return true; // Empty entries are considered "complete" for validation
    }

    return ["program", "year", "role"].every(
      (field) => entry[field] && entry[field].trim() !== ""
    );
  };

  const hasIncompleteEntries = (arrayField, validationFn) => {
    if (!safeData[arrayField] || safeData[arrayField].length === 0)
      return false;
    return safeData[arrayField].some(
      (entry, index) =>
        // Only check incomplete entries if they're not the last one and have been started
        index < safeData[arrayField].length - 1 && !validationFn(entry)
    );
  };

  const yesNoOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  // Handle radio change with proper state cleaning
  const handleParticipationChange = (val) => {
    // Decide what campDetails should be
    const newCampDetails =
      val === "no"
        ? []
        : safeData.campDetails && safeData.campDetails.length > 0
        ? safeData.campDetails
        : [{ program: "", year: "", role: "" }];

    // Single update call with both fields
    onChange({
      ...safeData,
      participatedInCamp: val,
      campDetails: newCampDetails,
    });
  };
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-2">
        <Award className="text-primary-600" size={24} />
        <h2 className="text-xl font-semibold">Voluntary & Camp Experience</h2>
      </div>

      {/* Voluntary Experiences */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <p className="font-medium text-gray-700">
            List up to 5 voluntary experiences:
          </p>
        </div>

        <div className="p-4 space-y-6">
          {safeData.voluntaryList && safeData.voluntaryList.length > 0 ? (
            safeData.voluntaryList.map((entry, idx) => (
              <div key={idx} className="group relative">
                <div className="bg-white rounded-lg border border-gray-200 hover:border-primary-300 transition-all p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <TextField
                      label="Institution"
                      value={entry.institution || ""}
                      onChange={(e) =>
                        updateArrayItem(
                          "voluntaryList",
                          idx,
                          "institution",
                          e.target.value
                        )
                      }
                      placeholder="Name of institution"
                      error={errors?.[`voluntaryList.${idx}.institution`]}
                    />
                    <YearSelect
                      label="From Year"
                      value={entry.fromYear || ""}
                      onChange={(e) =>
                        updateArrayItem(
                          "voluntaryList",
                          idx,
                          "fromYear",
                          e.target.value
                        )
                      }
                      includePresent={false}
                      error={errors?.[`voluntaryList.${idx}.fromYear`]}
                    />
                    <YearSelect
                      label="To Year"
                      value={entry.toYear || ""}
                      onChange={(e) =>
                        updateArrayItem(
                          "voluntaryList",
                          idx,
                          "toYear",
                          e.target.value
                        )
                      }
                      error={errors?.[`voluntaryList.${idx}.toYear`]}
                      includePresent={true} // Include "Present" option
                    />
                    <TextField
                      label="Responsibility"
                      value={entry.role || ""}
                      onChange={(e) =>
                        updateArrayItem(
                          "voluntaryList",
                          idx,
                          "role",
                          e.target.value
                        )
                      }
                      placeholder="One‑line description"
                      error={errors?.[`voluntaryList.${idx}.role`]}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeArrayItem("voluntaryList", idx)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition-colors flex items-center gap-1 text-sm p-1 rounded-md hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {idx < safeData.voluntaryList.length - 1 && (
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center z-10">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">
              No voluntary experiences added yet.
            </p>
          )}

          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={() =>
                addArrayItem("voluntaryList", {
                  institution: "",
                  fromYear: "",
                  toYear: "",
                  role: "",
                })
              }
              disabled={
                safeData.voluntaryList.length >= 5 ||
                hasIncompleteEntries("voluntaryList", isVoluntaryEntryComplete)
              }
              className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlusCircle size={18} />
              <span>Add Voluntary Experience</span>
            </button>
          </div>
          {hasIncompleteEntries("voluntaryList", isVoluntaryEntryComplete) && (
            <p className="text-red-500 text-sm text-center">
              Please complete all fields in the current entries before adding a
              new one.
            </p>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <RadioGroup
            id="participatedInCamp"
            label="Participated in a national/international camp or leadership program?"
            options={yesNoOptions}
            value={safeData.participatedInCamp}
            onChange={handleParticipationChange}
            error={errors?.participatedInCamp}
            className="mb-0"
          />
        </div>

        {safeData.participatedInCamp === "yes" && (
          <div className="p-4 space-y-6">
            <p className="font-medium text-gray-700">
              Select up to 5 programs from the list below
            </p>

            {safeData.campDetails && safeData.campDetails.length > 0 ? (
              safeData.campDetails.map((entry, idx) => (
                <div key={idx} className="group relative">
                  <div className="bg-white rounded-lg border border-gray-200 hover:border-primary-300 transition-all p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <SelectField
                        label="Program Name"
                        value={entry.program || ""}
                        onChange={(e) =>
                          updateArrayItem(
                            "campDetails",
                            idx,
                            "program",
                            e.target.value
                          )
                        }
                        options={CAMP_OPTIONS}
                        error={errors?.[`campDetails.${idx}.program`]}
                        required
                      />
                      {/* <TextField
                        label="Program Name"
                        value={entry.program || ""}
                        onChange={(e) =>
                          updateArrayItem(
                            "campDetails",
                            idx,
                            "program",
                            e.target.value
                          )
                        }
                        placeholder="Name of program"
                        error={errors?.[`campDetails.${idx}.program`]}
                      /> */}
                      <YearSelect
                        label="Year Attended"
                        value={entry.year || ""}
                        onChange={(e) =>
                          updateArrayItem(
                            "campDetails",
                            idx,
                            "year",
                            e.target.value
                          )
                        }
                        error={errors?.[`campDetails.${idx}.year`]}
                      />
                      <TextField
                        label="Role"
                        value={entry.role || ""}
                        onChange={(e) =>
                          updateArrayItem(
                            "campDetails",
                            idx,
                            "role",
                            e.target.value
                          )
                        }
                        placeholder="Your role"
                        error={errors?.[`campDetails.${idx}.role`]}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => removeArrayItem("campDetails", idx)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition-colors flex items-center gap-1 text-sm p-1 rounded-md hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {idx < safeData.campDetails.length - 1 && (
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center z-10">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No camp details added yet.
              </p>
            )}

            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={() =>
                  addArrayItem("campDetails", {
                    program: "PIU",
                    year: "",
                    role: "",
                  })
                }
                disabled={
                  safeData.campDetails.length >= 5 ||
                  hasIncompleteEntries("campDetails", isCampEntryComplete)
                }
                className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PlusCircle size={18} />
                <span>Add Camp Detail</span>
              </button>
            </div>
            {hasIncompleteEntries("campDetails", isCampEntryComplete) && (
              <p className="text-red-500 text-sm text-center">
                Please complete all fields in the current entries before adding
                a new one.
              </p>
            )}

            {errors?.campDetails && typeof errors.campDetails === "string" && (
              <p className="text-red-500 text-sm text-center">
                {errors.campDetails}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
