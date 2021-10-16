import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/themes";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {

  const [isDarkTheme, setIsDarkTheme] = useState('dark');

  useEffect(() => {
    const theme = localStorage.getItem('@lopesnotes_theme');
    if (theme) setIsDarkTheme(theme);
  }, [isDarkTheme])

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      <ThemeProvider theme={isDarkTheme === 'dark' ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {

  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);

  return {
    isDarkTheme,
    setIsDarkTheme
  }
}