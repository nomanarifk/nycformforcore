import { useState } from "react";
import { Users, UserCircle, ChevronRight } from "lucide-react";

const ChoiceScreen = ({ onRoleSelect }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleSelection = (role) => {
    setSelectedRole(role);
    setIsAnimating(true);
    setTimeout(() => onRoleSelect(role), 500);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`transition-all duration-500 ${
          isAnimating ? "animate-slide-out-left" : "animate-fade-in"
        }`}
      >
        <div className="overflow-hidden rounded-xl shadow-lg bg-white border border-secondary-200 relative">
          {/* Top gradient accent */}
          <div className="h-1 w-full bg-gradient-to-r from-primary-400 to-primary-600"></div>

          <div className="p-8">
            <h1 className="text-2xl font-bold text-center text-secondary-800 mb-2">
              8<sup>th</sup> National Youth Camp, Lahore 
              25<sup>th</sup> - 31<sup>st</sup> August 2025 
              Registration Form
            </h1>
            <p className="text-secondary-500 text-center mb-8">
              Please select your role to continue
            </p>

            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleSelection("participant")}
                className={`group relative flex items-center justify-between w-full p-4 rounded-lg border transition-all duration-300 
                  ${
                    selectedRole === "participant"
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-secondary-200 hover:border-primary-400 hover:bg-primary-50"
                  }`}
              >
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 
                    ${
                      selectedRole === "participant"
                        ? "bg-primary-100 text-primary-600"
                        : "bg-secondary-100 text-secondary-600 group-hover:bg-primary-100 group-hover:text-primary-500"
                    }`}
                  >
                    <UserCircle size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Participant (18-25)</h3>
                    <p className="text-secondary-500 text-sm">
                      Join and experience camp activities
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={`transition-all duration-300 
                  ${
                    selectedRole === "participant"
                      ? "text-primary-500"
                      : "text-secondary-400 group-hover:text-primary-500"
                  }`}
                  size={20}
                />
              </button>
              <button
                onClick={() => handleSelection("facilitator")}
                className={`group relative flex items-center justify-between w-full p-4 rounded-lg border transition-all duration-300 
                  ${
                    selectedRole === "facilitator"
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-secondary-200 hover:border-primary-400 hover:bg-primary-50"
                  }`}
              >
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 
                    ${
                      selectedRole === "facilitator"
                        ? "bg-primary-100 text-primary-600"
                        : "bg-secondary-100 text-secondary-600 group-hover:bg-primary-100 group-hover:text-primary-500"
                    }`}
                  >
                    <Users size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Facilitator (26-30)</h3>
                    <p className="text-secondary-500 text-sm">
                      Manage and guide camp activities
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={`transition-all duration-300 
                  ${
                    selectedRole === "facilitator"
                      ? "text-primary-500"
                      : "text-secondary-400 group-hover:text-primary-500"
                  }`}
                  size={20}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoiceScreen;
