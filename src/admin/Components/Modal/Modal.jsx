import React from "react";

const Modal = ({ isOpen, onClose, title, ModelContent, submit }) => {
  if (!isOpen) return null;

  return (
    <div
      id="hs-scale-animation-modal"
      className="hs-overlay fixed inset-0 z-[80] flex items-center justify-center"
      role="dialog"
      aria-labelledby="hs-scale-animation-modal-label"
      style={{ 'background-color': 'rgba(0, 0, 0, .3)',  'backdrop-filter': 'saturate(180%) blur(10px)' }}
    >
      <div className="hs-overlay-animation-target scale-95 opacity-100 transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto bg-white rounded-2xl shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center py-3 px-4 border-b">
          <h3 id="hs-scale-animation-modal-label" className="font-bold text-gray-800">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="size-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
            aria-label="Close"
          >
            <svg
              className="size-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4">{ModelContent}</div>

        {/* Modal Footer */}
         
               <div className="flex justify-end gap-x-2 py-3 px-4 border-t">
                  <button
                    onClick={onClose}
                    className="py-2 px-3 text-sm font-medium rounded-lg bg-white border border-gray-200 text-gray-800 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button onClick={submit}  className="py-2 px-3 text-sm font-medium rounded-xl bg-[#5764df] text-white hover:bg-[#434dac]">
                    Save
                  </button>
                </div>

      </div>
    </div>
  );
};

export default Modal;
