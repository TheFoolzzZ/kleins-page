"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
    theme: "cyber",
    toggleTheme: () => {},
    setTheme: () => {},
});

const STORAGE_KEY = "site-theme";

export function ThemeProvider({ children }) {
    // The inline script in layout.tsx sets data-theme before paint, so read it
    // as the initial state (falls back to cyber on the server).
    const [theme, setThemeState] = useState(() => {
        if (typeof document !== "undefined") {
            const t = document.documentElement.getAttribute("data-theme");
            if (t === "paper" || t === "cyber") return t;
        }
        return "cyber";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        window.localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    const setTheme = (next) => {
        if (next === "paper" || next === "cyber") setThemeState(next);
    };

    const toggleTheme = () =>
        setThemeState((t) => (t === "cyber" ? "paper" : "cyber"));

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
