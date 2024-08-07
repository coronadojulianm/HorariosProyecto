// src/components/HorariosTable.jsx
import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { format } from "date-fns";
import {
  fetchHorarios,
  fetchAmbientes,
  fetchPersonas,
} from "../../../../lib/fetch"; // Ajusta la ruta si es necesario

const HorariosTable = () => {
  const [data, setData] = useState([]);
  const [personas, setPersonas] = useState({});
  const [ambientes, setAmbientes] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        // Obtener datos de horarios
        const horariosData = await fetchHorarios();

        // Obtener datos de personas
        const personasData = await fetchPersonas();

        // Obtener datos de ambientes
        const ambientesData = await fetchAmbientes();

        // Construir un mapa de personas
        const personasMap = personasData.reduce((acc, persona) => {
          acc[persona.id_persona] = persona.nombres;
          return acc;
        }, {});

        // Construir un mapa de ambientes
        const ambientesMap = ambientesData.reduce((acc, ambiente) => {
          acc[ambiente.id_ambiente] = ambiente.nombre_amb;
          return acc;
        }, {});

        // Mapear los datos de horarios con nombres de instructores y ambientes
        const updatedData = horariosData.map((horario) => ({
          id_horario: horario.id_horario,
          fecha_inicio: horario.fecha_inicio,
          hora_inicio: horario.hora_inicio,
          fecha_fin: horario.fecha_fin,
          hora_fin: horario.hora_fin,
          dia: horario.dia,
          cantidad_horas: horario.cantidad_horas,
          instructor: personasMap[horario.instructor] || "Desconocido", // Añadir manejo de valores desconocidos
          ficha: horario.ficha,
          ambiente: ambientesMap[horario.ambiente] || "Desconocido", // Añadir manejo de valores desconocidos
          estado: horario.estado,
        }));

        setData(updatedData);
        setPersonas(personasMap);
        setAmbientes(ambientesMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const formatDate = (date) => format(new Date(date), "yyyy-MM-dd");
  const formatTime = (date) => format(new Date(date), "HH:mm:ss");

  const columns = [
    { name: "id_horario", label: "ID Horario" },
    {
      name: "fecha_inicio",
      label: "Fecha Inicio",
      options: {
        customBodyRender: (value) => formatDate(value),
      },
    },
    {
      name: "hora_inicio",
      label: "Hora Inicio",
      options: {
        customBodyRender: (value) => formatTime(value),
      },
    },
    {
      name: "fecha_fin",
      label: "Fecha Fin",
      options: {
        customBodyRender: (value) => formatDate(value),
      },
    },
    {
      name: "hora_fin",
      label: "Hora Fin",
      options: {
        customBodyRender: (value) => formatTime(value),
      },
    },
    { name: "dia", label: "Día" },
    { name: "cantidad_horas", label: "Cantidad Horas" },
    { name: "instructor", label: "Instructor" },
    { name: "ficha", label: "Ficha" },
    { name: "ambiente", label: "Ambiente" },
    { name: "estado", label: "Estado" },
  ];

  const options = {
    filterType: "checkbox",
    scroll: "vertical",
  };

  return (
    <MUIDataTable
      title={"Horarios"}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default HorariosTable;
