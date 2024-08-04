import React from 'react';
import { NavItem } from '../molecules/navItem';

export const Navbar = () => (
  <nav className='flex justify-between bg-zinc-950 text-white p-4'>
    <h1 className='text-xl font-bold'>
      Sistema De Horarios
    </h1>
    <ul className='flex space-x-4'>
      <NavItem href="/" label="Home" />
      <NavItem href="/auth/login" label="Login" />
      <NavItem href="/auth/register" label="Registrarse" />
    </ul>
  </nav>
);

