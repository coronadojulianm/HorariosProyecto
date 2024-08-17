import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Button } from "@nextui-org/react";
import Swal from "sweetalert2";
import ActualizarPersona from "../../organisms/modals/personas/ActualizarPersonas"; // Asegúrate de importar el modal

const PersonasTable = () => {
  const [data, setData] = useState([]);
  const [municipios, setMunicipios] = useState({});
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const personasResponse = await fetch("http://localhost:3000/api/personas").then((res) => res.json());
        console.log("personasResponse:", personasResponse);

        const municipiosResponse = await fetch("http://localhost:3000/api/municipios").then((res) => res.json());
        console.log("municipiosResponse:", municipiosResponse);

        const municipiosMap = municipiosResponse.reduce((acc, municipio) => {
          acc[municipio.id_municipio] = municipio.nombre_mpio;
          return acc;
        }, {});
        console.log("municipiosMap:", municipiosMap);

        const updatedData = personasResponse.data.map((persona) => {
          console.log("Persona Municipio ID:", persona.municipio);
          return {
            ...persona,
            municipio: municipiosMap[persona.municipio] || "Desconocido",
          };
        });

        console.log("Updated Data:", updatedData);
        setData(updatedData);
        setMunicipios(municipiosMap);
      } catch (error) {
        console.error("Error fetching personas:", error);
      }
    };

    getData();
  }, []);

  const handleUpdate = (updatedPersona) => {
    setData((prevData) =>
      prevData.map((persona) =>
        persona.id_persona === updatedPersona.id_persona ? updatedPersona : persona
      )
    );
  };

  const handleDelete = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#84CC16",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!isConfirmed) return;

    try {
      const response = await fetch(`http://localhost:3000/api/personas/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la persona");
      }

      setData((prevData) => prevData.filter((persona) => persona.id_persona !== id));

      await Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "Persona eliminada correctamente",
      });
    } catch (error) {
      console.error("Error al eliminar persona:", error);

      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar la persona",
      });
    }
  };

  const columns = [
    { name: "id_persona", label: "ID Persona" },
    { name: "identificacion", label: "Identificación" },
    { name: "nombres", label: "Nombres" },
    { name: "correo", label: "Correo" },
    { name: "telefono", label: "Teléfono" },
    { name: "rol", label: "Rol" },
    { name: "cargo", label: "Cargo" },
    { name: "municipio", label: "Municipio" },
    {
      name: "actions",
      label: "Acciones",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const persona = data[tableMeta.rowIndex];
          return (
            <div>
              <Button
                className="bg-lime-500 text-white mr-2"
                onClick={() => {
                  setSelectedPersona(persona);
                  setIsModalOpen(true);
                }}
              >
                Editar
              </Button>
              <Button
                className="bg-red-500 text-white"
                onClick={() => handleDelete(persona.id_persona)}
              >
                Eliminar
              </Button>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    scroll: "vertical",
  };

  return (
    <>
      <MUIDataTable
        title={"Personas"}
        data={data}
        columns={columns}
        options={options}
      />
      <ActualizarPersona
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        persona={selectedPersona}
        onUpdate={handleUpdate}
      />
    </>
  );
};

export default PersonasTable;




