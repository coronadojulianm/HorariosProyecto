// src/components/FichasTable.jsx
import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { fetchFichas, fetchProgramas } from '../../../../lib/fetch'; // Asegúrate de que la función fetch esté correctamente definida en tu archivo de fetch
import { format } from 'date-fns'; // Importa la función format de date-fns

const FichasTable = () => {
    const [data, setData] = useState([]);
    const [programas, setProgramas] = useState({}); // Mapa para guardar los nombres de programas

    useEffect(() => {
        const getData = async () => {
            try {
                // Obtener datos de fichas
                const fichasResponse = await fetchFichas();
                console.log('Datos de fichas:', fichasResponse);

                // Obtener datos de programas
                const programasResponse = await fetchProgramas();
                console.log('Datos de programas:', programasResponse);

                // Construir un mapa de programas
                const programasMap = programasResponse.reduce((acc, programa) => {
                    acc[programa.id_programa] = programa.nombre_programa;
                    return acc;
                }, {});

                // Mapear los datos de fichas con los nombres de programas y formatear las fechas
                const updatedData = fichasResponse.map(ficha => ({
                    codigo: ficha.codigo,
                    inicio_ficha: format(new Date(ficha.inicio_ficha), 'yyyy-MM-dd'),
                    fin_lectiva: format(new Date(ficha.fin_lectiva), 'yyyy-MM-dd'),
                    fin_ficha: format(new Date(ficha.fin_ficha), 'yyyy-MM-dd'),
                    programa: programasMap[ficha.programa] || 'Desconocido', // Añadir manejo de valores desconocidos
                    sede: ficha.sede,
                    estado: ficha.estado,
                }));

                console.log('Datos actualizados:', updatedData);

                setData(updatedData);
                setProgramas(programasMap);
            } catch (error) {
                console.error('Error fetching fichas:', error);
            }
        };

        getData();
    }, []);

    const columns = [
        { name: 'codigo', label: 'Código' },
        { name: 'inicio_ficha', label: 'Inicio Ficha' },
        { name: 'fin_lectiva', label: 'Fin Lectiva' },
        { name: 'fin_ficha', label: 'Fin Ficha' },
        { name: 'programa', label: 'Programa' },
        { name: 'sede', label: 'Sede' },
        { name: 'estado', label: 'Estado' }
    ];

    const options = {
        filterType: 'checkbox',
        scroll: "vertical"
    };

    return (
        <MUIDataTable
            title={"Fichas"}
            data={data}
            columns={columns}
            options={options}
        />
    );
};

export default FichasTable;




