import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { fetchFichas, fetchProgramas } from "../../../../lib/fetch"; // Asegúrate de que la función fetch esté correctamente definida en tu archivo de fetch
import { format } from "date-fns"; // Importa la función format de date-fns
import { Button } from "@nextui-org/react";
import ActualizarFicha from "../../organisms/modals/fichas/ActualizarFicha"; // Asegúrate de que la ruta sea correcta
import Swal from "sweetalert2";

const FichasTable = () => {
  const [data, setData] = useState([]);
  const [programas, setProgramas] = useState({});
  const [selectedFicha, setSelectedFicha] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const fichasResponse = await fetchFichas();
        const programasResponse = await fetchProgramas();

        const programasMap = programasResponse.reduce((acc, programa) => {
          acc[programa.id_programa] = programa.nombre_programa;
          return acc;
        }, {});

        const updatedData = fichasResponse.map((ficha) => {
          // Convertir fechas de UTC a la zona horaria local
          const inicio_ficha = new Date(ficha.inicio_ficha);
          const fin_lectiva = new Date(ficha.fin_lectiva);
          const fin_ficha = new Date(ficha.fin_ficha);

          // Convertir a la fecha local
          const localInicioFicha = new Date(inicio_ficha.getTime() + inicio_ficha.getTimezoneOffset() * 60000);
          const localFinLectiva = new Date(fin_lectiva.getTime() + fin_lectiva.getTimezoneOffset() * 60000);
          const localFinFicha = new Date(fin_ficha.getTime() + fin_ficha.getTimezoneOffset() * 60000);

          return {
            ...ficha,
            inicio_ficha: format(localInicioFicha, "yyyy-MM-dd"),
            fin_lectiva: format(localFinLectiva, "yyyy-MM-dd"),
            fin_ficha: format(localFinFicha, "yyyy-MM-dd"),
            programa: programasMap[ficha.programa] || "Desconocido",
          };
        });

        setData(updatedData);
        setProgramas(programasMap);
      } catch (error) {
        console.error("Error fetching fichas:", error);
      }
    };

    getData();
  }, []);

  const handleUpdate = (updatedFicha) => {
    setData((prevData) =>
      prevData.map((ficha) =>
        ficha.codigo === updatedFicha.codigo ? updatedFicha : ficha
      )
    );
  };

  const handleDelete = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#84CC16',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
  
    if (!isConfirmed) return;
  
    try {
      const response = await fetch(`http://localhost:3000/api/fichas/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Error al eliminar la ficha');
      }
  
      setData((prevData) => prevData.filter((ficha) => ficha.codigo !== id));
  
      await Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: 'Ficha eliminada correctamente',
      });
    } catch (error) {
      console.error('Error al eliminar ficha:', error);
  
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar la ficha',
      });
    }
  };
  
  

  const columns = [
    { name: "codigo", label: "Código" },
    { name: "inicio_ficha", label: "Inicio Ficha" },
    { name: "fin_lectiva", label: "Fin Lectiva" },
    { name: "fin_ficha", label: "Fin Ficha" },
    { name: "programa", label: "Programa" },
    { name: "sede", label: "Sede" },
    { name: "estado", label: "Estado" },
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
                  setSelectedFicha(vinc);
                  setIsModalOpen(true);
                }}
              >
                Editar
              </Button>
              <Button
                className="bg-red-500 text-white"
                onClick={() => handleDelete(vinc.codigo)}
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
        title={"Fichas"}
        data={data}
        columns={columns}
        options={options}
      />
      {selectedFicha && (
        <ActualizarFicha
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          ficha={selectedFicha}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default FichasTable;




