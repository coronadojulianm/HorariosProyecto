"use client";

import Sidebar from "../../organisms/Sidebar";
import PersonasTable from "../../pages/personastable/PersonasTable";
import ModalRegPersonas from "../../organisms/modals/personas/RegistrarPersonas"


export default function PersonasTemplate() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 h-[calc(100vh-7rem)] flex flex-col p-4">
        <div>
          <h1 className="text-black text-5xl mb-10 mt-7">Registro De Personas</h1>
          <div className="mb-10">
          <ModalRegPersonas />
          </div>
          <PersonasTable />
        </div>
      </main>
    </div>
  );
}
