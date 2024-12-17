import React from "react";

const ErrorModal = ({ showModal, message, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 transition-opacity ${
        showModal ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ transition: "opacity 0.3s ease" }}
    >
      <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold text-red-600">Error</h3>
        <p className="mt-2 text-sm text-gray-700">{message}</p>
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
