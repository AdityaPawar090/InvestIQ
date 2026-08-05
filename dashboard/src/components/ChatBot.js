import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

// Browser speech recognition (Chrome/Edge). Falls back gracefully if unsupported.
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const ChatBot = () => {
  const { showToast } = useContext(GeneralContext);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! Ask me anything about your portfolio or the markets." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const sendMessage = async (text) => {
    const message = text.trim();
    if (!message) return;

    setMessages((m) => [...m, { role: "user", text: message }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3002/api/ai/chat",
        { message },
        { withCredentials: true }
      );
      setMessages((m) => [...m, { role: "assistant", text: res.data.reply }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: err.response?.data?.message || "Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const startVoiceInput = () => {
    if (!SpeechRecognition) {
      showToast?.(
        "Voice input needs Chrome or Edge on http://localhost",
        "error"
      );
      return;
    }

    if (listening) return; // already listening, ignore repeat clicks

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onerror = (event) => {
      setListening(false);
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        showToast?.("Microphone access blocked — allow mic permissions and retry", "error");
      } else if (event.error === "no-speech") {
        showToast?.("Didn't catch that — try again", "info");
      } else {
        showToast?.(`Voice input error: ${event.error}`, "error");
      }
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      sendMessage(transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div className="card iq-chatbot-card">
      <h2>💬 AI Investment Chatbot</h2>
      <p className="iq-muted">Type or use the 🎤 mic to ask about your portfolio.</p>

      <div className="iq-chat-window">
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.role === "user" ? "right" : "left",
              margin: "8px 0",
            }}
          >
            <span className={m.role === "user" ? "iq-bubble iq-bubble-user" : "iq-bubble iq-bubble-assistant"}>
              {m.text}
            </span>
          </div>
        ))}
        {loading && <p className="iq-muted">Thinking…</p>}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <input
          className="form-control"
          placeholder="Ask about your portfolio…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
        />
        <button
          className={listening ? "btn btn-light border iq-mic-active" : "btn btn-light border"}
          onClick={startVoiceInput}
          title="Voice input"
        >
          🎤
        </button>
        <button className="btn btn-blue" onClick={() => sendMessage(input)} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
