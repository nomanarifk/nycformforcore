import React, { useState, useRef, useEffect } from "react";

const VideoUpload = ({
  id,
  label,
  onChange,
  error,
  required = false,
  maxSize = 200, // in MB
  value = null, // Accept existing file as a value prop
}) => {
  const [videoFile, setVideoFile] = useState(value);
  const [videoPreview, setVideoPreview] = useState(null);
  const videoRef = useRef(null);

  // Effect to handle existing file data when component mounts or value changes
  useEffect(() => {
    if (value && !videoPreview) {
      setVideoFile(value);

      // Create a preview URL for the existing file
      if (value instanceof File) {
        const previewURL = URL.createObjectURL(value);
        setVideoPreview(previewURL);
      }
    }

    // Cleanup preview URLs when component unmounts
    return () => {
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [value]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setVideoFile(null);
      setVideoPreview(null);
      onChange(null);
      return;
    }

    // Check if it's a video file
    if (!file.type.startsWith("video/")) {
      alert("Please select a valid video file.");
      e.target.value = null;
      return;
    }

    // Check file size (convert maxSize from MB to bytes)
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size exceeds the ${maxSize}MB limit.`);
      e.target.value = null;
      return;
    }

    // Cleanup previous preview URL if exists
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }

    setVideoFile(file);

    // Create a preview URL
    const previewURL = URL.createObjectURL(file);
    setVideoPreview(previewURL);

    onChange(file);
  };

  const handleRemoveVideo = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }

    setVideoFile(null);
    setVideoPreview(null);
    onChange(null);

    if (videoRef.current) {
      videoRef.current.src = "";
      videoRef.current.load();
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    const units = ["B", "KB", "MB", "GB"];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="form-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {!videoPreview ? (
        <div className="mt-1">
          <div
            className={`flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${
              error ? "border-red-500" : ""
            }`}
          >
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H8m36-12h-4m-4-4v4m0 0v4m0-4h-12"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600 justify-center">
                <label
                  htmlFor={id}
                  className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 "
                >
                  <span>Upload a video</span>
                  <input
                    id={id}
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">
                MP4, WebM, MOV up to {maxSize}MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-3">
          <div className="relative">
            <video
              ref={videoRef}
              src={videoPreview}
              className="mt-2 rounded-md w-full max-h-80 object-contain bg-black"
              controls
            />
            <button
              type="button"
              onClick={handleRemoveVideo}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {videoFile && (
            <div className="mt-2 text-sm text-gray-500">
              {videoFile.name} ({formatFileSize(videoFile.size)})
            </div>
          )}
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default VideoUpload;
