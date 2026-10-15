import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic } from "lucide-react";
import { useRef } from "react";


import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import VoicePanel from "./components/VoicePanel";
import ChatPanel from "./components/ChatPanel";
import Documents from "./components/Documents";
import Settings from "./components/Settings";


import "./App.css";

/* ROUTES */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{ height: "100%" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/voice" element={<VoicePanel />} />
          <Route path="/chat" element={<ChatPanel />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

/* MAIN LAYOUT */
function Layout() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState("");

  const startListening = () => {
    console.log("START LISTENING");

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log("Recognition started");
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("Heard:", transcript);
      setLastCommand(transcript);

      if (transcript.includes("dashboard")) {
        navigate("/");
      } else if (transcript.includes("chat")) {
        navigate("/chat");
      } else if (transcript.includes("documents")) {
        navigate("/documents");
      } else if (transcript.includes("settings")) {
        navigate("/settings");
      } else if (transcript.includes("voice")) {
        navigate("/voice");
      } else if (transcript.includes("dark mode")) {
        document.body.classList.add("dark-mode");
      } else if (transcript.includes("light mode")) {
        document.body.classList.remove("dark-mode");
      }
    };

    recognition.onend = () => {
      console.log("Recognition ended");
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />
        <div className="page-content">
          <AnimatedRoutes />
        </div>
      </div>

      <div
  className={`global-voice-btn ${isListening ? "listening" : ""}`}
  onClick={() => {
    console.log("MIC CLICKED");

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log("Recognition started");
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("Heard:", transcript);
      setLastCommand(transcript);

      if (transcript.includes("dashboard")) navigate("/");
      else if (transcript.includes("chat")) navigate("/chat");
      else if (transcript.includes("documents")) navigate("/documents");
      else if (transcript.includes("settings")) navigate("/settings");
      else if (transcript.includes("voice")) navigate("/voice");
    };

    recognition.onend = () => {
      console.log("Recognition ended");
      setIsListening(false);
    };

    recognition.onerror = (e) => {
      console.error("Speech error:", e.error);
    };

    recognition.start(); // MUST be inside click
  }}
>
  <Mic size={24} />
</div>
      {isListening && (
        <div className="voice-overlay">
          🎤 Listening...
          <p>{lastCommand}</p>
        </div>
      )}
    </div>
  );
}
/* ROOT */
function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
  {!user ? (
    <Login setUser={setUser} />
  ) : (
    <Layout />
  )}
</Router>
  );
}

export default App;
