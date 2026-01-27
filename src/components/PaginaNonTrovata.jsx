import {Container, Box, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const PaginaNonTrovata = () => {
    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh'
                }}
            >
                <img src="../../public/no-results.png" alt="" width={"200px"} />
                <Typography variant="h1">404</Typography>
                <Typography variant="h5">Pagina non trovata</Typography>
                <Typography variant="p">La pagina che stai cercando non esiste.</Typography>
                <Link to="/">Torna alla home</Link>
            </Box>
        </Container>
    );
};


export default PaginaNonTrovata;