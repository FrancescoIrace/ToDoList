import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getTheme } from '../themes/theme'; // Il tuo file dei temi MUI

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
    const [mode, setMode] = useState('light');

    //Sincronizziamo Tailwind con la classe dark
    useEffect(() => {
        console.log("Il tema attuale è:", mode);
        const root = window.document.documentElement;
        if (mode === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [mode]);

    //momorizziamo il tema
    const muiTheme = useMemo(() => getTheme(mode), [mode]);

    const toggleTheme = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={muiTheme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export const useThemeContext = () => useContext(ThemeContext);