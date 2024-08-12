import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';

const CalendarioTable = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const { data: session } = useSession(); // Obtén los datos de la sesión actual

  useEffect(() => {
    if (session) {
      const url = new URL('http://localhost:3000/api/horarios/calendario');
      url.searchParams.append('role', session.user.role);
      if (session.user.role === 'Instructor') {
        url.searchParams.append('nombres', session.user.name); // Usa el nombre en lugar de id_persona
      }
  
      fetch(url.toString())
        .then(response => response.json())
        .then(data => {
          // Procesa los datos según el formato esperado
          const formattedData = data.reduce((acc, item) => {
            const instructor = acc.find(i => i.instructor === item.instructor);
            
            const horarioData = formatHorario(item);
  
            if (instructor) {
              if (!Array.isArray(instructor[item.dia_semana])) {
                instructor[item.dia_semana] = []; // Inicializa como array vacío si no existe
              }
              if (horarioData) {
                instructor[item.dia_semana].push(horarioData);
              }
            } else {
              acc.push({
                instructor: item.instructor,
                lunes: 'Día sin horario',
                martes: 'Día sin horario',
                miercoles: 'Día sin horario',
                jueves: 'Día sin horario',
                viernes: 'Día sin horario',
                sabado: 'Día sin horario',
                domingo: 'Día sin horario',
                [item.dia_semana]: horarioData ? [horarioData] : 'Día sin horario'
              });
            }
            return acc;
          }, []);
  
          // Asegura que cada celda que no tenga datos se muestre como "Día sin horario"
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
  }, [session]); // Dependencia en session para actualizar cuando cambie
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses de 1 a 12
    const day = String(date.getDate()).padStart(2, '0'); // Días de 1 a 31
    return `${year}-${month}-${day}`;
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toISOString().substr(11, 5); // Extrae HH:mm de la hora
  };

  const formatHorario = (item) => {
    if (item.hora_inicio && item.hora_fin) {
      return {
        horaInicio: formatTime(item.hora_inicio),
        horaFin: formatTime(item.hora_fin),
        fechaInicio: item.fecha_inicio ? formatDate(item.fecha_inicio) : 'N/A',
        fechaFin: item.fecha_fin ? formatDate(item.fecha_fin) : 'N/A',
        ambiente: item.ambiente || 'N/A',
        ficha: item.ficha || 'N/A',
        estado: item.estado_horario || 'N/A'
      };
    } else {
      return null; // Indica que no hay datos
    }
  };

  const handleClickOpen = (items) => {
    if (items === 'Día sin horario') {
      setDialogContent(<Typography>Día sin horario</Typography>);
    } else {
      // Asegurarse de que items sea un array
      const horarios = Array.isArray(items) ? items : [items];

      const formattedContent = horarios.map((item, index) => (
        <div key={index}>
          <Typography variant="h6">Detalle del Horario {index + 1}:</Typography>
          <Typography>Fecha inicio: {item.fechaInicio}</Typography>
          <Typography>Fecha Fin: {item.fechaFin}</Typography>
          <Typography>Hora inicio: {item.horaInicio}</Typography>
          <Typography>Hora Fin: {item.horaFin}</Typography>
          <Typography>Ambiente: {item.ambiente}</Typography>
          <Typography>Ficha: {item.ficha}</Typography>
          <Typography>Estado: {item.estado}</Typography>
          <br />
        </div>
      ));

      setDialogContent(formattedContent);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderCell = (value) => {
    // Mostrar el botón solo si el valor no es 'Día sin horario' y si hay datos válidos
    if (value === 'Día sin horario') {
      return value; // Muestra "Día sin horario" sin botón
    }
    return (
      <Button variant="outlined" onClick={() => handleClickOpen(value)}>
        Ver
      </Button>
    );
  };

  const columns = [
    { name: "instructor", label: "Instructor" },
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Detalle del Horario</DialogTitle>
        <DialogContent>
          {dialogContent}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CalendarioTable;


















