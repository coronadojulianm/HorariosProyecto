"use client";
import { signOut } from "next-auth/react";
import { Button } from '../../atoms/buttonCerrarSesion';

export default function PageDashboard() {
  return (
    <section className='h-[calc(100vh-7rem)] flex justify-center items-center'>
        <div>
            <h1 className='text-black text-5xl'>Dashboard</h1>
            <Button onClick={() => signOut()}>Cerrar Sesión</Button>
        </div>
    </section>
  );
}

