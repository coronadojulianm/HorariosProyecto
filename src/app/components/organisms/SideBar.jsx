import React, { useState } from 'react';
import Link from 'next/link';
import { signOut } from "next-auth/react";
import { Button } from '../atoms/buttonCerrarSesion';
import { FaLink, FaAddressCard, FaSchool, FaRegClock, FaHome, FaSignInAlt, FaUserPlus, FaChevronLeft, FaChevronRight, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <aside className={`h-screen flex flex-col bg-slate-50 text-slate-800 shadow-md transition-all ${isCollapsed ? 'w-20' : 'w-72'}`}>
      {/* Contenedor para el logo con altura ajustada */}
      <div className={`bg-slate-100 p-2 transition-all flex items-center justify-center ${isCollapsed ? 'w-20 h-28' : 'w-72 h-60'}`}>
        <img 
          src="/logoHourDev%20500x500.png" 
          alt="Logo" 
          className={`transition-all ${isCollapsed ? 'w-16 h-auto' : 'w-3/4 h-auto'}`} 
        />
      </div>

      <nav className='flex-1'>
        <ul className='flex flex-col'>
          <li className="my-2">
            <Link href="/components/templates/dashboard" className={`block py-2 px-4 text-slate-800 hover:bg-lime-500 hover:text-white rounded-md transition-colors flex items-center mx-2 ${isCollapsed ? 'justify-center' : ''}`}>
              <FaHome className='mr-2 text-2xl' /> {!isCollapsed && 'Dashboard'}
            </Link>
          </li>
          <li className="my-2">
            <Link href="/components/templates/horario" className={`block py-2 px-4 text-slate-800 hover:bg-lime-500 hover:text-white rounded-md transition-colors flex items-center mx-2 ${isCollapsed ? 'justify-center' : ''}`}>
              <FaRegClock className='mr-2 text-2xl' /> {!isCollapsed && 'Horario'}
            </Link>
          </li>
          <li className="my-2">
            <Link href="/components/templates/ambientes" className={`block py-2 px-4 text-slate-800 hover:bg-lime-500 hover:text-white rounded-md transition-colors flex items-center mx-2 ${isCollapsed ? 'justify-center' : ''}`}>
              <FaSchool className='mr-2 text-2xl' /> {!isCollapsed && 'Ambientes'}
            </Link>
          </li>
          <li className="my-2">
            <Link href="/components/templates/fichas" className={`block py-2 px-4 text-slate-800 hover:bg-lime-500 hover:text-white rounded-md transition-colors flex items-center mx-2 ${isCollapsed ? 'justify-center' : ''}`}>
              <FaAddressCard  className='mr-2 text-2xl' /> {!isCollapsed && 'Fichas'}
            </Link>
          </li>
          <li className="my-2">
            <Link href="/components/templates/vinculacion" className={`block py-2 px-4 text-slate-800 hover:bg-lime-500 hover:text-white rounded-md transition-colors flex items-center mx-2 ${isCollapsed ? 'justify-center' : ''}`}>
              <FaLink className='mr-2 text-2xl' /> {!isCollapsed && 'Vinculacion'}
            </Link>
          </li>
          <li className="my-2">
            <Link href="/auth/register" className={`block py-2 px-4 text-slate-800 hover:bg-lime-500 hover:text-white rounded-md transition-colors flex items-center mx-2 ${isCollapsed ? 'justify-center' : ''}`}>
              <FaUserPlus className='mr-2 text-2xl' /> {!isCollapsed && 'Registro'}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 flex flex-col items-center">
        <Button 
          onClick={() => signOut()} 
          className={`w-full flex items-center justify-center hover:bg-red-400 ${isCollapsed ? 'text-white' : 'text-white'}`}
        >
          {isCollapsed ? <FaSignOutAlt className='text-white' /> : 'Cerrar Sesión'}
        </Button>
        <button 
          onClick={toggleSidebar} 
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors mt-5 ${isCollapsed ? 'ml-auto' : 'ml-2'}`}
        >
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;


























