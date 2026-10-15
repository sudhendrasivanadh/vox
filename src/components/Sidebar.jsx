import { NavLink } from "react-router-dom";
import { LayoutDashboard, Mic, MessageSquare, FileText, Settings } from "lucide-react";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">VoxAssist</h2>

      <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <LayoutDashboard size={18} /> Dashboard
      </NavLink>

      <NavLink to="/voice" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <Mic size={18} /> Voice AI
      </NavLink>

      <NavLink to="/chat" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <MessageSquare size={18} /> AI Chat
      </NavLink>

      <NavLink to="/documents" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <FileText size={18} /> Documents
      </NavLink>

      <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <Settings size={18} /> Settings
      </NavLink>
    </div>
  );
}

export default Sidebar;
