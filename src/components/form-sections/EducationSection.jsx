import React from "react";
import TextField from "../ui/TextField";
import SelectField from "../ui/SelectField";
import Checkbox from "../ui/Checkbox";
import RadioGroup from "../ui/RadioGroup"; // assume you have or create this

const religiousOptions = [
  { value: "are", label: "ARE" },
  { value: "hre", label: "HRE" },
  { value: "matriculation", label: "Matriculation" },
  { value: "other", label: "Other" },
];

const academicOptions = [
  { value: "high_school", label: "High School Diploma" },
  { value: "associate", label: "Associate Degree" },
  { value: "bachelor", label: "Bachelor's Degree" },
  { value: "master", label: "Master's Degree" },
  { value: "doctorate", label: "Doctorate" },
];

const areaOfStudyOptions = [
  { value: "humanities", label: "Humanities" },
  { value: "social_sciences", label: "Social Sciences" },
  { value: "natural_sciences", label: "Natural Sciences" },
  { value: "mathematics", label: "Mathematics" },
  { value: "engineering", label: "Engineering & Technology" },
  { value: "health", label: "Health & Medical Sciences" },
  { value: "business", label: "Business & Economics" },
  { value: "education", label: "Education" },
  { value: "law", label: "Law & Legal Studies" },
  { value: "arts", label: "Arts & Design" },
  { value: "environment", label: "Environmental Studies" },
];

const yesNoOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export default function EducationSection({ data, errors, onChange }) {
  const update = (field, val) => onChange({ ...data, [field]: val });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Education & Work</h2>

      {/* Highest Religious Education */}
      <SelectField
        id="religiousEducation"
        label="Highest Religious Education"
        value={data.religiousEducation}
        onChange={(e) => update("religiousEducation", e.target.value)}
        options={religiousOptions}
        error={errors?.religiousEducation}
        required
      />

      {/* Highest Academic Qualification */}
      <SelectField
        id="academicQualification"
        label="Highest Educational Qualification"
        value={data.academicQualification}
        onChange={(e) => update("academicQualification", e.target.value)}
        options={academicOptions}
        error={errors?.academicQualification}
        required
      />

      {/* Area of Study */}
      <SelectField
        id="areaOfStudy"
        label="Area of Study"
        value={data.areaOfStudy}
        onChange={(e) => update("areaOfStudy", e.target.value)}
        options={areaOfStudyOptions}
        error={errors?.areaOfStudy}
        required
      />

      {/* Currently Studying? */}
      <RadioGroup
        id="currentlyStudying"
        label="Are you currently studying?"
        options={yesNoOptions}
        value={data.currentlyStudying}
        onChange={(val) => update("currentlyStudying", val)}
        error={errors?.currentlyStudying}
        required
      />

      {/* Institution/Organization Name if studying */}
      {data.currentlyStudying === "yes" && (
        <TextField
          id="studyInstitution"
          label="Institution/Organization Name"
          value={data.studyInstitution}
          onChange={(e) => update("studyInstitution", e.target.value)}
          placeholder="Enter institution name"
          error={errors?.studyInstitution}
          required
        />
      )}

      <hr className="my-6" />

      {/* Currently Working? */}
      <RadioGroup
        id="currentlyWorking"
        label="Are you currently working?"
        options={yesNoOptions}
        value={data.currentlyWorking}
        onChange={(val) => update("currentlyWorking", val)}
        error={errors?.currentlyWorking}
        required
      />

      {/* Work details if working */}
      {data.currentlyWorking === "yes" && (
        <>
          <TextField
            id="workInstitution"
            label="Institution/Organization Name"
            value={data.workInstitution}
            onChange={(e) => update("workInstitution", e.target.value)}
            placeholder="Enter organization name"
            error={errors?.workInstitution}
            required
          />
          <TextField
            id="currentRoleDescription"
            label="Briefly Describe Your Current Role"
            type="textarea"
            value={data.currentRoleDescription}
            onChange={(e) => update("currentRoleDescription", e.target.value)}
            placeholder="Describe your role"
            error={errors?.currentRoleDescription}
            required
          />
        </>
      )}
    </div>
  );
}
