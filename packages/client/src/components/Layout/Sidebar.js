import React from "react";
import "../SpreadSheet/index.css";

const SIDEBAR_CLASSES = {
  "sidebar-container": "collapsed-sidebar",
  "collapsed-sidebar": "sidebar-container",
};

const Sidebar = () => {
  return (
    <div className="sidebar">
      <button className="collapse-button">
        <img src={"../../kordis-logo.png"} />
      </button>
    </div>
  );
};

export default Sidebar;
