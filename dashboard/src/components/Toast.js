import React, { useEffect } from "react";

const TYPE_STYLES = {
  success: { bg: "linear-gradient(135deg,#34d399,#10b981)", icon: "✅" },
  error: { bg: "linear-gradient(135deg,#fb7185,#ef4444)", icon: "⚠️" },
  info: { bg: "linear-gradient(135deg,#3B82F6,#2563EB)", icon: "💡" },
};

const Toast = ({ toasts, removeToast }) => {
  return (
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
  );
};

const ToastItem = ({ toast, onDone }) => {
  useEffect(() => {
    const timer = setTimeout(onDone, 2600);
    return () => clearTimeout(timer);
  }, [onDone]);

  const style = TYPE_STYLES[toast.type] || TYPE_STYLES.info;

  return (
    <div
      style={{
        background: style.bg,
        color: "#fff",
        padding: "14px 18px",
        borderRadius: 14,
        boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
        minWidth: 260,
        maxWidth: 340,
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontWeight: 500,
        animation: "iq-toast-in 0.25s ease",
      }}
    >
      <span style={{ fontSize: 18 }}>{style.icon}</span>
      <span>{toast.message}</span>
    </div>
  );
};

export default Toast;
