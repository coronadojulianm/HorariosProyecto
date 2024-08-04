"use client";

import Sidebar from '../../organisms/SideBar'; // Ajusta la ruta según la estructura de carpetas

export default function fichasTemplate() {
  return (
    <div className='flex'>
      <Sidebar /> 
      <main className='flex-1 h-[calc(100vh-7rem)] flex justify-center items-center p-4'>
        <div>
          <h1 className='text-black text-5xl'>Fichas</h1>
        </div>
      </main>
    </div>
  );
}
