import { Container, Box, Stack, TextField, Typography, Divider } from "@mui/material";
import dayjs from 'dayjs';
import timejs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState, useEffect } from "react";
import { NoteContext } from '../context/NoteContext';
import { useLoaderData } from "react-router-dom";
import { useRevalidator, useNavigate } from "react-router-dom";

export async function listLoader() {
    const response = await fetch('http://localhost:3000/api/notes');
    if (!response.ok) throw new Error("Errore backend");
    const listaNote = await response.json();
    return { listaNote };
}

export function Pickers({ GetData, GetOra, GetNota }) {

    return (
        <>
            {/* <Stack spacing={2} direction="column" alignItems="center" justifyContent="center" sx={{ textAlign: "center", mt: 1, mb: 3 }}>
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
            </Stack> */}

            <div className="flex flex-col items-center justify-center gap-5 dark:text-white ">
                <Typography variant="h4">Inserisci qui la tua nota:</Typography>
                <TextField
                    label="Inserisci qui la tua NOTA"
                    variant="outlined"
                    fullWidth
                    multiline
                    maxRows={6}
                    className="dark:bg-white rounded-xl"
                    onChange={(notaInserita) => GetNota(notaInserita.target.value)}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Inserisci la data"
                        openTo="day"
                        format="DD/MM/YYYY"
                        className="dark:bg-white rounded-xl"
                        onChange={(dataInserita) => GetData(dataInserita)} />

                    <TimePicker
                        label="Inserisci l'ora"
                        format="HH:mm"
                        ampm={false}
                        orientation="portrait"
                        className="dark:bg-white rounded-xl"
                        onChange={(oraInserita) => GetOra(oraInserita)}
                    />
                </LocalizationProvider>
            </div>


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


function CreaElementoLista({ elemento, elimina }) {
    return (
        <>

            <div className="bg-white dark:bg-slate-400 p-6 rounded-2xl shadow-sm border-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 "
                style={{ borderColor: elemento.cb }}
            >
                <div className="flex justify-between items-start mb-4 ">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400 dark:text-black uppercase tracking-wider">Nota n°{elemento.id}</span>
                        <h4 className="text-lg font-bold text-slate-800">Dettagli Nota</h4>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-lg border border-blue-100">
                            {elemento.data}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-1 italic">ore {elemento.ora}</span>
                    </div>
                </div>
                <div className="w-full h-[200px] mb-4">
                    <p className="text-slate-600 dark:text-black text-sm leading-relaxed mb-6 min-h-[80px] text-left break-words overflow-auto h-full">
                        {elemento.nota}
                    </p>
                </div>


                <button
                    className="w-full bg-red-100 border border-black-300 dark:border dark:border-slate-600 hover:bg-red-500 hover:text-white text-slate-600 font-semibold py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                    onClick={() => elimina(elemento.id)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Elimina Nota {elemento.id}
                </button>
            </div>

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
            <div className="p-6 mt-4 w-[sm,md,lg]">
                <Typography variant="h4" className="text-black dark:text-white mb-2">Le tue note:</Typography>
                <ul className="flex flex-col items-center mt-3">
                    {lista.map((elemento) => (
                        <li key={elemento.id} className="mb-4 flex flex-col w-sm" >
                            <CreaElementoLista elemento={elemento} elimina={onElimina} exitAnim={{ opacity: 0, x: -100, transition: { duration: 0.4 } }} />
                        </li>
                    ))}
                </ul>
            </div>
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
    const revalidator = useRevalidator();
    const navigate = useNavigate();

    // const listaNote = useContext(NoteContext).listaNote;
    // const setListaNote = useContext(NoteContext).setListaNote;
    const { listaNote } = useLoaderData();

    const gestisciSalvataggio = async () => {
        if (nota === "") {
            alert("Inserisci una nota");
            return;
        }
        // 1. Prepariamo l'oggetto nota con i dati dei tuoi stati (es. titolo, testo, data)
        const nuovaNota = {
            title: "Nota", // Il valore del tuo TextField per il titolo
            content: nota, // Il valore del tuo TextField per la nota
            data: data.format('YYYY-MM-DD'), // Formattiamo dayjs per il server
            ora: ora.format('HH:mm')
        };

        try {
            // 2. Inviamo i dati al tuo server Express
            const response = await fetch("http://localhost:3000/api/notes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuovaNota),
            });

            if (response.ok) {
                // 3. Se il salvataggio va a buon fine, puliamo i campi
                setNota("");
                alert("Nota salvata con successo!");
                revalidator.revalidate();
                // OPZIONALE: Se vuoi che la Dashboard si aggiorni subito:
                // navigate("/todo"); 
            }
        } catch (error) {
            console.error("Errore durante il salvataggio:", error);
        }
    };

    const gestisciEliminazione = async (id) => {
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
        <>
            <Box sx={{ mb: 2 }}>
                <Stack spacing={2} sx={{ textAlign: "center" }}>
                    <Typography variant="h2">To Do List</Typography>
                    <Typography variant="p">Inserisci qui le tue cose da fare:</Typography>
                </Stack>
            </Box>
            <Divider variant="fullWidth" sx={{ border: 2 }} />
            <div className="flex flex-col items-center mb-4">
                <Pickers GetData={GetDataInput} GetOra={GetOraInput} GetNota={GetNotaInput} />
                <button
                    className="w-max p-2 mt-5 bg-slate-500 dark:bg-white-500 hover:bg-slate-700 hover:text-white text-slate-100 font-semibold py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                    // onClick={() => AggiungiNotaALista(nota, data, ora)}>AGGIUNGI</button>
                    onClick={() => gestisciSalvataggio()}
                >AGGIUNGI</button>
            </div>
            <Divider variant="fullWidth" sx={{ border: 2 }} />

            <Divider variant="fullWidth" sx={{ border: 2 }} />

            <div className="flex items-center flex-col mb-4 ">
                <ListaNoteComp lista={listaNote} onElimina={gestisciEliminazione} />
            </div>
        </>
    )
}