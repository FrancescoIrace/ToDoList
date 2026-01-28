import { useLoaderData, useNavigate } from "react-router-dom";
import { Container, Typography, Card, CardContent, Button, Box, Divider } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
    </Container>
  );
}