import React, { useState } from "react";
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

export default function RegistrarArea() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [nombreArea, setNombreArea] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/areas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre_area: nombreArea }),
      });

      if (!response.ok) {
        throw new Error("Error al registrar el área");
      }

      const data = await response.json();
      console.log("Área registrada:", data);

      // Mostrar alerta de éxito
      Swal.fire({
        icon: 'success',
        title: 'Área Registrada Correctamente',
        text: 'El área ha sido registrada exitosamente.',
      });

      // Cerrar el modal y limpiar el formulario
      setNombreArea("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error al registrar el área:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar el área. Por favor, intente nuevamente.',
      });
    }
  };

  return (
    <>
      <Button className="bg-lime-500 text-white" onPress={onOpen}>
        Registrar Área
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Registrar Área
              </ModalHeader>
              <ModalBody>
                <Input
                  clearable
                  underlined
                  labelPlaceholder="Nombre del área"
                  placeholder="Ejemplo: Biblioteca"
                  value={nombreArea}
                  onChange={(e) => setNombreArea(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button className="bg-lime-500 text-white" onPress={handleSubmit}>
                  Registrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

