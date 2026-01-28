import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeContext } from "../../context/ThemeContext";

export function Toggle() {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <IconButton
      onClick={() =>
        toggleTheme()
      }
    >
      {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};

export default Toggle;
