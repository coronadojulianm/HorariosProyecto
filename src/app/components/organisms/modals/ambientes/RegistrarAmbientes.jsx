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

export default function RegistrarAmbiente() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    nombre_amb: "",
    municipio: "",
    sede: "",
    estado: "",
  });

  const [municipios, setMunicipios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchMunicipios();
    }
  }, [isOpen]);

  const fetchMunicipios = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/municipios/");
      if (!response.ok) {
        throw new Error("Error al obtener municipios");
      }
      const result = await response.json();
      if (Array.isArray(result)) {
        setMunicipios(result);
      } else {
        throw new Error("Estructura de datos inesperada");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error al cargar municipios:", error);
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

  const validateNombreAmb = (nombre) => {
    // Expresión regular para permitir solo letras y números
    const regex = /^[a-zA-Z0-9\s]+$/;
    return regex.test(nombre);
  };

  const handleSubmit = async () => {
    try {
      if (!formData.nombre_amb || !formData.municipio || !formData.sede || !formData.estado) {
        await Swal.fire({
          title: 'Campos Vacíos',
          text: 'Por favor, complete todos los campos.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }

      if (!validateNombreAmb(formData.nombre_amb)) {
        await Swal.fire({
          title: 'Caracteres No Permitidos',
          text: 'El nombre del ambiente solo debe contener letras y números.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }

      const newFormData = {
        nombre_amb: formData.nombre_amb,
        municipio: Number(formData.municipio),
        sede: formData.sede,
        estado: formData.estado,
      };

      console.log("Enviando datos:", newFormData);

      const response = await fetch("http://localhost:3000/api/ambientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFormData),
      });

      if (!response.ok) {
        throw new Error("Error al registrar el ambiente");
      }

      const newAmbiente = await response.json();

      Swal.fire({
        title: 'Éxito',
        text: 'El ambiente se registró correctamente.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });

      onOpenChange(false);  // Cerrar el modal después del registro
    } catch (error) {
      console.error("Error al registrar el ambiente:", error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al registrar el ambiente.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <>
      <Button className="bg-lime-500 text-white" onPress={onOpen}>
        Registrar Ambiente
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader>Registrar Ambiente</ModalHeader>
            <ModalBody>
              <Input
                name="nombre_amb"
                value={formData.nombre_amb}
                onChange={handleChange}
                placeholder="Nombre del Ambiente"
                label="Nombre del Ambiente"
              />
              <Select
                label="Municipio"
                name="municipio"
                value={formData.municipio}
                onChange={(e) => handleSelectChange("municipio", e.target.value)}
              >
                {loading ? (
                  <SelectItem value="">Cargando municipios...</SelectItem>
                ) : error ? (
                  <SelectItem value="">Error al cargar municipios</SelectItem>
                ) : municipios.length > 0 ? (
                  municipios.map((municipio) => (
                    <SelectItem
                      key={municipio.id_municipio}
                      value={municipio.id_municipio.toString()}
                    >
                      {municipio.nombre_mpio}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="">No hay municipios disponibles</SelectItem>
                )}
              </Select>
              <Select
                label="Sede"
                name="sede"
                value={formData.sede}
                onChange={(e) => handleSelectChange("sede", e.target.value)}
              >
                <SelectItem key="centro" value="centro">
                  Centro
                </SelectItem>
                <SelectItem key="yamboro" value="yamboro">
                  Yamboro
                </SelectItem>
              </Select>
              <Select
                label="Estado"
                name="estado"
                value={formData.estado}
                onChange={(e) => handleSelectChange("estado", e.target.value)}
              >
                <SelectItem key="activo" value="activo">
                  Activo
                </SelectItem>
                <SelectItem key="inactivo" value="inactivo">
                  Inactivo
                </SelectItem>
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


