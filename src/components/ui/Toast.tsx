import React from "react";
import { toast, type Toast } from "react-hot-toast";
import { CheckCircle, Error, Info, Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles"; // استيراد الثيم حق MUI

interface ToastProps {
  t: Toast;
  message: string;
  type?: "success" | "error" | "info";
}

const MyToast: React.FC<ToastProps> = ({ t, message, type = "success" }) => {
  const { i18n } = useTranslation();
  const theme = useTheme(); // قراءة الثيم الحالي (Light أو Dark)
  const isRtl = i18n.language === "ar";

  // التحقق يدوياً هل نحن في وضع الدارك
  const isDark = theme.palette.mode === "dark";

  const config = {
    success: {
      icon: <CheckCircle className="text-emerald-500" />,
      bar: "bg-emerald-500",
    },
    error: { icon: <Error className="text-rose-500" />, bar: "bg-rose-500" },
    info: { icon: <Info className="text-blue-500" />, bar: "bg-blue-500" },
  }[type];

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={`${t.visible ? "animate-enter" : "animate-leave"} 
        max-w-md w-full flex shadow-2xl rounded-2xl border transition-all duration-300
        backdrop-blur-xl pointer-events-auto overflow-hidden`}
      style={{
        // إجبار الألوان بناءً على حالة الثيم في MUI
        backgroundColor: isDark
          ? "rgba(18, 18, 18, 0.8)"
          : "rgba(255, 255, 255, 0.9)",
        borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        color: isDark ? "#ffffff" : "#1a1a1a",
      }}
    >
      {/* شريط جانبي */}
      <div className={`w-2 ${config.bar} shrink-0`} />

      <div className="flex-1 p-4 flex items-center gap-3">
        <div className="scale-110">{config.icon}</div>
        <p className="text-sm font-bold leading-tight flex-1">{message}</p>
      </div>

      <button
        onClick={() => toast.dismiss(t.id)}
        className="px-4 border-s border-white/5 transition-colors"
        style={{
          borderColor: isDark
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)",
        }}
      >
        <Close
          sx={{
            fontSize: 18,
            color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
          }}
        />
      </button>
    </div>
  );
};

export default MyToast;
