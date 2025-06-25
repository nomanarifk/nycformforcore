import { useState } from "react";
import ChoiceScreen from "./screens/ChoiceScreen";
import MultiStepForm from "./screens/MultiStepForm";
import ErrorSupportModal from "./components/form-sections/ErrorSupportModal";

function App() {
  const [userRole, setUserRole] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Handler for when a role is selected
  const handleRoleSelection = (role) => {
    setUserRole(role);

    // Small delay to allow animation to complete
    setTimeout(() => {
      setShowForm(true);
    }, 500);
  };

  return (
  <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-primary-50 to-secondary-50">
    {/* Top Button */}
    <div className="w-full p-4 flex justify-end items-center">
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm sm:text-base"
        onClick={() => {setOpenModal(true), setSubmitted(false)}}
      >
        Submit a feedback/Concern
      </button>
    </div>

    {/* Main Content */}
    <div className="flex-grow flex items-center justify-center px-4">
      {!showForm ? (
        <ChoiceScreen onRoleSelect={handleRoleSelection} />
      ) : (
        <MultiStepForm userRole={userRole} setOpenModal={setOpenModal}/>
      )}
    </div>

    <ErrorSupportModal show={OpenModal} onClose={() => setOpenModal(false)} submitted={submitted} setSubmitted={setSubmitted} />
  </div>
  );
}

export default App;
