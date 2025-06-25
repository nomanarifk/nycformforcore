import React, { useState, useRef } from "react";
import FormError from "../ui/FormError";
import VideoUpload from "../ui/VideoUpload";

const ReflectiveQuestionsSection = ({ data, errors, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const wordCounter = (text) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Reflective Questions</h2>

      {/* Question 1 - Khidmat/Service */}
      <div className="mb-6">
        <label htmlFor="khidmatMeaning" className="form-label">
          Q1: What does khidmat/Service mean to you, and how do you currently
          live/practice that in your life?
          <span className="text-red-500">*</span>
        </label>
        <textarea
          id="khidmatMeaning"
          value={data.khidmatMeaning || ""}
          onChange={(e) => handleChange("khidmatMeaning", e.target.value)}
          placeholder="Share your perspective on khidmat/service"
          rows={4}
          required
          maxLength={1000}
          className={`form-input ${
            errors?.khidmatMeaning
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : ""
          }`}
        ></textarea>
        <div className="flex justify-between mt-1">
          <span className="text-sm text-gray-500">Max 150 words</span>
          <span
            className={`text-sm ${
              wordCounter(data.khidmatMeaning || "") > 150
                ? "text-red-500 font-medium"
                : "text-gray-500"
            }`}
          >
            {wordCounter(data.khidmatMeaning || "")} / 150 words
          </span>
        </div>
        {errors?.khidmatMeaning &&
          FormError({
            message: errors.khidmatMeaning,
          })}
      </div>

      {/* Question 2 - Leadership Video Response */}
      <div className="mb-6">
        <label className="form-label block mb-2">
          Q2: What does leadership mean to you in today's context, and how do
          you embody it in your personal and/or professional life?
          <span className="text-red-500">*</span>
        </label>
        
        <p className="text-sm text-red-600 mt-2">Important instructions*</p>
        <p className="text-sm text-gray-500 mb-4">
          Please record and upload your own video response (max 2 minutes). Make sure you're in a quiet space, your face is clearly visible, and you speak in either Urdu or English, whichever you're more comfortable with. We'll only review up to 2 minutes.
        </p>

        <VideoUpload
          id="video"
          label=""
          onChange={(file) => handleChange("video", file)}
          error={errors?.video}
          maxSize={200} // 50MB max
          value={data.video} // Pass the existing video file
        />

        {data.video && (
          <p className="text-sm text-gray-600 mt-2">
            Remember to keep your response under 2 minutes.
          </p>
        )}
      </div>
    </div>
  );
};

export default ReflectiveQuestionsSection;
