import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure
} from "@nextui-org/react";
import Swal from 'sweetalert2';

const validNiveles = ["Tecnico", "Tecnologo"];
const validEstados = ["activo", "inactivo"];

export default function RegistrarPrograma() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [nombrePrograma, setNombrePrograma] = useState("");
  const [sigla, setSigla] = useState("");
  const [nivel, setNivel] = useState("");
  const [estado, setEstado] = useState("");

  const normalizeNivel = (input) => {
    const normalized = input.trim().toLowerCase();
    if (normalized === "tecnico") return "Tecnico";
    if (normalized === "tecnologo") return "Tecnologo";
    return null;
  };

  const normalizeEstado = (input) => {
    const normalized = input.trim().toLowerCase();
    if (normalized === "activo") return "activo";
    if (normalized === "inactivo") return "inactivo";
    return null;
  };

  const handleRegister = async () => {
    const nivelNormalized = normalizeNivel(nivel);
    const estadoNormalized = normalizeEstado(estado);

    // Validar los datos
    if (!nivelNormalized || !estadoNormalized) {
      Swal.fire({
        icon: 'error',
        title: 'Entrada Inválida',
        text: 'Ingrese un dato relevante al formulario',
      });
      return;
    }

    try {
      const response = await fetch('/api/programas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_programa: nombrePrograma,
          sigla: sigla,
          nivel: nivelNormalized,
          estado: estadoNormalized
        }),
      });

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Programa Registrado Correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          onOpenChange(false); // Cerrar el modal
          // Limpiar los campos del formulario
          setNombrePrograma("");
          setSigla("");
          setNivel("");
          setEstado("");
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al Registrar Programa',
            text: data.message || 'Error desconocido',
          });
        }
      } else {
        const text = await response.text();
        console.error('Error inesperado:', text);
        Swal.fire({
          icon: 'error',
          title: 'Error al Registrar Programa',
          text: 'Error desconocido',
        });
      }
    } catch (error) {
      console.error('Error de Red:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error de Red',
        text: error.message || 'Error desconocido',
      });
    }
  };

  return (
    <>
      <Button className="bg-lime-500 text-white" onPress={onOpen}>Registrar Programa</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Registrar Programa
              </ModalHeader>
              <ModalBody>
                <Input
                  clearable
                  underlined
                  label="Nombre del Programa"
                  placeholder="Nombre del Programa"
                  value={nombrePrograma}
                  onChange={(e) => setNombrePrograma(e.target.value)}
                />
                <Input
                  clearable
                  underlined
                  label="Sigla"
                  placeholder="Sigla"
                  value={sigla}
                  onChange={(e) => setSigla(e.target.value)}
                />
                <Input
                  clearable
                  underlined
                  label="Nivel"
                  placeholder="Tecnico o Tecnologo"
                  value={nivel}
                  onChange={(e) => setNivel(e.target.value)}
                />
                <Input
                  clearable
                  underlined
                  label="Estado"
                  placeholder="activo o inactivo"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button className="bg-lime-500 text-white" onPress={handleRegister}>
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




