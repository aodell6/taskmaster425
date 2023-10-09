import React, { useState } from "react";
import AddEditModal from "../modals/AddEditModal";
import ThemeSelect from "./ThemeSelect";
import { Switch } from "@headlessui/react";
import { GiHaunting, GiRaiseZombie } from "react-icons/gi";
import { GiMoonClaws, GiMoonBats } from "react-icons/gi";

function Header() {

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    //
    // // Sets Up Theme Toggle
    // const [colorTheme, setTheme] = ThemeSelect();
    // const [darkSide, setDarkSide] = useState(
    //     colorTheme === "light" ? true : false
    // );
    //
    // const toggleDarkMode = (checked) => {
    //     setTheme(colorTheme);
    //     setDarkSide(checked);
    // };


    return (
      <div className = "p-4 fixed left-0 bg-slate-100 dark:bg-[#20212c] z-50 right-0">
        <header className = "flex justify-between dark:text-white items-center">

          {/* Title & Icons */}
          <div className = "flex items-center space-x-2 font-bold text-2xl">
            <GiHaunting size = {40} color = "#b91c1c" />
            <h3>
              Task Management
            </h3>
            <GiRaiseZombie size = {40} color = "#b91c1c" />
          </div>

            {/*/!* Theme Toggle *!/*/}
            {/*<div className = "mx-2 p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">*/}
            {/*    <GiMoonClaws size = {30}/>*/}
            {/*    <Switch*/}
            {/*        checked = { darkSide }*/}
            {/*        onChange = { toggleDarkMode }*/}
            {/*        className = {`${*/}
            {/*            darkSide ? "bg-[#b91c1c]" : "bg-gray-200"*/}
            {/*        } relative inline-flex h-6 w-11 items-center rounded-full`}*/}
            {/*    >*/}
            {/*        <span*/}
            {/*            className = {`${*/}
            {/*                darkSide ? "translate-x-6" : "translate-x-1"*/}
            {/*            } inline-block h-4 w-4 transform rounded-full bg-white transition`}*/}
            {/*        />*/}
            {/*    </Switch>*/}
            {/*    <GiMoonBats size = {30}/>*/}
            {/*</div>*/}

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
