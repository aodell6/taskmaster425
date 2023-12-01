import React from "react";

//Gives Edit/Delete Task Options When Clicked
function Ellipsis({ type, setOpenEditModal, setOpenDeleteModal }) {
  return (
      <div
          className = {
            type === "Board"
                ? "absolute top-16 right-5"
                : "absolute top-6 right-4"
          }
      >
        <div>
          <div className = "text-sm font-medium bg-[#20212c] space-y-4 py-4 px-4 rounded-xl">
            <p
                onClick = {() => {
                  setOpenEditModal();
                }}
                className = "cursor-pointer text-gray-400"
            >
              Edit Task
            </p>

            <p
                onClick = {() => setOpenDeleteModal()}
                className = "cursor-pointer text-red-500"
            >
              Delete Task
            </p>
          </div>
        </div>
      </div>
  );
}

export default Ellipsis;
