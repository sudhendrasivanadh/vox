import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ChatPanel() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    simulateAIResponse();
  };

  const simulateAIResponse = () => {
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "This is an advanced AI response from VoxAssist with smooth streaming and typing effects."
        }
      ]);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className="chat-container">

      <div className="chat-header">
        <h3>🤖 VoxAssist AI</h3>
        <span>Online</span>
      </div>

      <div className="chat-body" ref={messagesRef}>
        {messages.length === 0 && (
          <div className="chat-empty-state">
            Ask anything to get started ✨
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`chat-bubble ${msg.role}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {msg.content}
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>

      <div className="chat-footer">
        <input
          value={input}
          placeholder="Ask VoxAssist..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

    </div>
  );
}

export default ChatPanel;