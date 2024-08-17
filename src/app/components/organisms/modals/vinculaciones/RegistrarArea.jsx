import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import Swal from 'sweetalert2';

export default function RegistrarArea() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    nombre_area: "",
    lider: "",
  });

  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchPersonas();
    }
  }, [isOpen]);

  const fetchPersonas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/personas");
      if (!response.ok) {
        throw new Error("Error al obtener las personas");
      }
      const result = await response.json();
      if (Array.isArray(result.data)) {
        setPersonas(result.data);
      } else {
        throw new Error("Estructura de datos inesperada");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error al cargar las personas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updatePersonaRole = async (idPersona) => {
    try {
      const response = await fetch(`http://localhost:3000/api/personas/${idPersona}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rol: "Lider" }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el rol de la persona");
      }
    } catch (error) {
      console.error("Error al actualizar el rol de la persona:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!formData.nombre_area || !formData.lider) {
        await Swal.fire({
          title: 'Campos Vacíos',
          text: 'Por favor, complete todos los campos.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }

      const newFormData = {
        nombre_area: formData.nombre_area,
        lider: Number(formData.lider),
      };

      console.log("Enviando datos:", newFormData);

      const response = await fetch("http://localhost:3000/api/areas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFormData),
      });

      if (!response.ok) {
        throw new Error("Error al registrar el área");
      }

      // Actualizar el rol del líder si es un Instructor
      const persona = personas.find(p => p.id_persona === Number(formData.lider));
      if (persona && persona.rol === "Instructor") {
        await updatePersonaRole(persona.id_persona);
      }

      Swal.fire({
        title: 'Éxito',
        text: 'El área se registró correctamente.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });

      onOpenChange(false);  // Cerrar el modal después del registro
    } catch (error) {
      console.error("Error al registrar el área:", error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al registrar el área.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <>
      <Button onPress={onOpen}>Registrar Área</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader>Registrar Área</ModalHeader>
            <ModalBody>
              <Input
                name="nombre_area"
                value={formData.nombre_area}
                onChange={handleChange}
                placeholder="Nombre del Área"
                label="Nombre del Área"
              />
              <Select
                label="Líder"
                name="lider"
                value={formData.lider}
                onChange={(e) => handleSelectChange("lider", e.target.value)}
              >
                {loading ? (
                  <SelectItem value="">Cargando líderes...</SelectItem>
                ) : error ? (
                  <SelectItem value="">Error al cargar líderes</SelectItem>
                ) : personas.length > 0 ? (
                  personas.map((persona) => (
                    <SelectItem
                      key={persona.id_persona}
                      value={persona.id_persona.toString()}
                      textValue={`${persona.nombres} (${persona.rol})`} // Añadir texto accesible
                    >
                      {persona.nombres} ({persona.rol})
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="">No hay personas disponibles</SelectItem>
                )}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={() => onOpenChange(false)}>
                Cerrar
              </Button>
              <Button className="bg-lime-500 text-white" onPress={handleSubmit}>
                Registrar
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}








