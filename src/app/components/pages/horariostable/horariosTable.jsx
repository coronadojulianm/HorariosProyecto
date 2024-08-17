import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import { Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { FaEdit, FaCheck, FaTimes, FaTrash } from 'react-icons/fa'; // Importar el icono de eliminar
import Swal from 'sweetalert2';
import ModalActualizarHorario from '../../organisms/modals/horario/ActualizarHorario';

const CalendarioTable = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHorario, setSelectedHorario] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    fetchData();
  }, [session]);

  const fetchData = () => {
    if (session) {
      const url = new URL('http://localhost:3000/api/horarios/calendario');
      url.searchParams.append('role', session.user.role);
  
      // Agregar parámetro nombres si es necesario
      if (session.user.role === 'Instructor' || session.user.role === 'Lider') {
        if (session.user.name) {
          url.searchParams.append('nombres', session.user.name);
        } else {
          console.error('Nombre del usuario no disponible en la sesión');
          return;
        }
      }
  
      fetch(url.toString())
        .then(response => response.json())
        .then(data => {
          // Manejo de datos aquí
          const formattedData = data.reduce((acc, item) => {
            const instructor = acc.find(i => i.instructor === item.instructor);
            const horarioData = formatHorario(item);

            if (instructor) {
              if (!instructor[item.dia_semana]) {
                instructor[item.dia_semana] = [];
              }
              if (horarioData) {
                instructor[item.dia_semana].push(horarioData);
              }
            } else {
              const newEntry = {
                instructor: item.instructor,
                areas: item.area,
                lunes: [],
                martes: [],
                miercoles: [],
                jueves: [],
                viernes: [],
                sabado: [],
                domingo: []
              };
              if (horarioData) {
                newEntry[item.dia_semana] = [horarioData];
              } else {
                newEntry[item.dia_semana] = 'Día sin horario';
              }
              acc.push(newEntry);
            }
            return acc;
          }, []);

          const finalizedData = formattedData.map(row => {
            const updatedRow = { ...row };
            const daysOfWeek = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
            daysOfWeek.forEach(day => {
              if (!updatedRow[day] || updatedRow[day] === null || (Array.isArray(updatedRow[day]) && updatedRow[day].length === 0)) {
                updatedRow[day] = 'Día sin horario';
              }
            });
            return updatedRow;
          });

          setData(finalizedData);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatHorario = (item) => {
    if (item.hora_inicio && item.hora_fin) {
      return {
        id: item.id,
        ficha: item.ficha,
        ambiente: item.ambiente,
        fechaInicio: item.fecha_inicio ? formatDate(item.fecha_inicio) : 'N/A',
        fechaFin: item.fecha_fin ? formatDate(item.fecha_fin) : 'N/A',
        horaInicio: item.hora_inicio,
        horaFin: item.hora_fin,
        estado: item.estado_horario || 'N/A'
      };
    } else {
      return null;
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'solicitud':
        return 'orange';
      case 'aprobado':
        return 'green';
      case 'no_aprobado':
        return 'red';
      default:
        return 'black';
    }
  };

  const confirmChange = (id, newState) => {
    const actionText = newState === 'aprobado' ? 'aprobar' : 'rechazar';
    Swal.fire({
      title: `¿Estás seguro de que deseas ${actionText} este horario?`,
      text: "No podrás deshacer esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Sí, ${actionText}`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        handleStateChange(id, newState);
      }
    });
  };

  const handleStateChange = (id, newState) => {
    fetch(`http://localhost:3000/api/horarios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ estado: newState }),
    })
    .then(response => response.json())
    .then(() => {
      fetchData();
    })
    .catch(error => console.error('Error updating state:', error));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar este horario?',
      text: "No podrás deshacer esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/api/horarios/${id}`, {
          method: 'DELETE',
        })
        .then(response => {
          if (response.ok) {
            Swal.fire('Eliminado', 'El horario ha sido eliminado', 'success');
            fetchData();
          } else {
            Swal.fire('Error', 'No se pudo eliminar el horario', 'error');
          }
        })
        .catch(error => console.error('Error deleting horario:', error));
      }
    });
  };

  const openEditModal = (horario) => {
    setSelectedHorario(horario);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHorario(null);
  };

  const renderCell = (value) => {
    if (value === 'Día sin horario') {
      return <Typography style={{ fontSize: '0.75rem' }}>{value}</Typography>;
    }
    
    const horarios = Array.isArray(value) ? value : [value];
  
    return (
      <>
        {horarios.map((item, index) => (
          <div key={index}>
            <Typography style={{ fontSize: '0.75rem' }}>ID Ficha: {item.ficha}</Typography>
            <Typography style={{ fontSize: '0.75rem' }}>Ambiente: {item.ambiente}</Typography>
            <Typography style={{ fontSize: '0.75rem' }}>Fecha inicio: {item.fechaInicio}</Typography>
            <Typography style={{ fontSize: '0.75rem' }}>Fecha Fin: {item.fechaFin}</Typography>
            <Typography style={{ fontSize: '0.75rem' }}>Hora inicio: {item.horaInicio}</Typography>
            <Typography style={{ fontSize: '0.75rem' }}>Hora Fin: {item.horaFin}</Typography>
            <Typography style={{ fontSize: '0.75rem', color: getEstadoColor(item.estado) }}>Estado: {item.estado}</Typography>
            {session.user.role === 'Coordinador' && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <FaEdit style={{ cursor: 'pointer' }} title="Actualizar" onClick={() => openEditModal(item)} />
                {item.estado === 'solicitud' && (
                  <>
                    <FaTimes
                      style={{ cursor: 'pointer', color: 'red' }}
                      title="Rechazar"
                      onClick={() => confirmChange(item.id, 'no_aprobado')}
                    />
                    <FaCheck
                      style={{ cursor: 'pointer', color: 'green' }}
                      title="Aprobar"
                      onClick={() => confirmChange(item.id, 'aprobado')}
                    />
                  </>
                )}
                <FaTrash
                  style={{ cursor: 'pointer', color: 'gray' }}
                  title="Eliminar"
                  onClick={() => handleDelete(item.id)}
                />
              </div>
            )}
            <br />
          </div>
        ))}
      </>
    );
  };
  
  const columns = [
    { name: "instructor", label: "Instructor" },
    { name: "areas", label: "Áreas" },
    { name: "lunes", label: "Lunes", options: { customBodyRender: renderCell }},
    { name: "martes", label: "Martes", options: { customBodyRender: renderCell }},
    { name: "miercoles", label: "Miércoles", options: { customBodyRender: renderCell }},
    { name: "jueves", label: "Jueves", options: { customBodyRender: renderCell }},
    { name: "viernes", label: "Viernes", options: { customBodyRender: renderCell }},
    { name: "sabado", label: "Sábado", options: { customBodyRender: renderCell }},
    { name: "domingo", label: "Domingo", options: { customBodyRender: renderCell }},
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'standard',
    selectableRows: 'none',
  };

  return (
    <>
      <MUIDataTable
        title={"Calendario de Horarios"}
        data={data}
        columns={columns}
        options={options}
      />
      {isModalOpen && (
        <ModalActualizarHorario
          isOpen={isModalOpen}
          onClose={closeModal}
          horario={selectedHorario}
        />
      )}
    </>
  );
};

export default CalendarioTable; 


















