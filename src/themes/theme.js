import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) => createTheme({
    palette: {
        primary: {
            main: mode === "dark" ? "#949494" : "#374cbf",
            contrastText: mode === "dark" ? "#f5f5f5" : "#121212",
            hoverLink: mode === "dark" ? "#f5f5f5" : "#0d2cdd",
        },
        secondary: {
            main: mode === "dark" ? "#3c3939" : "#7181db",
        },
        attenzione: {
            main: "#ff0000",
        },
        background: {
            default: mode === "dark" ? "#272727" : "#f5f5f5",
            paper: mode === "dark" ? "#272727" : "#f5f5f5",
        }
    },
    typography: {
        fontFamily: "sans-serif",
        h1: {
            fontWeight: "600",
            fontStyle: "normal",
            color: mode === "dark" ? "#f5f5f5" : "#121212",
        },
        h2: {
            fontSize: "3rem",
            fontWeight: "600",
            fontStyle: "normal",
            color: mode === "dark" ? "#f5f5f5" : "#121212",
        },
        h3: {
            fontSize: "3rem",
            fontWeight: "600",
            fontStyle: "normal",
            color: mode === "dark" ? "#f5f5f5" : "#121212",
        },
        p: {
            fontWeight: "400",
            fontStyle: "normal",
            color: mode === "dark" ? "#f5f5f5" : "#121212",
        },
        link: {
            fontWeight: "600",
            fontStyle: "normal",
            color: mode === "dark" ? "#f5f5f5" : "#121212",
        },
    },
    shape: {
        borderRadius: 12,
        borderColor: "#4f36ba",
        borderStyle: "solid",
        borderWidth: "1px",
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
            xxl: 1920,
            xxxl: 2560
        },
    }

});