import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Container, Box, Stack, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { List, ListItem, ListItemText } from '@mui/material';


// Il componente riceve l'oggetto "props". 
// Usiamo la destrutturazione { cifra } per prendere direttamente il valore.
function DisplayContatore({ cifra }) {
    return (
        <Typography variant="h2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Il valore attuale è: {cifra}
        </Typography>
    );
}

function DisplayPariDispari({ cifra }) {
    //METODO 2
    //OPERATORE TERNARIO INTERNO AL JSX
    return (
        <Typography variant="h2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            {(cifra % 2 === 0) ? "Il valore è PARI" : "Il valore è DISPARI"}
        </Typography>
    );
}

function Pulsantiera({ onAumenta, onReset, onDiminuisci, onCambioValore }) {
    return (
        <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant='contained' onClick={onAumenta}>Aumenta</Button>
            <Button variant='contained' onClick={onDiminuisci} color='secondary.main'>Diminuisci</Button>
            <Button variant='outlined' color='error' onClick={onReset}>Reset</Button>
            <Button variant='outlined' onClick={() => onCambioValore(5)}>+5</Button>
            <Button variant='outlined' onClick={() => onCambioValore(-5)}>-5</Button>
        </Stack>

    );
}

function InfoSessione({ clickReset }) {
    return (
        <Typography variant="h2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Hai azzerato il contatore {clickReset} volte
        </Typography>
    );

}

function LogEvento({ evento }) {
    console.log(Number(evento.target.value));
}

function ListaStorico({ storico }) {
    if (storico.length === 0) {
        return (
            <Typography variant="h2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                Nessuna operazione effettuata
            </Typography>
        );
    }

    return (

        <List>
            {storico.map((elemento, indice) => (
                <ListItem key={elemento.indice}>
                    <ListItemText primary={"Num.operazione: " + elemento.indice + " - Data: " + elemento.data} secondary={"Operazione:" + elemento.operazione + " = " + elemento.valore} />
                    {elemento.valore}
                </ListItem>
            ))}
        </List>
    )
}

function ToggleStorico({ chiaro, set }) {

    if (!chiaro) {
        return (
            <Button variant='contained' sx={{ mt: 3, width: "content" }} onClick={() => set()} >Mostra Operazioni</Button>
        )
    }

    return (<Button variant='contained' sx={{ mt: 3, width: "content" }} onClick={() => set()} >Nascondi Operazioni</Button>)

}

//GENITORE
export function BottoneCheCambia() {
    // const [count, setCount] = useState(0);
    const [count, setCount] = useState({ valore: 0, clickReset: 0 });

    //Definiamo le azioni che arrivano al figlio
    const gestisciAumento = () => setCount(prev => ({ ...prev, valore: prev.valore + 1 }));
    const gestisciReset = () => setCount(prev => ({ ...prev, valore: 0, clickReset: prev.clickReset + 1 }));
    const gestisciDiminuzione = () => setCount(prev => ((prev.valore > 0) ? { ...prev, valore: prev.valore - 1 } : { ...prev, valore: 0 }));
    const cambiaValore = (quantita) => setCount(prev => ({ ...prev, valore: (prev.valore + quantita < 0) ? (0) : (prev.valore + quantita) }), aggiungiAStorico(count.valore));

    const gestisciInputValore = (e) => setCount(prev => ({ ...prev, valore: (Number(e.target.value)) }));
    //const test = (e) => console.log(e.target.value);

    const [incrementoP, setIncrementoP] = useState(0);
    const gestisciIncrementoPersonalizzato = (e) => setIncrementoP(prev => Number(e.target.value));
    const resetIncrementoP = () => setIncrementoP(0);

    //Creazione di uno storico delle operazioni
    const [storico, setStorico] = useState(() => {
        const salvataggio = localStorage.getItem("mioStorico");
        return salvataggio != null ? JSON.parse(salvataggio) : [];
    });

    const valoreDaSalvare = count.valore + incrementoP;
    const aggiungiAStorico = (valore) => setStorico(prev => [{ valore: valoreDaSalvare, indice: prev.length + 1, data: new Date().toLocaleString(), operazione: count.valore.toString() + " + " + incrementoP.toString() }, ...prev]);

    useEffect(() => {
        // Trasformiamo l'array in stringa perché localStorage salva solo testo
        localStorage.setItem("mioStorico", JSON.stringify(storico));
        console.log("Storico salvato con successo!");
    }, [storico]); // Scatta SOLO quando 'storico' cambia



    //Toggle per mostrare o nascondere i LOG
    const [chiaro, setChiaro] = useState(true);
    const impostaChiaro = () => setChiaro(!chiaro);


    return (
        <>
            <Container component="ContainerDatiEsempi" maxWidth="lg">
                <Box sx={{ mb: 5 }}>
                    <Stack spacing={3} sx={{ textAlign: "center", display: "grid", justifyContent: "center" }}>
                        <Typography variant="h3">Esempio useState</Typography>
                        <Typography variant="p">In questo esempio utilizziamo useState per aumentare il contatore tramite l'onclick del bottone</Typography>
                        {/* Passiamo lo stato 'count' alla prop 'cifra' */}
                        <DisplayContatore cifra={count.valore} />
                        <Box>
                            <Button onClick={gestisciAumento} sx={{ bgcolor: "primary.main", color: "primary.contrastText", fontSize: "40px", width: "150px", height: "80px", m: 1 }} >+</Button>
                            <Button onClick={gestisciDiminuzione} sx={{ bgcolor: "secondary.main", color: "primary.contrastText", fontSize: "40px", width: "150px", height: "80px", m: 1 }}>-</Button>
                        </Box>
                        <Typography variant="p">Con il bottone in basso possiamo azzerare il contatore</Typography>
                        <Box>
                            <Button onClick={gestisciReset} sx={{ bgcolor: "attenzione.main", color: "primary.contrastText", fontSize: "20px", width: "150px", height: "80px" }} >Reset</Button>
                        </Box>
                    </Stack>
                </Box>

                <Box sx={{ mt: 5 }} display="none" >
                    <Stack spacing={3} sx={{ textAlign: "center", display: "grid", justifyContent: "center" }}>
                        <Typography variant="h3">Esempio Numeri Pari e Dispari</Typography>
                        <Typography variant="p">In questo esempio creeremo una funzione figlio che gestisce la logica di pari e dispari</Typography>
                        {/* Passiamo lo stato 'count' alla prop 'cifra' */}
                        <DisplayPariDispari cifra={count} />
                    </Stack>
                </Box>
                <Box sx={{ mt: 5 }}>
                    <Divider variant='middle' sx={{ border: 1, color: "secondary.main" }} />
                    <Stack spacing={3} sx={{ textAlign: "center", display: "grid", justifyContent: "center" }}>
                        <Typography variant="h3">Esempio di Funzioni passate come props</Typography>
                        {/* <Typography variant="p">In questo esempio creeremo una funzione figlio che riceve le funzioni passate come props</Typography> */}
                        {/* Passiamo come props le funzioni che arrivano al figlio */}
                        <Box sx={{ mt: 4 }}>
                            <Pulsantiera onAumenta={gestisciAumento} onReset={gestisciReset} onDiminuisci={gestisciDiminuzione} onCambioValore={cambiaValore} />
                        </Box>
                        <Box>
                            <InfoSessione clickReset={count.clickReset} />
                        </Box>
                    </Stack>

                </Box>

                <Box sx={{ mt: 5 }}>
                    <Divider variant='middle' sx={{ border: 1, color: "secondary.main" }} />
                    <Stack spacing={3} sx={{ textAlign: "center", display: "grid", justifyContent: "center" }}>
                        <Typography variant="h3">Utilizzo di un Input per cambiare il valore</Typography>
                        <Box sx={{ mt: 4 }}>
                            <Typography variant='h4'>Il valore inserito è: {count.valore} </Typography>
                            <TextField sx={{ mt: 2 }} type="number" label="Inserisci il valore" value={count.valore} onChange={gestisciInputValore} />
                        </Box>
                        <Box sx={{ mt: 4 }}>
                            <Typography variant='h4'>Inserisci il valore personalizzato da sommare </Typography>
                            <Typography variant='p'>{count.valore} + {incrementoP} </Typography>
                            <Button sx={{ mt: 3, mr: 2 }} variant='contained' onClick={() => cambiaValore(incrementoP)}>+{incrementoP}</Button>
                            <TextField sx={{ mt: 2 }} type="number" label="Inserisci il valore personalizzato" value={incrementoP} onChange={gestisciIncrementoPersonalizzato} />
                            <Button variant='outlined' sx={{ mt: 3, ml: 2, color: "primary.main" }} onClick={resetIncrementoP}>Resetta il valore</Button>
                        </Box>
                    </Stack>

                </Box>


                <Box sx={{ mt: 5 }}>
                    <Divider variant='middle' sx={{ border: 1, color: "secondary.main" }} />
                    <Stack spacing={3} sx={{ textAlign: "center", display: "grid", justifyContent: "center" }}>
                        <Box>
                            <ToggleStorico chiaro={chiaro} set={impostaChiaro} />
                        </Box>

                        {chiaro && (
                            <ListaStorico storico={storico} />
                        )}


                    </Stack>

                </Box>


            </Container >
        </>
    )
}


