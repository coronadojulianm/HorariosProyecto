"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'; // Importar SweetAlert2

export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [municipios, setMunicipios] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchMunicipios() {
            try {
                const res = await fetch('/api/municipios');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setMunicipios(data);
                } else {
                    console.error('La respuesta del backend no es un array:', data);
                }
            } catch (error) {
                console.error('Error al obtener municipios:', error);
            }
        }
        fetchMunicipios();
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        data.municipio = parseInt(data.municipio, 10); // Asegúrate de que el municipio sea un número

        try {
            const res = await fetch('/api/personas', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const resJson = await res.json();
            console.log(resJson);
            if (res.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    text: 'Usuario registrado correctamente.',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push('/auth/login');
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: resJson.message || 'Hubo un problema al registrar el usuario.',
                });
            }
        } catch (error) {
            console.error('Error al enviar datos:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al enviar los datos.',
            });
        }
    });

    return (
        <div className='h-[calc(125vh-7rem)] flex justify-center items-center'>
            <form onSubmit={onSubmit} className='w-1/4'>
                <h1 className='text-slate-900 font-bold text-4xl mb-4'>
                    Registrar
                </h1>
                <label htmlFor="identificacion" className='text-slate-500 mb-2 block text-sm'>
                    Identificacion:
                </label>
                <input type="number"
                {...register("identificacion",{
                    required: {
                        value: true,
                        message: 'Identificacion requerida'
                    }
                })}
                className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                placeholder='1111222333'
                />
                {
                    errors.identificacion && (
                        <span className='text-red-500 font-bold text-xs'>
                            {errors.identificacion.message}
                        </span>
                    )
                }

                <label htmlFor="nombres" className='text-slate-500 mb-2 block text-sm'>
                    Nombre Completo:
                </label>
                <input type="text" 
                {...register("nombres",{
                    required: {
                        value: true,
                        message: 'Nombre requerido'
                    }
                })}
                className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                placeholder='Pepito'
                />
                {
                    errors.nombres && (
                        <span className='text-red-500 font-bold text-xs'>
                            {errors.nombres.message}
                        </span>
                    )
                }
                
                <label htmlFor="correo" className='text-slate-500 mb-2 block text-sm'>
                    Correo:
                </label>
                <input type="email" 
                {...register("correo",{
                    required: {
                        value: true,
                        message: 'Correo requerido'
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
                    )
                }

                <label htmlFor="telefono" className='text-slate-500 mb-2 block text-sm'>
                    Telefono:
                </label>
                <input type="number" 
                {...register("telefono",{
                    required: {
                        value: true,
                        message: 'Numero de telefono requerido'
                    }
                })}
                className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                placeholder='32032016507'
                />
                {
                    errors.telefono && (
                        <span className='text-red-500 font-bold text-xs'>
                            {errors.telefono.message}
                        </span>
                    )
                }

                <label htmlFor="rol" className='text-slate-500 mb-2 block text-sm'>
                    Rol:
                </label>
                <select
                    {...register("rol", {
                        required: {
                            value: true,
                            message: 'Rol requerido'
                        }
                    })}
                    className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                >
                    <option value="">Seleccionar Rol</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Coordinador">Coordinador</option>
                    <option value="Lider">Lider</option>
                </select>
                {
                    errors.rol && (
                        <span className='text-red-500 font-bold text-xs'>
                            {errors.rol.message}
                        </span>
                    )
                }

                <label htmlFor="cargo" className='text-slate-500 mb-2 block text-sm'>
                    Cargo:
                </label>
                <select
                    {...register("cargo", {
                        required: {
                            value: true,
                            message: 'Cargo requerido'
                        }
                    })}
                    className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                >
                    <option value="">Seleccionar Cargo</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Aprendiz">Aprendiz</option>
                    <option value="Coordinador">Coordinador</option>
                </select>
                {
                    errors.cargo && (
                        <span className='text-red-500 font-bold text-xs'>
                            {errors.cargo.message}
                        </span>
                    )
                }

                <label htmlFor="municipio" className='text-slate-500 mb-2 block text-sm'>
                    Municipio:
                </label>
                <select
                    {...register("municipio", {
                        required: {
                            value: true,
                            message: 'Municipio requerido'
                        }
                    })}
                    className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                >
                    <option value="">Seleccionar Municipio</option>
                    {municipios.map(municipio => (
                        <option key={municipio.id_municipio} value={municipio.id_municipio}>
                            {municipio.nombre_mpio}
                        </option>
                    ))}
                </select>
                {
                    errors.municipio && (
                        <span className='text-red-500 font-bold text-xs'>
                            {errors.municipio.message}
                        </span>
                    )
                }

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
                    )
                }


                <button className='w-full bg-blue-500 text-white p-3 rounded-lg mt-2'>
                    Registrar
                </button>
            </form>
        </div>
    )
}

