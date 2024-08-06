"use client";

import Sidebar from '../../organisms/Sidebar'; // Ajusta la ruta según la estructura de carpetas
import VinculacionTable from '../../pages/vinculaciontable/vinculacionTable'; // Ajusta la ruta según la estructura de carpetas

export default function VinculacionTemplate() {
  return (
    <div className='flex'>
      <Sidebar />
      <main className='flex-1 h-[calc(100vh-7rem)] flex flex-col p-4'>
        <div>
          <h1 className='text-black text-5xl mb-4'>Vinculaciones</h1>
          <VinculacionTable />
        </div>
      </main>
    </div>
  );
}
