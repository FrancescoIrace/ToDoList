import { Typography, Button, List, ListItem, ListItemText, Grid, Card, CardContent } from "@mui/material";
import { useState } from "react";
import { DataRefactor } from "./ToDoListComp";
import dayjs from 'dayjs';
import { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { div } from "framer-motion/client";

export async function loader() {
    const response = await fetch('http://localhost:3000/api/notes');
    if (!response.ok) throw new Error("Errore backend");
    const note = await response.json();
        const notesOrdinate = note.sort((a, b) => {
        // Combinando data e ora creiamo un oggetto Date per il confronto
        const dataA = new Date(`${a.data}T${a.ora}`);
        const dataB = new Date(`${b.data}T${b.ora}`);
        return dataB - dataA; // Ordine decrescente
    });
    return { notes: notesOrdinate };
}

export function Dashboard() {
    const { notes } = useLoaderData(); // Prende i dati dal loader sopra

    const [mostraNote, setMostraNote] = useState(false);
    const impostaNoteT = () => setMostraNote(!mostraNote);
    const [mostraNoteOggi, setMostraNoteOggi] = useState(false);
    const impostaNoteOggi = () => setMostraNoteOggi(!mostraNoteOggi);

    //Questo per utilizzare il context
    // const { listaNote, totale } = useContext(NoteContext);

    const totaleNote = notes.length;
    const noteOggi = notes.filter(note => dayjs(note.data).isSame(dayjs(), 'day')).length;
    const listaNoteOggi = notes.filter(note => dayjs(note.data).isSame(dayjs(), 'day'));

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
                                    {notes.map((elemento) => (
                                        <div className="flex-col m-2 border-1 border-slate-400 dark:border-slate-600 rounded-xl">
                                            <Link to={`./note/${elemento.id}`}>
                                                <ListItem key={elemento.id} >
                                                    <ListItemText primary={"Nota del: " + DataRefactor(elemento.data)} secondary={elemento.nota} />
                                                </ListItem>
                                            </Link>
                                        </div>

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
                                        <div className="flex-col m-2 border-1 border-slate-600 dark:border-slate-400 rounded-xl">
                                            <ListItem key={elemento.indice} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }} >
                                                <ListItemText primary={"Nota del: " + DataRefactor(elemento.data)} secondary={elemento.nota} />
                                            </ListItem>
                                        </div>
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

