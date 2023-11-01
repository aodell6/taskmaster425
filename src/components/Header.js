import React, { useState } from "react";
import AddEditModal from "../modals/AddEditModal";
import { GiHaunting, GiRaiseZombie } from "react-icons/gi";
import { GiMoonClaws, GiMoonBats } from "react-icons/gi";

function Header() {

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    return (
      <div className = "p-4 fixed left-0 bg-slate-100 dark:bg-[#20212c] z-50 right-0">
        <header className = "flex justify-between dark:text-white items-center">

          {/* Title & Icons */}
          <div className = "flex items-center space-x-2 font-bold text-2xl">
            <GiHaunting size = {40} color = "#007bff" />
            <h3>
              Task Management
            </h3>
            <GiRaiseZombie size = {40} color = "#007bff" />
          </div>

            {/* Add Task Icon */}
          <div className = "flex space-x-4 items-center md:space-x-6">
            <button
                onClick = {() => {
                  setIsTaskModalOpen((prevState) => !prevState);
                }}
                className = "button py-1 px-3"
            >
              +
            </button>
          </div>
        </header>

        {/* Opens Add Task */}
        {isTaskModalOpen && (
            <AddEditModal
                setIsAddTaskModalOpen = { setIsTaskModalOpen }
                type = "add"
                device = "mobile"
            />
        )}
      </div>
  );
}

export default Header;
