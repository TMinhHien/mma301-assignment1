import React, { createContext, useContext, useState } from 'react';

// Light Theme Design Tokens
const lightTheme = {
  mode: 'light',
  background: '#F5F7FA',
  surface: '#FFFFFF',
  primary: '#4A90D9',
  primaryDark: '#2C6FAC',
  accent: '#7BC8A4',
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  card: '#FFFFFF',
  inputBg: '#F9FAFB',
  danger: '#EF4444',
  success: '#10B981',
  headerBg: '#FFFFFF',
  headerText: '#1A1A2E',
  shadow: '#00000015',
};

// Dark Theme Design Tokens
const darkTheme = {
  mode: 'dark',
  background: '#0F172A',
  surface: '#1E293B',
  primary: '#60A5FA',
  primaryDark: '#3B82F6',
  accent: '#34D399',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  border: '#334155',
  card: '#1E293B',
  inputBg: '#0F172A',
  danger: '#F87171',
  success: '#34D399',
  headerBg: '#1E293B',
  headerText: '#F1F5F9',
  shadow: '#00000040',
};

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(prev => !prev);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook để dùng theme dễ hơn
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
