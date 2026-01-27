import { useState, useMemo, useEffect } from 'react'
import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material'
import { MainLayout } from './components/MainLayout'
import { getTheme } from './themes/theme'
import { ToDoList } from './components/ToDoListComp'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottoneCheCambia } from './components/EsempioUseState';
import PaginaNonTrovata from './components/PaginaNonTrovata';
import { Dashboard } from './components/Dashboard';
import { NoteProvider } from './components/NoteContext';

function App() {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* CONTEXT DOVE GESTIAMO LA LISTA DELLE NOTE */}
        <NoteProvider >
          {/* 1. Definiamo il router */}
          <BrowserRouter>
            <MainLayout mode={mode} setMode={setMode}>
              {/* 2. Definiamo i binari (Routes) */}
              <Routes>
                {/* Dashboard */}
                <Route path="/" element={<Dashboard />} />

                {/* il contatore */}
                <Route path="/cont" element={<BottoneCheCambia />} />

                {/* Pagina Note */}
                <Route path="/todo" element={<ToDoList />} />

                {/* Pagina 404 */}
                <Route path="*" element={<PaginaNonTrovata />} />
              </Routes>
            </MainLayout>
          </BrowserRouter>
        </NoteProvider>


      </ThemeProvider>
    </>
  )
}

export default App
