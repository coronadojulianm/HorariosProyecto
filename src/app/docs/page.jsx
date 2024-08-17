import React from 'react';

const DataTable = () => {
  const data = [
    {
      title: 'TABLA HORARIOS',
      url: 'http://localhost:3000/api/horarios',
      json: `
      {
        "fecha_inicio": "2024-07-30T15:00:00Z",
        "hora_inicio": "2024-07-30T16:00:00Z",
        "fecha_fin": "2024-07-30T19:00:00Z",
        "hora_fin": "2024-07-30T19:00:00Z",
        "dia": "martes",
        "cantidad_horas": 3,
        "instructor": 1,
        "ficha": 2644590,
        "ambiente": 1,
        "estado": "aprobado"
      }
      `,
    },
    {
      title: 'TABLA PERSONAS',
      url: 'http://localhost:3000/api/personas/',
      json: `
      {
        "identificacion": "1117486332",
        "nombres": "julian coronado",
        "correo": "juliancoronadom@gmail.com",
        "telefono": "3143516907",
        "password": "123",
        "rol": "Coordinador",
        "cargo": "Aprendiz",
        "municipio": 1
      }
      `,
    },
    {
      title: 'TABLA VINCULACION',
      url: 'http://localhost:3000/api/vinculacion/',
      json: `
      {
        "instructor": 1,
        "tipo": "contratisca",
        "sede": "yamboro",
        "area": 1
      }
      `,
    },
    {
      title: 'TABLA PROGRAMAS',
      url: 'http://localhost:3000/api/programas/',
      json: `
      {
        "nombre_programa": "Analisis y desarrollo de software",
        "sigla": "ADSO",
        "nivel": "Tecnologo",
        "estado": "activo"
      }
      `,
    },
    {
      title: 'TABLA MUNICIPIOS',
      url: 'http://localhost:3000/api/municipios/',
      json: `
      {
        "nombre_mpio": "garzon",
        "departamento": "huila"
      }
      `,
    },
    {
      title: 'TABLA FICHAS',
      url: 'http://localhost:3000/api/fichas/',
      json: `
      {
        "codigo": 2644590,
        "inicio_ficha": "2024-07-30T11:17:14.000Z",
        "fin_lectiva": "2025-07-31T11:17:14.000Z",
        "fin_ficha": "2025-08-30T11:17:14.000Z",
        "programa": 1,
        "sede": "yamboro",
        "estado": "Lectiva"
      }
      `,
    },
    {
      title: 'TABLA AREAS',
      url: 'http://localhost:3000/api/areas/',
      json: `
      {
        "nombre_area": "escuela nacional del cafe"
      }
      `,
    },
    {
      title: 'TABLA AMBIENTES',
      url: 'http://localhost:3000/api/ambientes/',
      json: `
      {
        "nombre_amb": "y14",
        "municipio": 1,
        "sede": "yamboro",
        "estado": "activo"
      }
      `,
    },
  ];

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
  };

  const thTdStyle = {
    border: '1px solid black',
    padding: '8px',
  };

  const preStyle = {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  };

  const methodStyles = {
    GET: { color: 'green' },
    POST: { color: 'orange' },
    PUT: { color: 'blue' },
    DELETE: { color: 'red' },
  };

  const renderMethodCells = () => (
    <>
      <td style={{ ...thTdStyle, ...methodStyles.GET }}>GET</td>
      <td style={{ ...thTdStyle, ...methodStyles.POST }}>POST</td>
      <td style={{ ...thTdStyle, ...methodStyles.PUT }}>PUT</td>
      <td style={{ ...thTdStyle, ...methodStyles.DELETE }}>DELETE</td>
    </>
  );

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thTdStyle}>Título</th>
          <th style={thTdStyle}>URL</th>
          <th style={thTdStyle}>Solicitudes</th>
          <th style={thTdStyle}>JSON</th>
          <th style={thTdStyle}>Estado</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <tr>
              <td style={thTdStyle}>{item.title}</td>
              <td style={thTdStyle}>{item.url}</td>
              <td style={thTdStyle}>
                <span style={methodStyles.GET}>GET</span>,{' '}
                <span style={methodStyles.POST}>POST</span>,{' '}
                <span style={methodStyles.PUT}>PUT</span>,{' '}
                <span style={methodStyles.DELETE}>DELETE</span>
              </td>
              <td style={{ ...thTdStyle, ...preStyle }}>
                <pre>{item.json}</pre>
              </td>
              <td style={thTdStyle}>
                <p>Status 200: "correcto"</p>
                <p>Status 400: "error"</p>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;


