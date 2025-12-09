import React, { useState } from "react";
import Modal from "./components/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalConfig = {
    title: "Basic Modal",
    size: "md",
    showHeader: true,
    showCloseButton: true,
    showFooter: true,
    enableEscapeKey: true,
    closeOnOutsideClick: true,
    buttonType: "both",
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
       <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
  Open Modal
</button>

      </div>

      <Modal
        {...modalConfig}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={(result) => {
          if (result.isValid) {
            console.log("Valid Input:", result.value);
          } else {
            console.log("Invalid Input: Input is empty");
          }
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}

export default App;

//option dena he buttons ka
// 1 to dikhega 2 to option dega if true to 2 dikhega
// data dalenge to wo console krdena
