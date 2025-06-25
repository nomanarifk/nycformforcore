import React, { useState } from "react";

const FileUpload = ({
  id,
  label,
  accept,
  onChange,
  error,
  required = false,
  maxSize = 5, // in MB
}) => {
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setFileName("");
      setFileSize(null);
      onChange(null);
      return;
    }

    // Check file size (convert maxSize from MB to bytes)
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size exceeds the ${maxSize}MB limit.`);
      e.target.value = null;
      return;
    }

    setFileName(file.name);
    setFileSize(file.size);
    onChange(file);
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

      <div className="mt-1 flex items-center">
        <label
          htmlFor={id}
          className="cursor-pointer px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Choose file
          <input
            id={id}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="sr-only"
          />
        </label>
        {fileName && (
          <div className="ml-3">
            <span className="text-sm text-gray-500">{fileName}</span>
            {fileSize && (
              <span className="ml-2 text-xs text-gray-400">
                ({formatFileSize(fileSize)})
              </span>
            )}
          </div>
        )}
      </div>

      {accept && (
        <p className="mt-1 text-xs text-gray-500">
          Accepted file types: {accept.split(",").join(", ")}
        </p>
      )}

      <p className="mt-1 text-xs text-gray-500">
        Maximum file size: {maxSize}MB
      </p>

      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default FileUpload;
