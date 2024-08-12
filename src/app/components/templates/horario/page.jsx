"use client";

import Sidebar from "../../organisms/Sidebar"; // Ajusta la ruta según la estructura de carpetas
import HorariosTable from "../../pages/horariostable/horariosTable"; // Ajusta la ruta según la estructura de carpetas
import ModalRegHorario from "../../organisms/modals/horario/RegistrarHorario";
import { Button, Link } from "@nextui-org/react";


export default function HorariosTemplate() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 h-[calc(100vh-7rem)] flex flex-col p-4">
        <div>
          <h1 className="text-black text-5xl mb-10 mt-7">Horarios</h1>
          <div className="mb-10">
            <ModalRegHorario />
            <Link href="/components/templates/calendario">
            <Button 
            className="bg-lime-500 text-white ml-5" 
            >
              Calendario
            </Button>
            </Link>
            
          </div>
          <HorariosTable />
        </div>
      </main>
    </div>
  );
}
