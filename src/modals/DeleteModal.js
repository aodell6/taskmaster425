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
      className = "fixed right-0 top-0 px-2 py-4 z-50 left-0 bottom-0 justify-center items-center flex dropdown"
    >
      {/* Delete Button */}
      <div className = "max-h-[95vh] my-auto bg-[#2b2c37] text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-x">
        <h3 className = "font-bold text-[#007bff] text-xl">
          Delete this task?
        </h3>
        <div className = "flex w-full mt-4 items-center justify-center space-x-4">
          <button
            onClick = { onDeleteBtnClick}
            className = "w-full items-center text-white bg-[#007bff] py-2 rounded-full"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
