import { Box, Divider, Typography, Stack } from '@mui/material';
import Container from '@mui/material/Container';

export const Footer = () => {
    return (
        <>
            <Divider variant='fullWidth' sx={{ border: 1, color: "secondary.main" }} />
            <Container component="footer" maxWidth="xxxl" sx={{ bgcolor: "primary.main", mt: 0, py: 2, width: "100%" }}>
                    <Stack spacing={2} sx={{ textAlign: "center" }}>
                        <Typography variant="p">©2026 Francesco Irace</Typography>
                    </Stack>
            </Container>
        </>

    )
}