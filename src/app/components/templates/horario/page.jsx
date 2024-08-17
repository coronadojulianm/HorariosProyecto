"use client";

import Sidebar from "../../organisms/Sidebar";
import CalendarioTable from "../../pages/horariostable/horariosTable";
import ModalRegistrarHorario from '../../organisms/modals/horario/RegistrarHorario';
import { useSession } from "next-auth/react";

export default function HorarioTemplate() {
  const { data: session } = useSession();

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 h-[calc(100vh-7rem)] flex flex-col p-4">
        <div>
          <h1 className="text-black text-5xl mb-5 mt-7">Tabla Horario</h1>
          <div className="mb-4">
            {session?.user?.role && (session.user.role === 'Coordinador' || session.user.role === 'Lider') && (
              <ModalRegistrarHorario />
            )}
          </div>
          <CalendarioTable />
        </div>
      </main>
    </div>
  );
}

