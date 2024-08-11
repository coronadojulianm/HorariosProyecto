import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import {
  fetchHorarios,
  fetchAmbientes,
  fetchPersonas,
} from "../../../../lib/fetch"; // Ajusta la ruta si es necesario
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import Swal from "sweetalert2";
import ActualizarHorario from "../../organisms/modals/horario/ActualizarHorario"; // Ajusta la ruta si es necesario

const HorariosTable = () => {
  const [data, setData] = useState([]);
  const [instructores, setInstructores] = useState([]);
  const [ambientes, setAmbientes] = useState({});
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const horariosData = await fetchHorarios();

        const ambientesData = await fetchAmbientes();

        // Obtener datos de vinculaciones y personas
        const vinculacionResponse = await fetch(
          "http://localhost:3000/api/vinculacion"
        );
        if (!vinculacionResponse.ok)
          throw new Error("Error al obtener vinculaciones");
        const vinculacionResult = await vinculacionResponse.json();

        const personasResponse = await fetch(
          "http://localhost:3000/api/personas"
        );
        if (!personasResponse.ok) throw new Error("Error al obtener personas");
        const personasResult = await personasResponse.json();

        // Crear un mapa de personas por id_persona
        const personasMap = new Map(
          personasResult.data.map((persona) => [
            persona.id_persona,
            persona.nombres,
          ])
        );

        // Mapear vinculaciones con nombres de personas
        const instructoresConNombre = vinculacionResult.data.map(
          (vinculacion) => ({
            id_vinculacion: vinculacion.id_vinculacion,
            nombre:
              personasMap.get(vinculacion.instructor) || "Nombre no disponible",
          })
        );

        // Crear un mapa de ambientes por id_ambiente
        const ambientesMap = ambientesData.reduce((acc, ambiente) => {
          acc[ambiente.id_ambiente] = ambiente.nombre_amb;
          return acc;
        }, {});

        // Combinar datos de horarios con nombres de instructores
        const updatedData = horariosData.map((horario) => {
          const instructor = instructoresConNombre.find(
            (inst) => inst.id_vinculacion === horario.instructor
          );
          const instructorNombre = instructor
            ? instructor.nombre
            : "Desconocido";

          return {
            id_horario: horario.id_horario,
            fecha_inicio: horario.fecha_inicio,
            hora_inicio: horario.hora_inicio,
            fecha_fin: horario.fecha_fin,
            hora_fin: horario.hora_fin,
            dia: horario.dia,
            cantidad_horas: horario.cantidad_horas,
            instructor: instructorNombre,
            ficha: horario.ficha,
            ambiente: ambientesMap[horario.ambiente] || "Desconocido",
            estado: horario.estado,
          };
        });

        setData(updatedData);
        setInstructores(instructoresConNombre);
        setAmbientes(ambientesMap);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleEstadoChange = async (id, newEstado) => {
    try {
      const response = await fetch(`http://localhost:3000/api/horarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: newEstado }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el estado");
      }

      setData((prevData) =>
        prevData.map((horario) =>
          horario.id_horario === id
            ? { ...horario, estado: newEstado }
            : horario
        )
      );

      await Swal.fire({
        icon: "success",
        title: "Actualizado",
        text: "Estado actualizado correctamente",
      });
    } catch (error) {
      console.error("Error al actualizar estado:", error);

      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el estado",
      });
    }
  };

  const handleDelete = (id_horario) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el horario permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#84CC16",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/api/horarios/${id_horario}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              Swal.fire(
                "Eliminado",
                "El horario ha sido eliminado con éxito",
                "success"
              );
              setData((prevData) =>
                prevData.filter((item) => item.id_horario !== id_horario)
              );
            } else {
              Swal.fire("Error", "No se pudo eliminar el horario", "error");
            }
          })
          .catch((error) => {
            Swal.fire("Error", error.message, "error");
          });
      }
    });
  };

  const handleUpdate = (updatedData) => {
    fetch(`http://localhost:3000/api/horarios/${selectedHorario.id_horario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
  };

  const getButtonClass = (estado) => {
    switch (estado) {
      case "aprobado":
        return "bg-lime-500 text-white";
      case "solicitud":
        return "bg-gray-500 text-white";
      case "no_aprobado":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const columns = [
    { name: "id_horario", label: "ID Horario" },
    {
      name: "instructor",
      label: "Instructor",
      options: {
        customBodyRender: (value) => {
          // Mostrar nombre del instructor
          return value;
        },
      },
    },
    { name: "ficha", label: "Ficha" },
    { name: "ambiente", label: "Ambiente" },
    { name: "dia", label: "Día" },
    { name: "cantidad_horas", label: "Cantidad Horas" },
    {
      name: "fecha_inicio",
      label: "Fecha Inicio",
      options: {
        customBodyRender: (value) => {
          // Extraer solo la fecha del string
          const date = new Date(value).toISOString().substr(0, 10);
          return date;
        },
      },
    },
    {
      name: "hora_inicio",
      label: "Hora Inicio",
      options: {
        customBodyRender: (value) => {
          // Extraer solo la hora del string
          const time = new Date(value).toISOString().substr(11, 8);
          return time;
        },
      },
    },
    {
      name: "fecha_fin",
      label: "Fecha Fin",
      options: {
        customBodyRender: (value) => {
          // Extraer solo la fecha del string
          const date = new Date(value).toISOString().substr(0, 10);
          return date;
        },
      },
    },
    {
      name: "hora_fin",
      label: "Hora Fin",
      options: {
        customBodyRender: (value) => {
          // Extraer solo la hora del string
          const time = new Date(value).toISOString().substr(11, 8);
          return time;
        },
      },
    },
    {
      name: "estado",
      label: "Estado",
      options: {
        customBodyRender: (value, tableMeta) => {
          const horario = data[tableMeta.rowIndex];
          return (
            <Dropdown>
              <DropdownTrigger className={getButtonClass(horario.estado)}>
                <Button>{horario.estado}</Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Cambiar estado"
                onAction={(key) => handleEstadoChange(horario.id_horario, key)}
              >
                <DropdownItem key="solicitud">Solicitud</DropdownItem>
                <DropdownItem key="aprobado">Aprobado</DropdownItem>
                <DropdownItem key="no_aprobado">No Aprobado</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
        },
      },
    },
    {
      name: "actions",
      label: "Acciones",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const horario = data[tableMeta.rowIndex];
          return (
            <div>
              <Button
                className="bg-lime-500 text-white mr-2"
                onClick={() => {
                  setSelectedHorario(horario);
                  setModalOpen(true);
                }}
              >
                Editar
              </Button>
              <Button
                className="bg-red-500 text-white"
                onClick={() => handleDelete(horario.id_horario)}
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
        title={"Horarios"}
        data={data}
        columns={columns}
        options={options}
      />
      {selectedHorario && (
        <ActualizarHorario
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          horario={selectedHorario}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default HorariosTable;
