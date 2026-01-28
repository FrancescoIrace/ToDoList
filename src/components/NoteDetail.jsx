import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import { Container, Typography, Card, CardContent, Button, Box, Divider, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';

// LOADER: Prende i dati prima di mostrare la pagina
export async function noteDetailLoader({ params }) {
    const response = await fetch(`http://localhost:3000/api/notes/${params.id}`);
    if (!response.ok) {
        // Questo messaggio finirà nell'ErrorElement del router
        throw new Response("Nota non trovata", { status: 404 });
    }
    return response.json();
}

export function NoteDetail() {
    const nota = useLoaderData();
    const navigate = useNavigate();

    const revalidator = useRevalidator();

    const eliminaNota = async (id) => {
        if (!window.confirm("Sei sicuro di voler eliminare questa nota?")) return;

        try {
            const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                // 1. Forza il ricaricamento dei dati per aggiornare la lista
                revalidator.revalidate();
                alert("Nota eliminata con successo!");

                // 2. Se sei nella pagina di dettaglio, torna alla dashboard dopo l'eliminazione
                if (window.location.pathname.includes("/note/")) {
                    navigate("/");
                }
            }
        } catch (error) {
            console.error("Errore durante l'eliminazione:", error);
        }
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{ mb: 2 }}
            >
                Torna alla Dashboard
            </Button>

            <Card sx={{ boxShadow: 6, borderRadius: 3 }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="overline" color="primary" sx={{ fontWeight: 'bold' }}>
                        Dettaglio Nota #{nota.id}
                    </Typography>

                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', mt: 1 }}>
                        {nota.title || "Senza Titolo"}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'text.secondary' }}>
                        {nota.content || nota.nota || "Nessun contenuto presente."}
                    </Typography>

                    <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="caption" color="text.disabled">
                            Data: {nota.data}
                        </Typography>
                        <Typography variant="caption" color="text.disabled">
                            Ora: {nota.ora}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
            <IconButton edge="end" aria-label="delete" onClick={() => eliminaNota(nota.id)}>
                <DeleteIcon sx={{ color: 'error.main' }} />
            </IconButton>
        </Container>
    );
}