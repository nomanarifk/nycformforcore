import React from "react";
import FormError from "../ui/FormError";
import RadioGroup from "../ui/RadioGroup";

export default function ScenarioResponseSection({
  data,
  errors,
  onChange,
  userRole,
}) {

  const paymentOptions = [
    { value: "payFull", label: "I can pay full amount" },
    { value: "payPartial", label: "I can pay partial amount" },
  ];

  const handleField = (field, value) => onChange({ ...data, [field]: value });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };
  const isParticipant = userRole === "participant";

  const prompt = isParticipant
    ? `You’ve joined an institution and you have to develop a solution that benefits your local Jamat. 
Your team is deciding between three ideas:`
    : `You are facilitating a group session at the camp. Midway through your 
carefully planned activity, a participant shares a deeply personal and emotional story 
that resonates with the group and changes the tone of the session. The planned agenda 
now feels misaligned, but the moment has created an opportunity for deeper connection 
and reflection.`;

  const options = isParticipant
    ? [
        {
          id: "A",
          label:
            "Launch a campaign promoting emotional wellbeing and mental health",
        },
        {
          id: "B",
          label:
            "Organize a mentorship program connecting youth with Jamati professionals",
        },
        {
          id: "C",
          label:
            "Create an awareness drive about climate change and sustainable practices",
        },
      ]
    : [
        {
          id: "1",
          label:
            "Stick to the planned agenda to stay on track with the session’s objectives.",
        },
        {
          id: "2",
          label:
            "Pause the activity and allow space for group reflection and emotional processing, adapting the session on the spot.",
        },
        {
          id: "3",
          label:
            "Gently acknowledge the moment and offer to revisit it later during a more suitable time.",
        },
        {
          id: "4",
          label:
            "Ask another facilitator to step in so you can privately support the participant.",
        },
      ];

  // Which choice & explanation fields to bind
  const choiceField = isParticipant ? "projectChoice" : "sessionChoice";
  const explanationField = isParticipant
    ? "projectReason"
    : "sessionExplanation";

  // Word limits
  const maxWords = 150;
  const countWords = (text) =>
    text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Scenario Response</h2>

      {/* Prompt */}
      <div className="p-4 bg-secondary-50 rounded border border-secondary-200">
        <p className="text-secondary-700  text-justify">{prompt}</p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {options.map((opt) => (
          <label key={opt.id} className="flex items-start">
            <input
              type="radio"
              name={choiceField}
              value={opt.id}
              checked={data[choiceField] === opt.id}
              onChange={() => handleField(choiceField, opt.id)}
              className="mt-1 h-4 w-4 text-primary-600 border-gray-300"
            />
            <span className="ml-3 text-gray-700">
              <span className="font-medium">{opt.id}.</span> {opt.label}
            </span>
          </label>
        ))}
        {errors[choiceField] && <FormError message={errors[choiceField]} />}
      </div>

      {/* Explanation */}
      <div>
        <label className="form-label">
          {isParticipant
            ? "What would you prioritize and why?"
            : "Support your answer"}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          value={data[explanationField] || ""}
          onChange={(e) => handleField(explanationField, e.target.value)}
          rows={isParticipant ? 4 : 6}
          placeholder={
            isParticipant
              ? "Explain your project choice in up to 150 words..."
              : "Explain why you chose this response and how it aligns with your leadership approach..."
          }
          maxLength="2000"
          className={`form-input ${
            errors[explanationField] ? "border-red-500 focus:ring-red-500" : ""
          }`}
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>Max {maxWords} words</span>
          <span
            className={
              countWords(data[explanationField] || "") > maxWords
                ? "text-red-500 font-medium"
                : ""
            }
          >
            {countWords(data[explanationField] || "")} / {maxWords}
          </span>
        </div>
        {errors[explanationField] && (
          <FormError message={errors[explanationField]} />
        )}
      </div>
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <RadioGroup
            id="paymentOption"
            label="The program contribution/fee is Rs. 30,000 (excluding travel expenses). Please indicate your ability to cover the program fee"
            options={paymentOptions}
            value={data.paymentOption}
            onChange={(val) => handleField("paymentOption", val)}
            error={errors?.paymentOption}
            required={true}
            className="mb-0"
          />
          {
            data.paymentOption && 
            <p className="text-green-700 mt-1">On selection, team will coordinate with you on this.</p>
          }
        </div>
    </div>
  );
}
