import React, { useState } from "react";
import Modal from "./components/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Confirm handler
  const handleConfirm = (result) => {
    if (result.isValid) {
      console.log("Valid Input:", result.value);
    } else {
      console.log("Invalid Input: Input is empty");
    }
    closeModal();
  };

  const modalConfig = {
    title: "Basic Modal",
    size: "md", // "sm", "md", "lg"
    showHeader: true,
    showCloseButton: true,
    showFooter: true, 
    enableEscapeKey: true,
    closeOnOutsideClick: true,
    buttonType: "both", // "cancel", "none", "both"
    children: (
      <input
        type="text"
        placeholder="Enter something..."
        className="form-control"
      />
    ),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto text-center">
        <h1 className="text-lg font-semibold mb-3">Modal Demo</h1>

        <button onClick={openModal} className="btn btn-primary">
          Open Modal
        </button>
      </div>

      <Modal
        {...modalConfig}
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

export default App;
