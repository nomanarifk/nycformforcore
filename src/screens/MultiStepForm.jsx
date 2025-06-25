import { useState } from "react";
import StepIndicator from "../components/layout/StepIndicator";
import { motion } from "framer-motion";
import NavigationButtons from "../components/layout/NavigationButtons";
import AnimatedFormContainer from "../components/layout/AnimatedFormContainer";
import ThankYouScreen from "../components/ThankYouScreen"; // Import the new component
import axios from "axios";

// Form sections
import PersonalDetailsSection from "../components/form-sections/PersonalDetailsSection";
import EducationSection from "../components/form-sections/EducationSection";
import ExperienceSection from "../components/form-sections/ExperienceSection";
import AchievementsSection from "../components/form-sections/AchievementsSection";
import ReflectiveQuestionsSection from "../components/form-sections/ReflectiveQuestionsSection";
import ScenarioResponseSection from "../components/form-sections/ScenarioResponseSection";
import ConsentSection from "../components/form-sections/ConsentSection";
import EligibilityCheckSection from "../components/form-sections/EligibilityCheckSection";

// Initial form data
const initialFormData = {
  role: "",
  reg: "",
  eligibility: {
    hasAttended: "",
  },
  consents: {
    sharingConsent: false,
    availabilityConsent: false,
    aiUsageConsent: false,
  },
  personal: {
    isAfghan: false,
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    contactNumber: "",
    whatsapp: "",
    birthDate: "",
    address: "",
    documentType: "cnic",
    documentNumber: "",
    permanentRegion: "southern",
    currentRegion: "southern",
    localCouncil: "garden",
    jamatkhana: "",
    accommodationDetails: "",
  },
  education: {
    religiousEducation: "hre", // ARE, HRE, Matric, etc.
    academicQualification: "high_school", // High School, Bachelors, etc.
    currentlyStudying: "", // "yes" or "no"
    studyInstitution: "", // conditional
    areaOfStudy: "humanities", // dropdown
  },
  work: {
    currentlyWorking: "", // "yes" or "no"
    workInstitution: "", // conditional
    currentRoleDescription: "", // conditional paragraph
  },
  experience: {
    voluntaryList: [], // Start with empty array instead of one placeholder item
    participatedInCamp: "", // "yes" or "no"
    campDetails: [], // Start with empty array instead of one placeholder item
  },
  // Updated achievements structure with name and year for each award/certification
  achievements: {
    entries: [],
    otherAchievements: "",
    _addingEntry: false,
    _pendingName: "",
    _pendingYear: new Date().getFullYear(),
  },
  reflective: { khidmatMeaning: "", video: "" },
  scenario: {
    // for "participant" role
    projectChoice: "", // "A" / "B" / "C"
    projectReason: "", // up to 150 words

    // for "facilitator" and others
    sessionChoice: "", // "1" / "2" / "3" / "4"
    sessionExplanation: "", // up to 300 words
    payFees: true,
    paymentOption: "",
  },
};

const formSections = [
  {
    id: "eligibility",
    title: "Eligibility",
    Component: EligibilityCheckSection,
  },
  { id: "consents", title: "Consents", Component: ConsentSection },
  {
    id: "personal",
    title: "Personal Details",
    Component: PersonalDetailsSection,
  },
  {
    id: "education",
    title: "Education & Occupation",
    Component: EducationSection,
  },
  {
    id: "experience",
    title: "Voluntary & Leadership Experience",
    Component: ExperienceSection,
  },
  {
    id: "achievements",
    title: "Achievements & Awards",
    Component: AchievementsSection,
  },
  {
    id: "reflective",
    title: "Reflective Questions",
    Component: ReflectiveQuestionsSection,
  },
  {
    id: "scenario",
    title: "Scenario Response",
    Component: ScenarioResponseSection,
  },
];

const MultiStepForm = ({ userRole }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState("next");
  const [formData, setFormData] = useState({
    ...initialFormData,
    role: userRole,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const updateFormData = (sectionId, data) => {
    setFormData((prev) => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], ...data },
    }));
  };
  const role = formData.role;

  const validateSection = (sectionId) => {
    const section = formData[sectionId];

    const errors = {};
    let isValid = true;

    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    let first = section.firstName?.trim() ?? "";
    let last = section.lastName?.trim() ?? "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
    let email = section.email?.trim() ?? "";
    const docNum = section.documentNumber?.trim() ?? "";

    switch (sectionId) {
      case "eligibility":
        if (!section.hasAttended.trim()) {
          errors.hasAttended = "Please select an appropriate option";
          isValid = false;
        } else if (section.hasAttended.trim() === "yes") {
          isValid = false;
        }
        break;
      case "consents":
        if (!section.availabilityConsent) {
          errors.availabilityConsent = "This consent is required";
          isValid = false;
        }
        if (!section.aiUsageConsent) {
          errors.aiUsageConsent = "This consent is required";
          isValid = false;
        }
        if (section.payFees === true) {
          if (!section.paymentOption) {
            errors.paymentOption = "This is required";
            isValid = false;
          }
        }
        break;

      case "personal":
        // Basic fields
        [
          "firstName",
          "lastName",
          "email",
          "contactNumber",
          "whatsapp",
          "address",
          "permanentRegion",
          "currentRegion",
          "localCouncil",
          "jamatkhana",
        ].forEach((field) => {
          if (!section[field] || !section[field].toString().trim()) {
            errors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
            isValid = false;
          }
        });

        if (first && !nameRegex.test(first)) {
          errors.firstName = "First name should only contain letters";
          isValid = false;
        }
        if (last && !nameRegex.test(last)) {
          errors.lastName = "Last name should only contain letters";
          isValid = false;
        }
        if (email && !emailRegex.test(email)) {
          errors.email = "Please enter a valid email";
          isValid = false;
        }
        if (!section.gender.trim()) {
          errors.gender = "Please select an appropriate option";
          isValid = false;
        }
        if (!section.contactNumber.trim()) {
          errors.contactNumber = "Calling number is required";
          isValid = false;
        } else if (!/^(?:\+92|0)?3\d{9}$/.test(section.contactNumber.trim())) {
          errors.contactNumber =
            "Please enter a valid Pakistan (+92 or 0 + 3xxxxxxxxx)";
          isValid = false;
        }
        if (!section.whatsapp.trim()) {
          errors.whatsapp = "WhatsApp number is required";
          isValid = false;
        } else if (
          !/^(?:(?:\+92|0)?3\d{9}|(?:\+93|0)?7\d{8})$/.test(
            section.whatsapp.trim()
          )
        ) {
          errors.whatsapp =
            "Please enter a valid Pakistan (+92 or 0 + 3xxxxxxxxx) or Afghanistan (+93 or 0 + 7xxxxxxxx) number";
          isValid = false;
        }
        if (section.documentType === "cnic") {
          if (!section.documentNumber.trim()) {
            errors.documentNumber = "CNIC number is required";
            isValid = false;
          }
          if (
            section.documentNumber.trim() &&
            !/^(?:\d{5}-\d{7}-\d|\d{13})$/.test(section.documentNumber)
          ) {
            errors.documentNumber = "CNIC must be 12345‑1234567‑1 or 13 digits";
            isValid = false;
          }
        } else {
          // Document regexes
          switch (section.documentType) {
            case "por":
              // POR Card: 2 letters + 11 digits = 13 total
              if (!/^[A-Za-z]{2}\d{11}$/.test(docNum)) {
                errors.documentNumber =
                  "POR card must be two letters followed by 11 digits";
                isValid = false;
              }
              break;

            case "tazkira":
              // Afghan Tazkira: 13 digits (no dashes)
              if (!/^\d{13}$/.test(docNum)) {
                errors.documentNumber = "Tazkira must be exactly 13 digits";
                isValid = false;
              }
              break;

            case "passport_afr":
              // Afghan passport: 2 letters + 7 digits
              if (!/^[A-Za-z]{2}\d{7}$/.test(docNum)) {
                errors.documentNumber =
                  "Afghan passport: two letters followed by 7 digits";
                isValid = false;
              }
              break;

            default:
              // should never happen
              errors.documentNumber = "Unknown document type";
              isValid = false;
          }
        }
        if (!section.birthDate.trim()) {
          errors.birthDate = "Birth date is required";
          isValid = false;
        }
        // if participant: Age limit (18-25)
        // If facilitator: Age limit (25 - 29)

        // corrected birthDate + age logic:
        const dobStr = section.birthDate?.trim();
        if (!dobStr) {
          errors.birthDate = "Birth date is required";
          isValid = false;
        } else {
          // calculate exact age
          const dob = new Date(dobStr);
          const currentYear = new Date().getFullYear();
          const refDate = new Date(currentYear, 8, 1);
          let age = refDate.getFullYear() - dob.getFullYear();
          const m = refDate.getMonth() - dob.getMonth();
          const d = refDate.getDate() - dob.getDate();
          if (m < 0 || (m === 0 && d < 0)) age--;

          if (role === "participant") {
            if (age < 18 || age > 25) {
              errors.birthDate =
                "Participant must be between 18 and 25 years old";
              isValid = false;
            }
          } else if (role === "facilitator") {
            if (age < 26 || age > 30) {
              errors.birthDate =
                "Facilitator must be between 26 and 30 years old";
              isValid = false;
            }
          }
        }
        break;

      // Education, experience, achievements, reflective, scenario
      case "education":
        // Required selects
        ["academicQualification", "areaOfStudy", "religiousEducation"].forEach(
          (field) => {
            if (!section[field] || !section[field].trim()) {
              errors[field] = "This field is required";
              isValid = false;
            }
          }
        );

        // Currently studying?
        if (!section.currentlyStudying) {
          errors.currentlyStudying = "This field is required";
          isValid = false;
        } else if (section.currentlyStudying === "yes") {
          if (!section.studyInstitution || !section.studyInstitution.trim()) {
            errors.studyInstitution = "Institution name is required";
            isValid = false;
          }
        } else {
          // “no” → clear out and remove any stale error
          section.studyInstitution = "";
          delete errors.studyInstitution;
        }

        // Currently working?
        if (!section.currentlyWorking) {
          errors.currentlyWorking = "This field is required";
          isValid = false;
        } else if (section.currentlyWorking === "yes") {
          if (!section.workInstitution || !section.workInstitution.trim()) {
            errors.workInstitution = "Institution name is required";
            isValid = false;
          }
          if (
            !section.currentRoleDescription ||
            !section.currentRoleDescription.trim()
          ) {
            errors.currentRoleDescription = "Please describe your role";
            isValid = false;
          }
        } else {
          // “no” → clear out and remove any stale errors
          section.workInstitution = "";
          section.currentRoleDescription = "";
          delete errors.workInstitution;
          delete errors.currentRoleDescription;
        }
        break;

      case "experience":
        // Check if the participatedInCamp question has been answered

        // Validate voluntary experience entries
        if (section.voluntaryList && section.voluntaryList.length > 0) {
          section.voluntaryList.forEach((entry, i) => {
            // add that this field is required
            if (!entry.institution && !entry.fromYear && !entry.toYear) {
              errors[`voluntaryList.${i}.institution`] =
                "Institution is required";
              errors[`voluntaryList.${i}.fromYear`] = "From year is required";
              errors[`voluntaryList.${i}.toYear`] = "To year is required";
              errors[`voluntaryList.${i}.role`] = "Responsibility is required";
              isValid = false;
            }

            if (!entry.institution || !entry.institution.trim()) {
              errors[`voluntaryList.${i}.institution`] =
                "Institution is required";
              isValid = false;
            }

            for (let i = 0; i < section.voluntaryList.length; i++) {
              const entry = section.voluntaryList[i];

              // FROM YEAR
              if (!entry.fromYear || !entry.fromYear.trim()) {
                errors[`voluntaryList.${i}.fromYear`] = "From year is required";
                isValid = false;
              } else if (!/^\d{4}$/.test(entry.fromYear.trim())) {
                errors[`voluntaryList.${i}.fromYear`] =
                  "Please enter a valid year (YYYY)";
                isValid = false;
              }

              // TO YEAR
              if (!entry.toYear || !entry.toYear.trim()) {
                errors[`voluntaryList.${i}.toYear`] = "To year is required";
                isValid = false;
              } else if (entry.toYear === "Present") {
                // “Present” is always allowed
              } else if (!/^\d{4}$/.test(entry.toYear.trim())) {
                errors[`voluntaryList.${i}.toYear`] =
                  "Please enter a valid year (YYYY)";
                isValid = false;
              } else {
                // Both are numeric strings here—compare them
                const from = parseInt(entry.fromYear, 10);
                const to = parseInt(entry.toYear, 10);

                if (to < from) {
                  errors[`voluntaryList.${i}.toYear`] =
                    "To year must be later than or equal to From year";
                  isValid = false;
                }
              }
            }

            if (!entry.role || !entry.role.trim()) {
              errors[`voluntaryList.${i}.role`] = "Responsibility is required";
              isValid = false;
            }
          });
        }

        // Only validate camp details if user has participated in camps
        if (section.participatedInCamp === "yes") {
          // Check if there's at least one camp entry if they selected "yes"
          if (!section.campDetails || section.campDetails.length === 0) {
            errors.campDetails =
              "Please add at least one camp or leadership program";
            isValid = false;
          } else {
            // Validate each camp entry
            section.campDetails.forEach((entry, i) => {
              // add that this field is required

              if (!entry.program && !entry.year && !entry.role) {
                errors[`campDetails.${i}.program`] = "Program name is required";
                errors[`campDetails.${i}.year`] = "Year is required";
                errors[`campDetails.${i}.role`] = "Role is required";
                isValid = false;
                return;
              }

              if (!entry.program || !entry.program.trim()) {
                errors[`campDetails.${i}.program`] = "Program name is required";
                isValid = false;
              }

              if (!entry.year || !entry.year.trim()) {
                errors[`campDetails.${i}.year`] = "Year is required";
                isValid = false;
              } else if (!/^\d{4}$/.test(entry.year.trim())) {
                errors[`campDetails.${i}.year`] =
                  "Please enter a valid year (YYYY)";
                isValid = false;
              }

              if (!entry.role || !entry.role.trim()) {
                errors[`campDetails.${i}.role`] = "Role is required";
                isValid = false;
              }
            });
          }
        } else if (section.participatedInCamp === "no") {
          // Clear camp details if user selected "no"
          section.campDetails = [];
        }

        break;
      case "achievements":
        if (section._addingEntry && section._pendingName.trim()) {
          errors._pendingName =
            "You have an un‑submitted achievement. Click Add or Cancel.";
          isValid = false;
        }

        break;

      case "reflective":
        if (!section.khidmatMeaning.trim()) {
          errors.khidmatMeaning = "This field is required";
          isValid = false;
        } else if (section.khidmatMeaning.trim().split(" ").length > 150) {
          errors.khidmatMeaning = "Maximum word limit of 150 exceeded"; // updated message
          isValid = false;
        }
        if (!section.video) {
          errors.video = "Video submission is required";
          isValid = false;
        }
        break;
      case "scenario":
        // don't accepet empty values whether participant or facilitator
        if (!section.projectChoice && !section.sessionChoice) {
          errors.projectChoice = "This field is required";
          errors.sessionChoice = "This field is required";
          isValid = false;
        }
        if (role === "participant") {
          if (!section.projectChoice.trim()) {
            errors.projectChoice = "This field is required";
            isValid = false;
          }
          if (!section.projectReason.trim()) {
            errors.projectReason = "This field is required";
            isValid = false;
          } else if (section.projectReason.trim().split(" ").length > 150) {
            errors.projectReason = "Maximum word limit of 150 exceeded"; // updated message
            isValid = false;
          }
        } else {
          if (!section.sessionChoice.trim()) {
            errors.sessionChoice = "This field is required";
            isValid = false;
          }
          if (!section.sessionExplanation.trim()) {
            errors.sessionExplanation = "This field is required";
            isValid = false;
          } else if (
            section.sessionExplanation.trim().split(" ").length > 300
          ) {
            errors.sessionExplanation = "Maximum word limit of 300 exceeded";
            isValid = false;
          }
        }
        if (section.payFees) {
          // if pay-full-fee is checked but no option was selected
          if (!section.paymentOption) {
            errors.paymentOption =
              "Please select whether you can pay full or partial";
            isValid = false;
          }
        }

        break;
    }

    setFormErrors(errors);

    return isValid;
  };

  const handleNext = () => {
    if (validateSection(formSections[currentStep].id)) {
      setDirection("next");
      setCurrentStep((prev) => Math.min(prev + 1, formSections.length - 1));
    }
  };

  const handlePrevious = () => {
    setDirection("prev");
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    if (validateSection(formSections[currentStep].id)) {
      setIsSubmitting(true);
      try {
        console.log(formData);
        const copyFormData = formData;
        let reg_Id = generateRegId(
          copyFormData.role,
          copyFormData.personal.firstName,
          copyFormData.personal.lastName
        );
        copyFormData.reg = reg_Id;
        const videoFile = copyFormData.reflective.video;
        let videoUrl = null;
        if (videoFile) {
          const videoForm = new FormData();

          videoForm.append("video", videoFile);
          videoForm.append("role", copyFormData.role);
          videoForm.append("reg", reg_Id);

          const uploadRes = await axios.post(
            import.meta.env.VITE_VIDEO_URL,
            videoForm,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          if (uploadRes.data && uploadRes.data.fileUrl) {
            videoUrl = uploadRes.data.fileUrl;
          } else {
            throw new Error("Video upload failed.");
          }
        }

        // 2. Attach the video URL to the form data
        copyFormData.reflective.videoUrl = videoUrl;
        formData.reflective.videoUrl = videoUrl;

        delete copyFormData.reflective.video;

        await axios.post(
          import.meta.env.VITE_BACKEND_URL,
          JSON.stringify(copyFormData),
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        setErrorMessage("");

        // Store submitted data for the thank you page
        setSubmittedData({ ...formData });

        // Set form as submitted
        setIsSubmitted(true);
      } catch (error) {
        setErrorMessage(
          "Submission failed. Please try again or contact at nyc.ysb@akcpk.org"
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const generateRegId = (role, firstName, lastName) => {
    const roleChar = role.toLowerCase() === "participant" ? "P" : "F";

    // Get first word of firstName and lastName
    const firstNameFirstWord = firstName.trim().split(" ")[0];
    const lastNameFirstWord = lastName.trim().split(" ")[0];

    // Unique number, e.g. last 5 digits of timestamp
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, "0");
    const timestamp =
      now.getFullYear().toString() +
      pad(now.getMonth() + 1) +
      pad(now.getDate()) +
      pad(now.getHours()) +
      pad(now.getMinutes()) +
      pad(now.getSeconds());

    return `NYC${roleChar}_${firstNameFirstWord}_${lastNameFirstWord}_${timestamp}`;
  };

  const handleResetForm = () => {
    // Reset the form completely
    setFormData({
      ...initialFormData,
      role: userRole,
    });
    setFormErrors({});
    setCurrentStep(0);
    setDirection("next");
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  // If form is submitted, show thank you screen
  if (isSubmitted && submittedData) {
    return (
      <ThankYouScreen onReset={handleResetForm} formData={submittedData} />
    );
  }

  const Current = formSections[currentStep].Component;

  return (
    <motion.div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto relative">
        <div className="absolute  top-0 right-0">
          <span className="bg-primary-100 text-primary-700 px-2 md:px-3 py-1 rounded-md text-[12px] md:text-sm">
            {formData.role}
          </span>
        </div>
        <h1 className="text-[18px] md:text-2xl  font-bold text-center mb-6">
          NYC Registration
        </h1>

        <StepIndicator
          steps={formSections.map((s) => s.title)}
          currentStep={currentStep}
        />

        <div className="bg-white rounded-lg shadow-lg mt-6 overflow-hidden">
          {errorMessage && (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
              role="alert"
            >
              <p className="font-bold">Error</p>
              <p>{errorMessage}</p>
              <button
                className="mt-2 text-sm underline"
                onClick={() => setErrorMessage("")}
              >
                Dismiss
              </button>
            </div>
          )}

          <AnimatedFormContainer direction={direction}>
            <div key={currentStep} className="p-6">
              <Current
                data={formData[formSections[currentStep].id]}
                errors={formErrors}
                onChange={(data) =>
                  updateFormData(formSections[currentStep].id, data)
                }
                userRole={userRole}
                // NEW: pending flags + handlers
                onStartAdding={() =>
                  updateFormData("achievements", {
                    ...formData.achievements,
                    _addingEntry: true,
                  })
                }
                onCancelAdding={() =>
                  updateFormData("achievements", {
                    ...formData.achievements,
                    _addingEntry: false,
                    _pendingName: "",
                  })
                }
                onPendingChange={(name, year) =>
                  updateFormData("achievements", {
                    ...formData.achievements,
                    _pendingName: name,
                    _pendingYear: year,
                  })
                }
              />
            </div>
          </AnimatedFormContainer>

          <div className="p-6 bg-gray-50 border-t">
            <NavigationButtons
              currentStep={currentStep}
              totalSteps={formSections.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MultiStepForm;
