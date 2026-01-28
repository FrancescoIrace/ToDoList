import { Footer } from "./Footer";
import { Navbar } from "./navbar";
import { Outlet } from "react-router-dom";

//un layout wrapper per gestire la struttura globale e mantenere separata la logica dal layout.
export function MainLayout() {

    return (
        <>
            <div
                className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col"
            >
                {/* <Header /> */}
                <Navbar />

                {/* <Outlet /> */}
                <div className="flex-1">
                    <Outlet />
                </div>

                {/* <Footer /> */}
                <Footer />

            </div>
        </>

    )
}


