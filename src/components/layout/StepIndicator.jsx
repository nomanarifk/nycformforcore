import React, { useEffect, useRef } from "react";

const StepIndicator = ({ steps, currentStep }) => {
  const progress = ((currentStep + 1) / steps.length) * 100;
  const scrollContainerRef = useRef(null);
  const activeTabRef = useRef(null);

  // Effect to scroll to active tab
  useEffect(() => {
    if (scrollContainerRef.current && activeTabRef.current) {
      const container = scrollContainerRef.current;
      const activeTab = activeTabRef.current;

      // Calculate the center position of the container
      const containerCenter = container.offsetWidth / 1;

      // Calculate the position to scroll to (center the active tab)
      const scrollTo =
        activeTab.offsetLeft - containerCenter + activeTab.offsetWidth / 1;

      // Smooth scroll to the calculated positionç
      container.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  }, [currentStep]);

  return (
    <div className="mb-8">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="relative pt-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-xs font-semibold inline-block text-primary-600">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-primary-600">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-primary-200">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600 transition-all duration-300"
            ></div>
          </div>
        </div>
      </div>

      {/* Step tabs with auto-scroll */}
      <div className="hidden sm:block overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <nav className="flex border-b border-gray-200 min-w-max">
            {steps.map((step, index) => (
              <button
                key={index}
                ref={index === currentStep ? activeTabRef : null}
                className={`${
                  index === currentStep
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  index < currentStep ? "text-primary-400" : ""
                }`}
                disabled={true}
              >
                <span className="sm:hidden md:inline">{step}</span>
                <span className="md:hidden">{step.substring(0, 1)}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile step title */}
      <div className="sm:hidden mt-4">
        <h2 className="text-lg font-medium text-gray-900">
          {steps[currentStep]}
        </h2>
      </div>
    </div>
  );
};

export default StepIndicator;
