import React, { useState } from 'react';
import axios from "axios";

const ErrorSupportModal = ({ show, onClose, submitted, setSubmitted }) => {
  const [supportFormData, setSupportFormData] = useState({
    Phone: '',
    Text: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    setSupportFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
        await axios.post(
          import.meta.env.VITE_SEND_EMAIL,
          JSON.stringify(supportFormData),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      setSubmitted(true);
      setSupportFormData({ Phone: '', Text: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Let us know how we can help:</h2>
        {!submitted ? (
          <>
            <form onSubmit={handleQuerySubmit} className="space-y-3">
              <input
                type="tel"
                name="Phone"
                placeholder="Your phone"
                required
                value={supportFormData.Phone}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <textarea
                name="Text"
                placeholder="Your concern / feedback"
                required
                rows="3"
                value={supportFormData.Text}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn btn-primary"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>

            <div className="my-4 text-center text-sm text-gray-500">or</div>

            <a
              href="https://wa.me/923072748233?text=Hi%2C%20I%20encountered%20an%20issue..."
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              💬 Chat on WhatsApp
            </a>
          </>
        ) : (
          <p className="text-green-600 font-semibold">
            ✅ Your message has been sent! We'll get back to you shortly.
          </p>
        )}
      </div>
    </div>
  );
};

export default ErrorSupportModal;