import React from 'react'
import { Navbar } from './components/organisms/navBar'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <section className='h-[calc(100vh-7rem)] flex justify-center items-center'>
        <div>
          <h1 className='text-black text-5xl'>Home Page</h1>
        </div>
      </section>
    </>
  );
}
