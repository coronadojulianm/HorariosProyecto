"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {

  const {register,handleSubmit, formState:{errors}} = useForm();
  const router = useRouter()
  const [error,setError]= useState(null)

  const onSubmit = handleSubmit(async data=>{
    console.log(data);

    const res = await signIn('credentials', {
      email: data.correo,
      password:data.password,
      redirect:false
    })
    console.log(res)

    if(res.error){
      setError(res.error)
    }else{
      router.push('/components/templates/dashboard')
    }

  })
  return (
    <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
      <form onSubmit={onSubmit} className='w-1/4'>

      {error && (
        <p className='bg-red-500 text-lg text-white p-3 rounded mb-4'>{error}</p>
      )}

        <h1 className='text-slate-900 font-bold text-4xl mb-4'>
          Inicio De Sesion
        </h1>
        <label htmlFor="correo" className='text-slate-500 mb-2 block text-sm'>
            Correo:
        </label>
        <input type="email"
        {...register("correo",{
            required: {
                value: true,
                message: 'Correo es requerido'
            }
        })}
        className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
        placeholder='example@gmail.com'
        />
        {
          errors.correo && (
            <span className='text-red-500 font-bold text-xs'>
              {errors.correo.message}
            </span>
          )}

<label htmlFor="password" className='text-slate-500 mb-2 block text-sm'>
            Contraseña:
        </label>
        <input type="password"
        {...register("password",{
            required: {
                value: true,
                message: 'Contraseña requerida'
            }
        })}
        className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
        placeholder='*****'
        />
        {
          errors.password && (
            <span className='text-red-500 font-bold text-xs'>
              {errors.password.message}
            </span>
          )}
        <button className='w-full bg-blue-500 text-white p-3 rounded-lg mt-2'>
          Ingresar
        </button>
      </form>
    </div>
  )
}
