import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { ThemeProvider, createTheme, type PaletteMode } from "@mui/material";

interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: PaletteMode;
}

const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: "dark",
});

export const MyThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedMode = localStorage.getItem("nmt_theme");
    return (savedMode as PaletteMode) || "dark";
  });

  useEffect(() => {
    localStorage.setItem("nmt_theme", mode);
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode],
  );

  const theme = useMemo(() => {
    const isDark = mode === "dark";

    return createTheme({
      palette: {
        mode,
        primary: {
          // استخدام قيم الـ Hex الصريحة من الـ CSS ليرتاح MUI
          main: isDark ? "#f86238" : "#eb5325",
          contrastText: "#fff",
        },
        background: {
          // قيم Hex صريحة بدلاً من var()
          default: isDark ? "#030712" : "#fcfcfd",
          paper: isDark ? "#0f172a" : "#ffffff",
        },
        text: {
          primary: isDark ? "#f8fafc" : "#0f172a",
          secondary: isDark ? "#94a3b8" : "#64748b",
        },
        // أهم نقطة: حل مشكلة الـ Divider
        divider: isDark ? "rgba(30, 41, 59, 1)" : "rgba(241, 245, 249, 1)",
      },
      shape: {
        borderRadius: 16,
      },
      components: {
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundImage: "none",
              // هنا نستخدم var لأننا نكتب CSS يدوي في الـ override وليس في الـ palette
              backgroundColor: "var(--glass-bg)",
              backdropFilter: "blur(12px)",
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: "none",
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 12,
            },
          },
        },
      },
    });
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useColorMode = () => useContext(ColorModeContext);
