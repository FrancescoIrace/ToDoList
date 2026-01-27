import { Box, Container } from "@mui/material";
import { Footer } from "./Footer";
import { Navbar } from "./navbar";

//un layout wrapper per gestire la struttura globale e mantenere separata la logica dal layout.
export const MainLayout = ({ children, mode, setMode }) => (
    <Container

        sx={{
            minHeight: "100vh",
            minWidth: "100vw",
            display: "flex",
            flexDirection: "column",
            paddingLeft: "2px !important",
            paddingRight: "2px !important",
        }}
    >
        {/* <Header /> */}
        <Navbar mode={mode} setMode={setMode} />

        {/* <Outlet /> */}
        <Box sx={{ flex: 1 }}>
            {children}
        </Box>

        {/* <Footer /> */}
        <Footer />

    </Container>
);
