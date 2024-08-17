import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import Swal from 'sweetalert2';

export default function RegistrarMunicipio() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    nombre_mpio: "",
    departamento: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateLetters = (value) => {
    return /^[A-Za-z\s]+$/.test(value);  // Verifica si el valor solo contiene letras y espacios
  };

  const handleSubmit = async () => {
    try {
      if (!formData.nombre_mpio || !formData.departamento) {
        await Swal.fire({
          title: 'Campos Vacíos',
          text: 'Por favor, complete todos los campos.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }

      if (!validateLetters(formData.nombre_mpio)) {
        await Swal.fire({
          title: 'Nombre Inválido',
          text: 'El nombre del municipio debe contener solo letras.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }

      if (!validateLetters(formData.departamento)) {
        await Swal.fire({
          title: 'Departamento Inválido',
          text: 'El departamento debe contener solo letras.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }

      const newFormData = {
        nombre_mpio: formData.nombre_mpio,
        departamento: formData.departamento,
      };

      console.log("Enviando datos:", newFormData);

      const response = await fetch("http://localhost:3000/api/municipios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFormData),
      });

      if (!response.ok) {
        throw new Error("Error al registrar el municipio");
      }

      const newMunicipio = await response.json();

      Swal.fire({
        title: 'Éxito',
        text: 'El municipio se registró correctamente.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });

      onOpenChange(false);  // Cerrar el modal después del registro
    } catch (error) {
      console.error("Error al registrar el municipio:", error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al registrar el municipio.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <>
      <Button className="bg-lime-500 text-white ml-5" onPress={onOpen}>
        Registrar Municipio
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader>Registrar Municipio</ModalHeader>
            <ModalBody>
              <Input
                name="nombre_mpio"
                value={formData.nombre_mpio}
                onChange={handleChange}
                placeholder="Nombre del Municipio"
                label="Nombre del Municipio"
              />
              <Input
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
                placeholder="Departamento"
                label="Departamento"
              />
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



