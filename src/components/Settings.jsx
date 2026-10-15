import { useState } from "react";
import { motion } from "framer-motion";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoVoice, setAutoVoice] = useState(false);
  const [responseLength, setResponseLength] = useState("medium");
  const [accentColor, setAccentColor] = useState("#0071e3");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className="settings-container">

      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ⚙ AI Workspace Settings
      </motion.h2>

      {/* PROFILE CARD */}
      <motion.div
        className="settings-panel"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3>👤 Profile</h3>

        <div className="settings-grid">
          <input placeholder="Full Name" defaultValue="Dheeraj" />
          <input placeholder="Email" defaultValue="dheeraj@email.com" />
        </div>

        <button className="primary-btn">Update Profile</button>
      </motion.div>

      {/* APPEARANCE */}
      <motion.div
        className="settings-panel"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3>🎨 Appearance</h3>

        <div className="settings-row">
          <span>Dark Mode</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="settings-row">
          <span>Accent Color</span>
          <input
            type="color"
            value={accentColor}
            onChange={(e) => {
              setAccentColor(e.target.value);
              document.documentElement.style.setProperty(
                "--accent",
                e.target.value
              );
            }}
          />
        </div>
      </motion.div>

      {/* AI SETTINGS */}
      <motion.div
        className="settings-panel"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3>🧠 AI Preferences</h3>

        <div className="settings-row">
          <span>Enable Notifications</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </div>

        <div className="settings-row">
          <span>Auto Voice Reply</span>
          <input
            type="checkbox"
            checked={autoVoice}
            onChange={() => setAutoVoice(!autoVoice)}
          />
        </div>

        <select
          value={responseLength}
          onChange={(e) => setResponseLength(e.target.value)}
        >
          <option value="short">Short Responses</option>
          <option value="medium">Medium Responses</option>
          <option value="detailed">Detailed Responses</option>
        </select>

        <button className="primary-btn">Save AI Settings</button>
      </motion.div>

    </div>
  );
}

export default Settings;