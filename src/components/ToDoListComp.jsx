import { Container, Box, Stack, TextField, Typography, Divider, Button } from "@mui/material";
import dayjs from 'dayjs';
import timejs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState, useEffect } from "react";
import { List, ListItem, ListItemText } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import { NoteContext } from '../components/NoteContext';


export function Pickers({ GetData, GetOra, GetNota }) {

    return (
        <>
            <Stack spacing={2} direction="column" alignItems="center" justifyContent="center" sx={{ textAlign: "center", mt: 1, mb: 3 }}>
                <Typography variant="h4" sx={{ alignSelf: "center" }}>Area inserimento Nota</Typography>
                <TextField
                    label="Inserisci qui la tua NOTA"
                    variant="outlined"
                    fullWidth
                    multiline
                    maxRows={6}
                    sx={{ width: "50%", minWidth: "400px" }}
                    onChange={(notaInserita) => GetNota(notaInserita.target.value)}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Inserisci la data"
                        openTo="day"
                        format="DD/MM/YYYY"
                        onChange={(dataInserita) => GetData(dataInserita)} />

                    <TimePicker
                        label="Inserisci l'ora"
                        format="HH:mm"
                        ampm={false}
                        orientation="portrait"
                        onChange={(oraInserita) => GetOra(oraInserita)}
                    />
                </LocalizationProvider>

            </Stack>
        </>
    )
}

export function DataRefactor(data) {
    return dayjs(data).format("DD/MM/YYYY");
}

function OraRefactor(ora) {
    return dayjs(ora).format("HH:mm");
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function CreaElementoLista({ elemento, elimina, exitAnim }) {
    return (
        <>
            <motion.div initial={{ opacity: 0, y: 50 }} // Inizia invisibile e un po' più in basso
                animate={{ opacity: 1, y: 0 }}  // Si anima per apparire e salire
                exit={exitAnim}
                transition={{ duration: 0.5 }} // Dura mezzo secondo
                style={{
                    padding: '8px',
                    width: '100%',
                    border: `2px solid ${elemento.cb}`,
                    borderRadius: '8px',
                    marginBottom: '16px'
                }}>
                <Stack spacing={2}>
                    <Typography variant="h5" sx={{ mt: 2, textDecoration: "underline" }}>Nota n°{elemento.indice}</Typography>
                    <Typography variant="p" sx={{ mt: 2 }}>{elemento.nota}</Typography>
                    <Typography variant="p" sx={{ mt: 2 }}>Data: {DataRefactor(elemento.data)}</Typography>
                    <Typography variant="p" sx={{ mt: 2 }}>Orario: {OraRefactor(elemento.ora)}</Typography>
                    <Button variant="contained" sx={{ width: "100px", bgcolor: "attenzione.main" }} onClick={() => elimina(elemento.indice)}>Elimina</Button>
                </Stack>
            </motion.div>

        </>
    )
}

function ListaNoteComp({ lista, onElimina }) {
    if (lista.length === 0) {
        return (
            <>
                <Typography variant="h4" sx={{ mt: 2 }}>Nessuna nota</Typography>
            </>
        )
    }

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h4" sx={{ mt: 2 }}>Le tue note:</Typography>
                <List sx={{ width: "70%" }}>
                    <AnimatePresence>
                        {lista.map((elemento) => (
                            <ListItem key={elemento.indice} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }} >
                                {/* <ListItemText primary={CreaElementoLista(elemento, lista)} /> */}
                                <CreaElementoLista elemento={elemento} elimina={onElimina} exitAnim={{opacity: 0, x: -100, transition: {duration: 0.4}}} />
                            </ListItem>
                        ))}
                    </AnimatePresence>
                </List>
            </Box>
        </>

    )
}

export function ToDoList() {
    const [nota, setNota] = useState("");
    const [data, setData] = useState(dayjs())
    const [ora, setOra] = useState(timejs())
    const GetDataInput = (dataInserita) => setData(dataInserita);
    const GetOraInput = (oraInserita) => setOra(oraInserita);
    const GetNotaInput = (notaInserita) => setNota(notaInserita);
    
    const listaNote = useContext(NoteContext).listaNote;
    const setListaNote = useContext(NoteContext).setListaNote;

    const AggiungiNotaALista = (nota, data, ora, indice, cb) => {
        if (nota === "") {
            alert("Inserisci una nota");
            return;
        } else {
            const nuovaNota = { nota: nota, data: data, ora: ora, indice: Date.now(), cb: getRandomColor() };
            setListaNote(prev => [nuovaNota, ...prev]);
            return;
        }
    }


    function EliminaNota(idDaEliminare) {
        // Usiamo il functional update per essere sicuri di avere lo stato più recente
        setListaNote(prevNote => prevNote.filter(nota => nota.indice !== idDaEliminare));
    }

    return (
        <>
            <Container maxWidth="xxxl" sx={{ bgcolor: "background.paper", py: 5, display: "flex-box", justifyContent: "center" }}>
                <Box sx={{ mb: 2 }}>
                    <Stack spacing={2} sx={{ textAlign: "center" }}>
                        <Typography variant="h2">To Do List</Typography>
                        <Typography variant="p">Inserisci qui le tue cose da fare:</Typography>
                    </Stack>
                </Box>
                <Divider variant="fullWidth" sx={{ border: 2 }} />
                <Box sx={{ textAlign: "center", mb: 2 }}>
                    <Pickers GetData={GetDataInput} GetOra={GetOraInput} GetNota={GetNotaInput} />
                    <Button variant="contained" sx={{ color: "background.paper", fontWeight: "bold" }} onClick={() => AggiungiNotaALista(nota, data, ora)}>AGGIUNGI</Button>
                </Box>
                <Divider variant="fullWidth" sx={{ border: 2 }} />

                <Divider variant="fullWidth" sx={{ border: 2 }} />

                <Box sx={{ textAlign: "center", mb: 2 }}>
                    <ListaNoteComp lista={listaNote} onElimina={EliminaNota} />
                </Box>
            </Container>
        </>
    )
}