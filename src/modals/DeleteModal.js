import React from "react";

//Delete Task Popup
function DeleteModal({ onDeleteBtnClick, setIsDeleteModalOpen }) {
  return (
    <div
      onClick = {(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsDeleteModalOpen(false);
      }}
      className = "fixed right-0 left-0"
    >
      {/* Delete Button */}
      <div className = "bg-[#2b2c37] text-white font-bold max-w-md mx-auto px-4 py-8 rounded-xl">
        <h3 className = "font-bold text-[#007bff] text-xl px-8">
          Delete this task?
        </h3>
        <div className = "mt-8">
          <button
            onClick = { onDeleteBtnClick }
            className = "w-full text-black bg-[#007bff] py-2 rounded-full"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
