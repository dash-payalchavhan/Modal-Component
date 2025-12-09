import React, { useState } from "react";
import Modal from "./components/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const modalConfig = {
    title: "Basic Modal",
    size: "md", //       (Options: 'sm', 'md', 'lg', 'xl')
    showHeader: true,
    showCloseButton: true,
    showFooter: true,
    enableEscapeKey: true,
    closeOnOutsideClick: true,
    buttonType: "both", //    (both | cancel | confirm | none)
    children: (
        <input
             type="text"
             placeholder="Enter something..."
             className="form-control"
        />
)

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md text-center mx-auto m-5">
          <h1 className="text-lg font-semibold mb-3">Modal Demo</h1>
          <button onClick={openModal} className="w-full px-4 py-2 bg-yellow-600 text-black rounded-md hover:bg-blue-700 transition-colors">
            Open Modal
          </button>
        </div>

        <Modal
          {...modalConfig}
          isOpen={isModalOpen}
          onClose={closeModal}
       

          onConfirm={(value) => {
            if (value === true) {
              console.log("Valid Input:", value); // if input is filled
            } 
            else {
              console.log("Invalid Input: Input is empty"); // if input is empty
            }
            closeModal();
          }}
        />
      </div>
    </div>
  );
}

export default App;

//option dena he buttons ka
// 1 to dikhega 2 to option dega if true to 2 dikhega
// data dalenge to wo console krdena
