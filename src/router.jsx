import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { ToDoList } from "./components/ToDoListComp";
import { PaginaNonTrovata } from "./components/PaginaNonTrovata";
import { Dashboard } from "./components/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true, //Definisce la pagina iniziale
                element: <Dashboard />,
            },
            {
                path: "todo",
                element: <ToDoList />,
            },
            {
                path: "*",
                element: <PaginaNonTrovata />,
            },
        ],
    },
]);