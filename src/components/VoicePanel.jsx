import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mic, Volume2 } from "lucide-react";

function VoicePanel() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.continuous = false;

    recognitionRef.current.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      generateResponse(text);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) return;
    setTranscript("");
    setResponse("");
    setIsListening(true);
    recognitionRef.current.start();
  };

  const generateResponse = (text) => {
    const reply = `I heard you say: "${text}". This is your AI assistant responding intelligently.`;
    setTimeout(() => {
      setResponse(reply);
      speak(reply);
    }, 800);
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="voice-ai-container">

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        🎙 Voice AI Assistant
      </motion.h2>

      <div className="voice-center">

        {/* Animated Circle */}
        <div
          className={`voice-mic ${isListening ? "active" : ""}`}
          onClick={startListening}
        >
          <Mic size={40} />
        </div>

        {/* Waveform */}
        {isListening && (
          <div className="waveform">
            {Array.from({ length: 15 }).map((_, i) => (
              <span key={i}></span>
            ))}
          </div>
        )}

      </div>

      {/* Transcript */}
      {transcript && (
        <div className="voice-text">
          <strong>You:</strong> {transcript}
        </div>
      )}

      {/* AI Response */}
      {response && (
        <motion.div
          className="voice-response"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Volume2 size={16} /> {response}
        </motion.div>
      )}

    </div>
  );
}

export default VoicePanel;