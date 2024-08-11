"use client";

import Sidebar from "../../organisms/Sidebar";
import FichasTable from "../../pages/fichastable/fichasTable";
import ModalRegPrograma from "../../organisms/modals/fichas/RegistrarPrograma";
import ModalRegFicha from '../../organisms/modals/fichas/RegistrarFicha'

export default function fichasTemplate() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 h-[calc(100vh-7rem)] flex flex-col p-4">
        <div>
          <h1 className="text-black text-5xl mb-10 mt-7">Fichas</h1>
          <div className="mb-10">
            <ModalRegPrograma />
            <ModalRegFicha />
          </div>
          <FichasTable />
        </div>
      </main>
    </div>
  );
}
