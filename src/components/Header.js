import React, { useState } from "react";
import AddEditModal from "../modals/AddEditModal";
import Logo from "./Logo.png";

function Header() {

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    return (
      <div className = "p-4 fixed left-0 bg-[#20212c] z-50 right-0">
        <header className = "flex justify-between text-white items-center">
            
          {/* Title & Logo */}
          <div className = "flex items-center space-x-2 font-bold text-2xl">
            <img src = {Logo} alt = "Logo" className = 'h-8 w-8' />
            <h3>
              EasySprint
            </h3>
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
                className = "cursor-pointer"
            />
        )}
      </div>
  );
}

export default Header;
