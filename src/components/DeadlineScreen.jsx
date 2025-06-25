import React from "react";
import { motion } from "framer-motion";

const DeadlineScreen = () => {
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

            <h2 className="text-3xl font-bold text-secondary-800 mb-2">
              National Youth Camp 2025
            </h2>
            <p className="text-secondary-600 text-lg mb-8">
              Registrations are closed now <br /> See you next year Inshallah ❤️
            </p>

            <div className="bg-primary-50 p-6 rounded-lg text-left mb-8">
              <h3 className="text-lg font-semibold text-primary-700 mb-3">
                What happens next?
              </h3>
              <ul className="space-y-2 text-secondary-700">
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  If you have already applied, our team will review your application
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

export default DeadlineScreen;
