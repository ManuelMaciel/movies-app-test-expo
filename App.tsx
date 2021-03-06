
import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';
import React, { useMemo, useState } from "react";
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Provider as PaperProvider,
  DarkTheme as DarkThemePaper,
  DefaultTheme as DefaultThemePaper,
} from "react-native-paper";

import { PreferencesContext } from './context';
import useCachedResources from './hooks/useCachedResources';
import { Navigation } from './navigation';

export default function App() {
  const [theme, setTheme] = useState("dark");

  DefaultThemePaper.colors.primary = "#1ae1f2";
  DarkThemePaper.colors.primary = "#1ae1f2";
  DarkThemePaper.colors.accent = "#1ae1f2";

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const preference = useMemo(
    () => ({
      toggleTheme,
      theme,
    }),
    [theme],
  );

  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PreferencesContext.Provider value={preference}>
        <PaperProvider theme={theme === "dark" ? DarkThemePaper : DefaultThemePaper}>
          <Navigation/>
          <StatusBar />
        </PaperProvider>
    </PreferencesContext.Provider>
    );
  }
}

registerRootComponent(App);
