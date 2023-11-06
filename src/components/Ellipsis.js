import React from "react";

//Gives Edit/Delete Task Options When Clicked
function Ellipsis({ type, setOpenEditModal, setOpenDeleteModal }) {
  return (
      <div
          className = {
            type === "Board"
                ? " absolute top-16 right-5"
                : " absolute top-6 right-4"
          }
      >
        <div>
          <div className = "w-40 text-sm z-50 font-medium bg-[#20212c] space-y-4 py-5 px-4 rounded-lg  h-auto pr-12">
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
