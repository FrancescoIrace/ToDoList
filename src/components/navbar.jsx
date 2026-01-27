import {
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import Toggle from "./ui/Toggle";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

export const Navbar = ({ mode, setMode }) => {

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>

        <Typography variant="h6" fontWeight={600}>
          Francesco Irace
        </Typography>

        <Button
          component={NavLink}
          to="/"
          sx={{ "&.active": { borderBottom: "3px solid yellow", bgcolor: "background.paper" }, color: "primary.contrastText", fontWeight: "bold", bgcolor: "secondary.main" }}
        >
          <Typography variant="link">Dashboard</Typography>
        </Button>

        <Button
          component={NavLink}
          to="/cont"
          sx={{ "&.active": { borderBottom: "3px solid yellow", bgcolor: "background.paper" }, color: "primary.contrastText", fontWeight: "bold", bgcolor: "secondary.main" }}
        >
          <Typography variant="link">Contatore</Typography>
        </Button>

        <Button
          component={NavLink}
          to="/todo"
          sx={{ "&.active": { borderBottom: "3px solid yellow", bgcolor: "background.paper" }, color: "primary.contrastText", fontWeight: "bold", bgcolor: "secondary.main" }}
        >
          <Typography variant="link">Note</Typography>

        </Button>

        <Box>
          <Toggle mode={mode} setMode={setMode} />
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
