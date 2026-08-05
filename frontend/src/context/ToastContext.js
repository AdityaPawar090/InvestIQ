import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const ToastContext = createContext({ showToast: () => {} });

const TYPE_STYLES = {
  success: { bg: "linear-gradient(135deg,#6ee7b7,#34d399)", icon: "✅", color: "#06331f" },
  error: { bg: "linear-gradient(135deg,#fca5a5,#f87171)", icon: "⚠️", color: "#4c0519" },
  info: { bg: "linear-gradient(135deg,#60A5FA,#3B82F6)", icon: "💡", color: "#0c2f5c" },
};

const ToastItem = ({ toast, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  const style = TYPE_STYLES[toast.type] || TYPE_STYLES.info;

  return (
    <div
      style={{
        background: style.bg,
        color: style.color,
        padding: "14px 18px",
        borderRadius: 14,
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        minWidth: 260,
        maxWidth: 340,
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontWeight: 600,
        animation: "iq-toast-in 0.25s ease",
      }}
    >
      <span style={{ fontSize: 18 }}>{style.icon}</span>
      <span>{toast.message}</span>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 2000,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDone={() => removeToast(t.id)} />
        ))}
      </div>
      <style>{`
        @keyframes iq-toast-in {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
