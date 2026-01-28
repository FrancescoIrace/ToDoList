import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { ToDoList } from "./components/ToDoListComp";
import { PaginaNonTrovata } from "./components/PaginaNonTrovata";
import { Dashboard, loader as dashboardLoader } from "./components/Dashboard";
import { NoteDetail, noteDetailLoader } from "./components/NoteDetail";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true, //Definisce la pagina iniziale
                element: <Dashboard />,
                loader: dashboardLoader,
            },
            {
                path: "todo",
                element: <ToDoList />,
            },
            {
                path: "*",
                element: <PaginaNonTrovata />,
            },
            {
                path: "note/:id",
                element: <NoteDetail />,
                loader: noteDetailLoader,
            }
        ],
    },
]);