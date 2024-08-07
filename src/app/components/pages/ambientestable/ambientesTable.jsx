// src/components/AmbientesTable.jsx
import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { fetchAmbientes } from '../../../../lib/fetch'; // Ajusta la ruta según la estructura de carpetas

const AmbientesTable = () => {
    const [data, setData] = useState([]);
    const [municipios, setMunicipios] = useState({}); // Mapa para guardar los nombres de municipios

    useEffect(() => {
        const getData = async () => {
            try {
                // Obtener datos de ambientes
                const ambientesResponse = await fetchAmbientes();
                console.log('Datos de ambientes:', ambientesResponse);

                // Obtener datos de municipios
                const municipiosResponse = await fetch('/api/municipios').then(res => res.json());
                console.log('Datos de municipios:', municipiosResponse);

                // Construir un mapa de municipios
                const municipiosMap = municipiosResponse.reduce((acc, municipio) => {
                    acc[municipio.id_municipio] = municipio.nombre_mpio;
                    return acc;
                }, {});

                // Mapear los datos de ambientes con los nombres de municipios
                const updatedData = ambientesResponse.map(ambiente => ({
                    id_ambiente: ambiente.id_ambiente,
                    nombre_amb: ambiente.nombre_amb,
                    municipio: municipiosMap[ambiente.municipio] || 'Desconocido', // Añadir manejo de valores desconocidos
                    sede: ambiente.sede,
                    estado: ambiente.estado,
                }));

                console.log('Datos actualizados:', updatedData);

                setData(updatedData);
                setMunicipios(municipiosMap);
            } catch (error) {
                console.error('Error fetching ambientes:', error);
            }
        };

        getData();
    }, []);

    const columns = [
        { name: 'id_ambiente', label: 'ID Ambiente' },
        { name: 'nombre_amb', label: 'Nombre Ambiente' },
        { name: 'municipio', label: 'Municipio' },
        { name: 'sede', label: 'Sede' },
        { name: 'estado', label: 'Estado' }
    ];

    const options = {
        filterType: 'checkbox',
        scroll: "vertical"
    };

    return (
        <MUIDataTable
            title={"Ambientes"}
            data={data}
            columns={columns}
            options={options}
        />
    );
};

export default AmbientesTable;




