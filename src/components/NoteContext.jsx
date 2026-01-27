import { createContext, useState, useEffect } from 'react';

// Creiamo il Context
export const NoteContext = createContext();

//NEL CASO IN CUI DOVESSI USARE UN DATABASE AL POSTO DEL LOCALSTORAGE MI BASTERA' MODIFICARE QUESTA PARTE

export function NoteProvider({ children }) {
  const [listaNote, setListaNote] = useState(() => {
    const salvataggio = localStorage.getItem("listaNote");
    return salvataggio ? JSON.parse(salvataggio) : [];
  });

  useEffect(() => {
    localStorage.setItem("listaNote", JSON.stringify(listaNote));
  }, [listaNote]);

  // Esportiamo sia i dati che le funzioni per modificarli
  const value = {
    listaNote,
    setListaNote,
    totale: listaNote.length
  };

  return (
    <NoteContext.Provider value={value}>
      {children}
    </NoteContext.Provider>
  );
}