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
} from "@nextui-org/react";
import Swal from 'sweetalert2';

const ActualizarAmbiente = ({ isOpen, onClose, ambiente, onUpdate }) => {
  const [formData, setFormData] = useState(ambiente || {});
  const [municipios, setMunicipios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchMunicipios();
    }
  }, [isOpen]);

  useEffect(() => {
    if (ambiente && isOpen) {
      setFormData({
        ...ambiente,
        municipio: ambiente.municipio.toString(), // Convertir a cadena si es necesario
      });
    }
  }, [ambiente, isOpen]);

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

  const handleSubmit = async () => {
    try {
      // Validación de campos vacíos
      if (!formData.nombre_amb || !formData.municipio || !formData.sede || !formData.estado) {
        await Swal.fire({
          title: 'Campos Vacíos',
          text: 'Por favor, complete todos los campos.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }
  
      // Validación de caracteres en nombre_amb
      const nombreAmbRegex = /^[a-zA-Z0-9\s]*$/; // Permite solo letras, números y espacios
      if (!nombreAmbRegex.test(formData.nombre_amb)) {
        await Swal.fire({
          title: 'Nombre Inválido',
          text: 'El nombre del ambiente solo debe contener letras y números. No se permiten caracteres especiales.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }
  
      const updatedFormData = {
        nombre_amb: formData.nombre_amb,
        municipio: Number(formData.municipio),
        sede: formData.sede,
        estado: formData.estado,
      };
  
      const response = await fetch(`http://localhost:3000/api/ambientes/${ambiente.id_ambiente}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });
  
      if (!response.ok) {
        throw new Error("Error al actualizar ambiente");
      }
  
      const updatedAmbiente = await response.json();
  
      onUpdate(updatedAmbiente); // Pasa el ambiente actualizado a la función onUpdate
  
      await Swal.fire({
        title: 'Éxito',
        text: 'El ambiente se actualizó correctamente.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
  
      window.location.reload(); // Recarga toda la página para reflejar los cambios
    } catch (error) {
      console.error("Error al actualizar ambiente:", error);
      await Swal.fire({
        title: 'Alerta',
        text: 'Debe seleccionar un municipio.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  };
  
  

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>Actualizar Ambiente</ModalHeader>
        <ModalBody>
          <Input
            name="nombre_amb"
            value={formData.nombre_amb || ""}
            onChange={handleChange}
            placeholder="Nombre del Ambiente"
            label="Nombre del Ambiente"
          />
          <Select
            label="Municipio"
            name="municipio"
            value={formData.municipio || ""}
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
            value={formData.sede || ""}
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
            value={formData.estado || ""}
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
          <Button color="danger" variant="light" onPress={onClose}>
            Cerrar
          </Button>
          <Button className="bg-lime-500 text-white" onPress={handleSubmit}>
            Actualizar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ActualizarAmbiente;
