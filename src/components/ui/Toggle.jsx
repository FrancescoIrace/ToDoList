import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export const Toggle = ({ mode, setMode }) => {
  return (
    <IconButton
      onClick={() =>
        setMode((prev) => (prev === "light" ? "dark" : "light"))
      }
    >
      {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};

export default Toggle;
