// src/components/VinculacionTable.jsx
import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { fetchVinculaciones, fetchPersonas } from "../../../../lib/fetch"; // Asegúrate de que la función fetch esté correctamente definida en tu archivo de fetch
import { format } from "date-fns"; // Importa la función format de date-fns si quieres formatear fechas

const VinculacionTable = () => {
  const [data, setData] = useState([]);
  const [personas, setPersonas] = useState({}); // Mapa para guardar los nombres de los instructores

  useEffect(() => {
    const getData = async () => {
      try {
        // Obtener datos de vinculaciones
        const vinculacionesResponse = await fetchVinculaciones();
        console.log("Datos de vinculaciones:", vinculacionesResponse);

        // Obtener datos de personas
        const personasResponse = await fetchPersonas();
        console.log("Datos de personas:", personasResponse);

        // Construir un mapa de personas
        const personasMap = personasResponse.reduce((acc, persona) => {
          acc[persona.id_persona] = persona.nombres;
          return acc;
        }, {});

        // Mapear los datos de vinculaciones con los nombres de los instructores
        const updatedData = vinculacionesResponse.map((vinculacion) => ({
          id_vinculacion: vinculacion.id_vinculacion,
          instructor: personasMap[vinculacion.instructor] || "Desconocido", // Añadir manejo de valores desconocidos
          tipo: vinculacion.tipo,
          sede: vinculacion.sede,
          area: vinculacion.area,
        }));

        console.log("Datos actualizados:", updatedData);

        setData(updatedData);
        setPersonas(personasMap);
      } catch (error) {
        console.error("Error fetching vinculaciones:", error);
      }
    };

    getData();
  }, []);

  const columns = [
    { name: "id_vinculacion", label: "ID Vinculación" },
    { name: "instructor", label: "Instructor" },
    { name: "tipo", label: "Tipo" },
    { name: "sede", label: "Sede" },
    { name: "area", label: "Área" },
  ];

  const options = {
    filterType: "checkbox",
    scroll: "vertical"
  };

  return (
    <MUIDataTable
      title={"Vinculaciones"}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

export default VinculacionTable;
