import React, { createContext, useContext, useState, useEffect } from 'react';

// Premium Light Theme
const lightTheme = {
  mode: 'light',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  primary: '#3B82F6',
  primaryDark: '#2563EB',
  primaryLight: '#DBEAFE',
  accent: '#10B981',
  accentLight: '#D1FAE5',
  text: '#0F172A',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  card: '#FFFFFF',
  inputBg: '#F1F5F9',
  danger: '#EF4444',
  success: '#10B981',
  headerBg: '#FFFFFF',
  headerText: '#0F172A',
  shadow: 'rgba(15, 23, 42, 0.08)',
};

// Premium Dark Theme
const darkTheme = {
  mode: 'dark',
  background: '#0B1120',
  surface: '#1E293B',
  primary: '#60A5FA',
  primaryDark: '#3B82F6',
  primaryLight: '#1E3A8A',
  accent: '#34D399',
  accentLight: '#064E3B',
  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  border: '#334155',
  card: '#1E293B',
  inputBg: '#0F172A',
  danger: '#F87171',
  success: '#34D399',
  headerBg: '#1E293B',
  headerText: '#F8FAFC',
  shadow: 'rgba(0, 0, 0, 0.5)',
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

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
