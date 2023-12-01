import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

//Add/Edit Task Popup
function AddEditModal({
                        type,
                        device,
                        setIsTaskModalOpen,
                        setIsAddTaskModalOpen,
                        taskIndex,
                        prevColIndex = 0,
                      }) {
    
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid] = useState(true);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const board = useSelector((state) => state.boards).find(
      (board) => board.isActive
  );

  const [date, setDate] = useState(new Date());
  const columns = board.columns;
  const col = columns.find((col, index) => index === prevColIndex);
  const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);

  //Moves Tasks When Status Change
  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  //Edits Task
  if (type === "edit" && isFirstLoad) {
    setTitle(task.title);
    setDueDate(task.dueDate)
    setDescription(task.description);
    setIsFirstLoad(false);
  }

  //Updates Task
  const onSubmit = (type) => {
    if (type === "add") {
      dispatch(
          boardsSlice.actions.addTask({
            title,
            dueDate,
            description,
            status,
            newColIndex,
          })
      );
    } else {
      dispatch(
          boardsSlice.actions.editTask({
            title,
            dueDate,
            description,
            status,
            taskIndex,
            prevColIndex,
            newColIndex,
          })
      );
    }
  };

  //Add/Edit Task Format
  return (
      <div
          className = {
            device === "mobile"
                ? " py-20 px-6 pb-40 absolute left-0 flex right-0 bottom-[-100vh] top-0 dropdown"
                : " py-20 px-6 pb-40 absolute left-0 flex right-0 bottom-0 top-0 dropdown"
          }
          onClick = {(e) => {
            if (e.target !== e.currentTarget) {
              return;
            }
            setIsAddTaskModalOpen(false);
          }}
      >
        <div
            className = "scrollbar-hide overflow-y-scroll my-auto bg-[#2b2c37] text-white text-[#007bff] font-bold
       max-w-md mx-auto w-full px-8 py-8 rounded-md"
        >
          <h3 className = "text-lg">
            {type === "edit" ? "Edit" : "Add New"} Task
          </h3>

          {/* Task Name */}
          <div className = "mt-6 flex flex-col space-y-1">
            <label className = "text-sm text-[#007bff]">
              Task Name
            </label>
            <input
                value = { title }
                onChange = {(e) => setTitle(e.target.value)}
                id = "task-name-input"
                type = "text"
                className = "bg-transparent px-2 py-2 outline-none min-h-[30px] resize-y focus:border-0 rounded-md text-sm text-white border-[0.5px] border-gray-600 focus:outline-[#007bff] outline-[1px]"
            />
          </div>

          {/* Due Date */}
          <div className = "mt-6 flex flex-col space-y-1">
            <label className = "text-sm text-[#007bff]">
              Due Date
            </label>
              <div>
                  <DatePicker selected={date} onChange={(date) => setDate(date)} className = "bg-transparent px-2 py-2 outline-none focus:border-0 rounded-md text-sm text-white border-[0.5px] border-gray-600 focus:outline-[#007bff] outline-1 ring-0"/>
              </div>
          </div>

          {/* Description */}
          <div className = "mt-4 flex flex-col space-y-1">
            <label className = "text-sm text-[#007bff]">
              Description
            </label>
            <textarea
                value = {description}
                onChange = {(e) => setDescription(e.target.value)}
                id = "task-description-input"
                className = "bg-transparent px-2 py-2 outline-none min-h-[80px] resize-y focus:border-0 rounded-md text-sm text-white border-[0.5px] border-gray-600 focus:outline-[#007bff] outline-[1px]"
            />
          </div>

          {/* Status  */}
          <div className = "mt-6 flex flex-col space-y-3">
            <label className = "text-sm text-[#007bff]">
              Current Status
            </label>
            <select
                value = {status}
                onChange = {onChangeStatus}
                className = "flex-grow px-2 py-2 rounded-md outline-none text-sm text-white bg-transparent border-[1px] border-gray-500 cursor-pointer"
            >
              {columns.map((column, index) => (
                  <option key = { index }>{ column.name }</option>
              ))}
            </select>
            <button
                onClick = {() => {
                  if (isValid) {
                    onSubmit(type);
                    setIsAddTaskModalOpen(false);
                    type === "edit" && setIsTaskModalOpen(false);
                  }
                }}
                className = "w-full items-center text-white bg-[#007bff] py-2 rounded-full"
            >
              {type === "edit" ? "Save Edit" : "Create task"}
            </button>
          </div>
        </div>
      </div>
  );
}

export default AddEditModal;
