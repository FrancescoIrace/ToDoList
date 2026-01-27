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


  useEffect(() => {
    console.log("Il tema attuale è:", mode);
    const root = window.document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [mode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        {/* CONTEXT DOVE GESTIAMO LA LISTA DELLE NOTE */}
        <NoteProvider >
          {/* 1. Definiamo il router */}
          <BrowserRouter>
            <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
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
            </div>

          </BrowserRouter>
        </NoteProvider>


      </ThemeProvider>
    </>
  )
}

export default App
