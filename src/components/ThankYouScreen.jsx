import React from "react";
import { motion } from "framer-motion";

const ThankYouScreen = ({ onReset, formData }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-12 px-4 flex items-center justify-center"
    >
      <div className="max-w-3xl w-full mx-auto">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-8 text-center">
            <div className="mb-6">
              <div className="h-20 w-20 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-secondary-800 mb-2">
              Thank You {formData.personal.firstName}
            </h2>
            <p className="text-secondary-600 text-lg mb-8">
              Your application for the {formData.role} position has been
              submitted successfully.
            </p>

            <div className="bg-primary-50 p-6 rounded-lg text-left mb-8">
              <h3 className="text-lg font-semibold text-primary-700 mb-3">
                What happens next?
              </h3>
              <ul className="space-y-2 text-secondary-700">
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  Our team will review your application
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  You'll be contacted at your given Whatsapp/Contact Number or Email.
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  Only Shortlisted candidates will be contacted.
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  Good luck and Thank you once again !! 
                </li>
              </ul>
            </div>

            <div className="flex justify-center">
              <button
                onClick={onReset}
                className="btn btn-primary px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          </div>

          <div className="bg-secondary-50 px-8 py-4 border-t border-secondary-100 text-center">
            <p className="text-secondary-500 text-sm">
              If you have any questions, please contact us at
              nyc.ysb@akcpk.org
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ThankYouScreen;
