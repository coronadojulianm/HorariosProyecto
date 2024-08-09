import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import {
  fetchVinculaciones,
  fetchPersonas,
  fetchAreas,
} from "../../../../lib/fetch";
import { Button } from "@nextui-org/react";
import Swal from "sweetalert2";
import ActualizarVinculacion from '../../organisms/modals/vinculaciones/ActualizarVinculacion.jsx'

const VinculacionTable = () => {
  const [data, setData] = useState([]);
  const [personas, setPersonas] = useState({});
  const [areas, setAreas] = useState({});
  const [selectedVinculacion, setSelectedVinculacion] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const vinculacionesResponse = await fetchVinculaciones();
        const personasResponse = await fetchPersonas();
        const areasResponse = await fetchAreas();

        const personasMap = personasResponse.reduce((acc, persona) => {
          acc[persona.id_persona] = persona.nombres;
          return acc;
        }, {});

        const areasMap = areasResponse.reduce((acc, area) => {
          acc[area.id_area] = area.nombre_area;
          return acc;
        }, {});

        const updatedData = vinculacionesResponse.map((vinculacion) => ({
          id_vinculacion: vinculacion.id_vinculacion,
          instructor: personasMap[vinculacion.instructor] || "Desconocido",
          tipo: vinculacion.tipo,
          sede: vinculacion.sede,
          area: areasMap[vinculacion.area] || "Desconocido",
        }));

        setData(updatedData);
        setPersonas(personasMap);
        setAreas(areasMap);
      } catch (error) {
        console.error("Error fetching vinculaciones:", error);
      }
    };

    getData();
  }, []);

  const handleUpdate = (updatedData) => {
    fetch(`http://localhost:3000/api/vinculacion/${selectedVinculacion.id_vinculacion}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire("Actualizado", "La vinculación ha sido actualizada con éxito", "success");
          setData((prevData) =>
            prevData.map((item) =>
              item.id_vinculacion === selectedVinculacion.id_vinculacion
                ? { ...item, ...updatedData }
                : item
            )
          );
        } else {
          Swal.fire("Error", "No se pudo actualizar la vinculación, debe cambiar algun dato", "error");
        }
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

  const handleDelete = (id_vinculacion) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la vinculación permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#84CC16',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/api/vinculacion/${id_vinculacion}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              Swal.fire("Eliminado", "La vinculación ha sido eliminada con éxito", "success");
              setData((prevData) =>
                prevData.filter((item) => item.id_vinculacion !== id_vinculacion)
              );
            } else {
              Swal.fire("Error", "No se pudo eliminar la vinculación", "error");
            }
          })
          .catch((error) => {
            Swal.fire("Error", error.message, "error");
          });
      }
    });
  };

  const columns = [
    { name: "id_vinculacion", label: "ID Vinculación" },
    { name: "instructor", label: "Instructor" },
    { name: "tipo", label: "Tipo" },
    { name: "sede", label: "Sede" },
    { name: "area", label: "Área" },
    {
      name: "actions",
      label: "Acciones",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const vinc = data[tableMeta.rowIndex];
          return (
            <div>
              <Button
                className="bg-lime-500 text-white mr-2"
                onClick={() => {
                  setSelectedVinculacion(vinc);
                  setModalOpen(true);
                }}
              >
                Editar
              </Button>
              <Button
                className="bg-red-500 text-white"
                onClick={() => handleDelete(vinc.id_vinculacion)}
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
      <MUIDataTable title={"Vinculaciones"} data={data} columns={columns} options={options} />
      {selectedVinculacion && (
        <ActualizarVinculacion
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          vinculacion={selectedVinculacion}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default VinculacionTable;
