import { NoteProvider } from './context/NoteContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ThemeContextProvider } from './context/ThemeContext';

function App() {

  return (
    <>
    {/* CONTEXT DOVE GESTIAMO IL TEMA */}
      <ThemeContextProvider>
                {/* CONTEXT DOVE GESTIAMO LA LISTA DELLE NOTE */}
        <NoteProvider >
          {/* 1. Definiamo il router */}
          <RouterProvider router={router} />
        </NoteProvider>

      </ThemeContextProvider>



    </>
  )
}

export default App
