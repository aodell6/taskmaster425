import React, { useState } from "react";
import { useSelector } from "react-redux";
import Column from "./Column";

function Body() {
  const [windowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  return (
      // Formats Columns
      <div
          className = {
            windowSize[0] >= 768
                ? "scrollbar-hide h-screen flex bg-[#20212c] overflow-x-scroll gap-12"
                : "scrollbar-hide h-screen flex bg-[#20212c] overflow-x-scroll gap-12"
          }
      >
        {/* Adds Columns */}
        {columns.length > 0 ? (
            <>
              {columns.map((col, index) => (
                  <Column key = {index} colIndex = {index} />
              ))}
            </>
        ) : (
            <>
            </>
        )}
      </div>
  );
}

export default Body;