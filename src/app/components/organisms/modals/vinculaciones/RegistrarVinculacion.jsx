import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem
} from "@nextui-org/react";
import Swal from 'sweetalert2';

const tiposVinculacion = [
  { value: 'contratisca', label: 'Contratista' },
  { value: 'planta', label: 'Planta' }
];

const sedes = [
  { value: 'centro', label: 'Centro' },
  { value: 'yamboro', label: 'Yamboro' }
];

export default function RegistrarVinculacion() {
  const [isOpen, setIsOpen] = useState(false);
  const [instructores, setInstructores] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("");
  const [selectedSede, setSelectedSede] = useState("");

  useEffect(() => {
    async function fetchInstructores() {
      try {
        const response = await fetch('/api/personas');
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Instructores:', data.data); // Verifica los datos
        setInstructores(data.data);
      } catch (error) {
        console.error("Error fetching instructores:", error);
      }
    }
    
    async function fetchAreas() {
      try {
        const response = await fetch('/api/areas');
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Áreas:', data.data); // Verifica los datos
        setAreas(data.data);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    }

    fetchInstructores();
    fetchAreas();
  }, []);

  const handleRegister = async () => {
    if (!selectedInstructor || !selectedTipo || !selectedSede || !selectedArea) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Todos los campos son necesarios',
      });
      return;
    }

    const data = {
      instructor: parseInt(selectedInstructor), // Asegúrate de que sea un número
      tipo: selectedTipo,
      sede: selectedSede,
      area: parseInt(selectedArea) // Asegúrate de que sea un número
    };

    try {
      const response = await fetch('/api/vinculacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: 'Vinculación registrada correctamente',
        }).then(() => {
          window.location.reload(); // Refresca la página después de cerrar la alerta
        });
        setIsOpen(false); // Cierra el modal
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error al registrar la vinculación: ${errorData.error}`,
        });
      }
    } catch (error) {
      console.error("Error registering vinculacion:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al registrar la vinculación',
      });
    }
  };

  return (
    <>
      <Button className="bg-lime-500 text-white ml-5" onClick={() => setIsOpen(true)}>Registrar Vinculación</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent>
          <ModalHeader>
            Registrar Vinculación
          </ModalHeader>
          <ModalBody>
            <form>
              <Select
                placeholder="Seleccionar Instructor"
                onChange={(e) => setSelectedInstructor(e.target.value)}
                aria-label="Seleccionar Instructor"
                value={selectedInstructor}
                className="mb-4"
              >
                {instructores.length > 0 ? (
                  instructores.map((instructor) => (
                    <SelectItem key={instructor.id_persona} value={instructor.id_persona}>
                      {instructor.nombres}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>No hay instructores disponibles</SelectItem>
                )}
              </Select>
              
              <Select
                placeholder="Seleccionar Área"
                onChange={(e) => setSelectedArea(e.target.value)}
                aria-label="Seleccionar Área"
                value={selectedArea}
                className="mb-4"
              >
                {areas.length > 0 ? (
                  areas.map((area) => (
                    <SelectItem key={area.id_area} value={area.id_area}>
                      {area.nombre_area}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>No hay áreas disponibles</SelectItem>
                )}
              </Select>

              <Select
                placeholder="Seleccionar Tipo de Vinculación"
                onChange={(e) => setSelectedTipo(e.target.value)}
                aria-label="Seleccionar Tipo de Vinculación"
                value={selectedTipo}
                className="mb-4"
              >
                {tiposVinculacion.map((tipo) => (
                  <SelectItem key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </SelectItem>
                ))}
              </Select>
              
              <Select
                placeholder="Seleccionar Sede"
                onChange={(e) => setSelectedSede(e.target.value)}
                aria-label="Seleccionar Sede"
                value={selectedSede}
              >
                {sedes.map((sede) => (
                  <SelectItem key={sede.value} value={sede.value}>
                    {sede.label}
                  </SelectItem>
                ))}
              </Select>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onClick={() => setIsOpen(false)}>
              Cerrar
            </Button>
            <Button className="bg-lime-500 text-white" onClick={handleRegister}>
              Registrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}









