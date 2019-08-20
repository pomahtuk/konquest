import React, { ReactElement, ReactNode } from "react";
import baseTheme, { Theme } from "./base.theme";

export const ThemeContext: React.Context<Theme> = React.createContext(baseTheme);

export interface ThemeProviderProps {
  theme: Theme;
  children: ReactNode;
}

const ThemeProvider = ({ theme, children }: ThemeProviderProps): ReactElement => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);

export default ThemeProvider;
