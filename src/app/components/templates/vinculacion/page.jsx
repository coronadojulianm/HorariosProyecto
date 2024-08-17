"use client";

import Sidebar from "../../organisms/Sidebar";
import VinculacionTable from "../../pages/vinculaciontable/vinculacionTable";
import ModalRegArea from "../../organisms/modals/vinculaciones/RegistrarArea";
import ModalRegVinculacion from '../../organisms/modals/vinculaciones/RegistrarVinculacion'

export default function VinculacionTemplate() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 h-[calc(100vh-7rem)] flex flex-col p-4">
        <div>
          <h1 className="text-black text-5xl mb-10 mt-7">Vinculaciones</h1>
          <div className="mb-10">
            <ModalRegArea />
            <ModalRegVinculacion />
          </div>
          <VinculacionTable />
        </div>
      </main>
    </div>
  );
}
