"use client";

import Sidebar from '../../organisms/SideBar'; // Ajusta la ruta según la estructura de carpetas
import FichasTable from '../../pages/fichastable/fichasTable'; // Ajusta la ruta según la estructura de carpetas

export default function fichasTemplate() {
  return (
    <div className='flex'>
      <Sidebar /> 
      <main className='flex-1 h-[calc(100vh-7rem)] flex flex-col p-4'>
        <div className='mb-4'>
          <h1 className='text-black text-5xl'>Fichas</h1>
        </div>
        <FichasTable /> {/* Aquí se muestra la tabla de fichas */}
      </main>
    </div>
  );
}
