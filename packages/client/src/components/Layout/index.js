import Sidebar from "./Sidebar";
import "./index.css";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="layout-display">
        <Sidebar />
        <div className="layout-content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
