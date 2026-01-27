import { Box, Container } from "@mui/material";
import { Footer } from "./Footer";
import { Navbar } from "./navbar";

//un layout wrapper per gestire la struttura globale e mantenere separata la logica dal layout.
export const MainLayout = ({ children, mode, setMode }) => (
    <div
        className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col"
    >
        {/* <Header /> */}
        <Navbar mode={mode} setMode={setMode} />

        {/* <Outlet /> */}
        <Box sx={{ flex: 1 }}>
            {children}
        </Box>

        {/* <Footer /> */}
        <Footer />

    </div>
);
