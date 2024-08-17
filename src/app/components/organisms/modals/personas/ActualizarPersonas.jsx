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
import Swal from "sweetalert2";

const ActualizarPersona = ({ isOpen, onClose, persona, onUpdate }) => {
  const [formData, setFormData] = useState(persona || {});
  const [municipios, setMunicipios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFormData(persona || {});
  }, [persona]);

  useEffect(() => {
    if (isOpen) {
      fetchMunicipios();
    }
  }, [isOpen]);

  const fetchMunicipios = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/municipios");
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
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateIdentificacion = (identificacion) => {
    const regex = /^\d{10,12}$/;
    return regex.test(identificacion);
  };

  const validateNombres = (nombres) => {
    const regex = /^[a-zA-Z]+\s[a-zA-Z]+$/;
    return regex.test(nombres);
  };

  const validateCorreo = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  const handleSubmit = async () => {
    if (!validateIdentificacion(formData.identificacion)) {
      Swal.fire({
        title: "Identificación Inválida",
        text: "La identificación debe tener entre 10 y 12 dígitos.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
  
    if (!validateNombres(formData.nombres)) {
      Swal.fire({
        title: "Nombre Inválido",
        text: "El nombre debe contener al menos un nombre y un apellido.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
  
    if (!validateCorreo(formData.correo)) {
      Swal.fire({
        title: "Correo Electrónico Inválido",
        text: "El correo electrónico debe contener el símbolo @ y un dominio válido.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/api/personas/${formData.id_persona}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Error al actualizar persona");
      }
  
      Swal.fire({
        title: "Actualización Exitosa",
        text: "La persona se actualizó correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Recargar la página después de que el usuario confirme la alerta
        window.location.reload();
      });
  
      // Llamar a onUpdate si deseas manejar los datos actualizados en el componente padre
      onUpdate(formData);
      onClose();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error al actualizar persona:", error);
    }
  };
  
  

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>Actualizar Persona</ModalHeader>
        <ModalBody>
          <Input
            label="Identificación"
            name="identificacion"
            value={formData.identificacion || ""}
            onChange={handleChange}
            isInvalid={!validateIdentificacion(formData.identificacion)}
            errorMessage={
              !validateIdentificacion(formData.identificacion) &&
              "La identificación debe tener entre 10 y 12 dígitos."
            }
          />
          <Input
            label="Nombres"
            name="nombres"
            value={formData.nombres || ""}
            onChange={handleChange}
            isInvalid={!validateNombres(formData.nombres)}
            errorMessage={
              !validateNombres(formData.nombres) &&
              "El nombre debe contener al menos un nombre y un apellido."
            }
          />
          <Input
            label="Correo"
            name="correo"
            value={formData.correo || ""}
            onChange={handleChange}
            isInvalid={!validateCorreo(formData.correo)}
            errorMessage={
              !validateCorreo(formData.correo) &&
              "El correo electrónico debe contener el símbolo @ y un dominio válido."
            }
          />
          <Input
            label="Teléfono"
            name="telefono"
            value={formData.telefono || ""}
            onChange={handleChange}
          />
          <Select
            label="Municipio"
            name="municipio"
            value={formData.municipio || ""}
            onChange={(e) =>
              handleSelectChange("municipio", e.target.value)
            }
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
              <SelectItem value="">
                No hay municipios disponibles
              </SelectItem>
            )}
          </Select>
          <Select
            label="Rol"
            name="rol"
            value={formData.rol || ""}
            onChange={(e) => handleSelectChange("rol", e.target.value)}
          >
            <SelectItem key="Lider" value="Lider">Líder</SelectItem>
            <SelectItem key="Instructor" value="Instructor">Instructor</SelectItem>
            <SelectItem key="Coordinador" value="Coordinador">Coordinador</SelectItem>
          </Select>
          <Select
            label="Cargo"
            name="cargo"
            value={formData.cargo || ""}
            onChange={(e) => handleSelectChange("cargo", e.target.value)}
          >
            <SelectItem key="Aprendiz" value="Aprendiz">Aprendiz</SelectItem>
            <SelectItem key="Instructor" value="Instructor">Instructor</SelectItem>
            <SelectItem key="Coordinador" value="Coordinador">Coordinador</SelectItem>
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

export default ActualizarPersona;


