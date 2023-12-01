import React, { useState } from "react";
import AddEditModal from "../modals/AddEditModal";
import Logo from "./Logo.png";

function Header() {

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    return (
      <div className = "p-4 fixed left-0 right-0 bg-[#20212c]">
        <header className = "justify-between flex text-white">
            
          {/* Title & Logo */}
          <div className = "flex space-x-2 font-bold text-2xl">
            <img src = {Logo} alt = "Logo" className = 'h-8 w-8' />
            <h3>
              EasySprint
            </h3>
          </div>
            
            {/* Add Task Icon */}
          <div>
            <button
                onClick = {() => {
                  setIsTaskModalOpen((prevState) => !prevState);
                }}
                className = "button px-3 py-1"
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
                className = "cursor-pointer"
            />
        )}
      </div>
  );
}

export default Header;
