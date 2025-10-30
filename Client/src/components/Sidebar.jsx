import React from "react";

const Sidebar = ({ isOpen, handleSidebarToggle }) => {
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-1" type="checkbox" className="drawer-toggle" checked={isOpen} />
      <div className="drawer-side">
        <ul className="menu min-h-full w-80 p-4 bg-white">
          <button onClick={handleSidebarToggle} className="mb-4 text-gray-600 hover:text-gray-800">
            Close
          </button>
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
