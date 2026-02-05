import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") ?? "dark";
  });

  useEffect(() => {
    // Listen for custom theme change event
    const handleThemeChange = (event) => {
      const newTheme = event.detail ?? localStorage.getItem("theme") ?? "dark";
      setTheme(newTheme);
    };

    window.addEventListener("themeChange", handleThemeChange);
    return () => window.removeEventListener("themeChange", handleThemeChange);
  }, []);

  return theme;
};
