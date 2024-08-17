"use client";

import Sidebar from '../../organisms/Sidebar'; // Ajusta la ruta según la estructura de carpetas
import AmbientesTable from '../../pages/ambientestable/ambientesTable'; // Ajusta la ruta según la estructura de carpetas
import ModalRegAmbiente from '../../organisms/modals/ambientes/RegistrarAmbientes';
import ModalRegMunicipio from '../../organisms/modals/ambientes/RegistrarMunicipios'

export default function AmbientesTemplate() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 h-[calc(100vh-7rem)] flex flex-col p-4">
        <div>
          <h1 className="text-black text-5xl mb-10 mt-7">Ambientes</h1>
          <div className="mb-10">
            <ModalRegAmbiente />
            <ModalRegMunicipio />
          </div>
          <AmbientesTable />
        </div>
      </main>
    </div>
  );
}

