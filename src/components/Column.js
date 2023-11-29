import React from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import Task from "./Task";

function Column({ colIndex }) {

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((col, i) => i === colIndex);

  //Adds Drag and Drop
  const handleOnDrop = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(
        e.dataTransfer.getData("text")
    );

    if (colIndex !== prevColIndex) {
      dispatch(
          boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex })
      );
    }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
      <div
          onDrop = {handleOnDrop}
          onDragOver = {handleOnDragOver}
          // Columns Under Header
          className = "mx-5 pt-[90px] min-w-[280px]"
      >
        {/*Adds Columns to Board*/}
        <p className = "flex tracking-widest text-[#007bff]">
          {col.name} ({col.tasks.length})
        </p>

        {col.tasks.map((task, index) => (
            <Task key = {index} taskIndex = {index} colIndex = {colIndex} />
        ))}
      </div>
  );
}

export default Column;
