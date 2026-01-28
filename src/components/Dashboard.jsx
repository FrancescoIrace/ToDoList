import { Container, Box, Typography, Stack, Button, List, ListItem, ListItemText, Grid, Card, CardContent } from "@mui/material";
import { useState } from "react";
import { DataRefactor } from "./ToDoListComp";
import dayjs from 'dayjs';
import { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';


export function Dashboard() {

    const [mostraNote, setMostraNote] = useState(false);
    const impostaNoteT = () => setMostraNote(!mostraNote);
    const [mostraNoteOggi, setMostraNoteOggi] = useState(false);
    const impostaNoteOggi = () => setMostraNoteOggi(!mostraNoteOggi);

    const { listaNote, totale } = useContext(NoteContext);

    const totaleNote = listaNote.length;
    const noteOggi = listaNote.filter(note => dayjs(note.data).isSame(dayjs(), 'day')).length;
    const listaNoteOggi = listaNote.filter(note => dayjs(note.data).isSame(dayjs(), 'day'));

    return (
        <>
            <Grid container spacing={3} sx={{ mt: 2, mb: 4, p: 2 }} justifyContent="center"  >

                <Grid item size={12} sx={{ textAlign: "center" }}>
                    <Card sx={{
                        bgcolor: 'background.paper',
                        borderBottom: '5px solid',
                        borderColor: 'primary.main',
                        boxShadow: 4
                    }}>
                        <CardContent>
                            <Typography variant="h3">
                                Dashboard
                            </Typography>
                        </CardContent>

                    </Card>

                </Grid>

                {/* Card 1: Totale Note */}
                <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex", justifyContent: "center" }}>
                    <Card sx={{
                        width: '100%',
                        maxWidth: 400,
                        minHeight: 140,
                        maxHeight: "max-content",
                        flexDirection: 'column',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'primary.light',
                        color: 'white',
                        boxShadow: 3,
                    }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" component="div">
                                Totale Note
                            </Typography>
                            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                                {totaleNote}
                            </Typography>
                            <Button variant="contained" sx={{ bgcolor: "primary.main", color: "white", width: "100px" }} onClick={() => impostaNoteT()}>{mostraNote ? "Nascondi" : "Mostra"}</Button>
                            {mostraNote && (
                                <List>
                                    {listaNote.map((elemento) => (
                                        <ListItem key={elemento.indice} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }} >
                                            <ListItemText primary={"Nota del: " + DataRefactor(elemento.data)} secondary={elemento.nota} />
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 2: Note di Oggi */}
                <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex", justifyContent: "center" }}>
                    <Card sx={{
                        width: '100%',
                        maxWidth: 400,
                        minHeight: 140,
                        maxHeight: "max-content",
                        flexDirection: 'column',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'secondary.light',
                        color: 'white',
                        boxShadow: 3,
                    }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" component="div">
                                Create Oggi
                            </Typography>
                            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                                {noteOggi}
                            </Typography>
                            <Button variant="contained" sx={{ bgcolor: "primary.main", color: "white", width: "100px" }} onClick={() => impostaNoteOggi()}>{mostraNoteOggi ? "Nascondi" : "Mostra"}</Button>
                            {mostraNoteOggi && (
                                <List>
                                    {listaNoteOggi.map((elemento) => (
                                        <ListItem key={elemento.indice} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }} >
                                            <ListItemText primary={"Nota del: " + DataRefactor(elemento.data)} secondary={elemento.nota} />
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>




        </>
    )
}

