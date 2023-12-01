import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../modals/TaskModal";

function Task({ colIndex, taskIndex }) {
    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive === true);
    const columns = board.columns;
    const col = columns.find((col, i) => i === colIndex);
    const task = col.tasks.find((task, i) => i === taskIndex);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    //Drag Task Between Columns
    const handleOnDrag = (e) => {
        e.dataTransfer.setData(
            "text",
            JSON.stringify({ taskIndex, prevColIndex: colIndex })
        );
    };

    return (
        <div>
            {/* Opens Task When Clicked */}
            <div
                onClick = {() => {
                    setIsTaskModalOpen(true);
                }}
                draggable
                onDragStart = {handleOnDrag}
                className = "first:my-6 rounded-lg bg-[#2b2c37] py-6 px-4 text-white cursor-pointer"
            >
                <p className = "font-bold tracking-wide">{task.title}</p>
            </div>
            {isTaskModalOpen && (
                <TaskModal
                    colIndex = {colIndex}
                    taskIndex = {taskIndex}
                    setIsTaskModalOpen = {setIsTaskModalOpen}
                />
            )}
        </div>
    );
}

export default Task;
