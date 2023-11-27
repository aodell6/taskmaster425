import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ellipsis from "../components/Ellipsis";
import { FaEllipsisVertical } from "react-icons/fa6";
import boardsSlice from "../redux/boardsSlice";
import AddEditModal from "./AddEditModal";
import DeleteModal from "./DeleteModal";

//Sets Up Clicked On Task
function TaskModal({ taskIndex, colIndex, setIsTaskModalOpen }) {
  const dispatch = useDispatch();
  const [isEllipsisMenuOpen, setIsEllipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);

  const [status] = useState(task.status);
  const [newColIndex] = useState(columns.indexOf(col));

  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    dispatch(
        boardsSlice.actions.setTaskStatus({
          taskIndex,
          colIndex,
          newColIndex,
          status,
        })
    );
    setIsTaskModalOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteTask({ taskIndex, colIndex }));
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setIsEllipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsEllipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  return (
      <div
          onClick = { onClose }
          className = "fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown"
      >
        <div className = "max-h-[95vh] my-auto bg-[#2b2c37] text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl">
          <div className = "relative flex justify-between w-full items-center">
            <h1 className = "text-lg">{task.title}</h1>

            <FaEllipsisVertical
                onClick = {() => {
                  setIsEllipsisMenuOpen((prevState) => !prevState);
                }}
                size = {28} color = "#007bff"
                className = "cursor-pointer"
            />

            {isEllipsisMenuOpen && (
                <Ellipsis
                    setOpenEditModal = { setOpenEditModal }
                    setOpenDeleteModal = { setOpenDeleteModal }
                    type = "Task"
                />
            )}

          </div>
          <p className = "text-gray-500 font-[600] tracking-wide text-xs pt-6">
            Due Date: { task.dueDate }
          </p>
          <p className = "text-gray-500 font-[600] tracking-wide text-xs pt-6">
            Description: { task.description }
          </p>
        </div>

        {/*Delete Popup*/}
        {isDeleteModalOpen && (
            <DeleteModal
                setIsDeleteModalOpen = { setIsDeleteModalOpen }
                setIsTaskModalOpen = { setIsTaskModalOpen }
                onDeleteBtnClick = { onDeleteBtnClick }
                type = "task"
                title = { task.title }
            />
        )}

        {/*Edit Popup*/}
        {isAddTaskModalOpen && (
            <AddEditModal
                setIsAddTaskModalOpen = { setIsAddTaskModalOpen }
                setIsTaskModalOpen = { setIsTaskModalOpen }
                type = "edit"
                taskIndex = { taskIndex }
                prevColIndex = { colIndex }
            />
        )}
      </div>
  );
}

export default TaskModal;
