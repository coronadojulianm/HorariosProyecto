"use client";

import Sidebar from '../../organisms/Sidebar'; // Ajusta la ruta según la estructura de carpetas
import HorariosTable from '../../pages/horariostable/horariosTable'; // Ajusta la ruta según la estructura de carpetas

export default function horarioTemplate() {
  return (
    <div className='flex'>
      <Sidebar /> 
      <main className='flex-1 h-[calc(100vh-7rem)] flex flex-col p-4'>
        <div>
          <h1 className='text-black text-5xl'>Horarios</h1>
          <HorariosTable />
        </div>
      </main>
    </div>
  );
}
