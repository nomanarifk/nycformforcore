import React from "react";

const NavigationButtons = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting,
}) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex justify-between">
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstStep}
        className={`btn ${
          isFirstStep
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "btn-secondary"
        }`}
      >
        Previous
      </button>

      <div className="space-x-2">
        {isLastStep ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className={`btn btn-primary ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Application"
            )}
          </button>
        ) : (
          <button onClick={onNext} className={`btn btn-primary `}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default NavigationButtons;
