import { createContext } from 'react';

// interface ThemeContextValue {
//   username: string;
//   setUsername: React.Dispatch<React.SetStateAction<string>>;
// }
// export const ThemeContext = createContext<ThemeContextValue | undefined>(
//   undefined
// );

export const ThemeContext = createContext({
  theme: '',
  toggleTheme: () => {}
});
