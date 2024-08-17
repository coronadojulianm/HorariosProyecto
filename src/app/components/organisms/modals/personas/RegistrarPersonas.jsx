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
import Swal from "sweetalert2";

export default function RegistrarPersonas() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    identificacion: "",
    nombres: "",
    correo: "",
    telefono: "",
    rol: "",
    cargo: "",
    municipio: "",
    password: "",
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

  const validateIdentificacion = (identificacion) => {
    const regex = /^\d{10,12}$/;
    return regex.test(identificacion);
  };
  const validatePassword = (password) => {
    const regex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };
  const validateNombres = (nombres) => {
    const regex = /^[a-zA-Z]+\s[a-zA-Z]+$/;
    return regex.test(nombres);
  };

  const validateCorreo = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  const validateForm = () => {
    const {
      identificacion,
      nombres,
      correo,
      telefono,
      rol,
      cargo,
      municipio,
      password,
    } = formData;

    if (
      !identificacion ||
      !nombres ||
      !correo ||
      !telefono ||
      !rol ||
      !cargo ||
      !municipio ||
      !password
    ) {
      return false;
    }

    if (!validateIdentificacion(identificacion)) {
      Swal.fire({
        title: "Identificación Inválida",
        text: "La identificación debe tener entre 10 y 12 dígitos.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return false;
    }

    if (!validateNombres(nombres)) {
      Swal.fire({
        title: "Nombre Inválido",
        text: "El nombre debe contener al menos un nombre y un apellido.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return false;
    }

    if (!validateCorreo(correo)) {
      Swal.fire({
        title: "Correo Electrónico Inválido",
        text: "El correo electrónico debe contener el símbolo @ y un dominio válido.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return false;
    }

    if (!validatePassword(password)) {
      Swal.fire({
        title: "Contraseña Inválida",
        text: "La contraseña debe tener al menos 8 caracteres y contener al menos un carácter especial.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) {
        return;
      }
  
      if (Object.values(formData).some(value => !value)) {
        Swal.fire({
          title: "Campos Vacíos",
          text: "Por favor, complete todos los campos.",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }
  
      const newFormData = {
        identificacion: formData.identificacion,
        nombres: formData.nombres,
        correo: formData.correo,
        telefono: formData.telefono,
        rol: formData.rol,
        cargo: formData.cargo,
        municipio: Number(formData.municipio),
        password: formData.password,
      };
  
      console.log("Enviando datos:", newFormData);
  
      const response = await fetch("http://localhost:3000/api/personas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFormData),
      });
  
      if (!response.ok) {
        throw new Error("Error al registrar la persona");
      }
  
      await Swal.fire({
        title: "Éxito",
        text: "La persona se registró correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
  
      onOpenChange(false); // Cerrar el modal después del registro
    } catch (error) {
      console.error("Error al registrar la persona:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al registrar la persona.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  

  return (
    <>
      <Button className="bg-lime-500 text-white" onPress={onOpen}>
        Registrar Persona
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader>Registrar Persona</ModalHeader>
            <ModalBody>
              <Input
                name="identificacion"
                value={formData.identificacion}
                onChange={handleChange}
                placeholder="Identificación"
                label="Identificación"
                isInvalid={!validateIdentificacion(formData.identificacion)}
                errorMessage={
                  !validateIdentificacion(formData.identificacion) &&
                  "La identificación debe tener entre 10 y 12 dígitos."
                }
              />

              <Input
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                placeholder="Nombres"
                label="Nombres"
                isInvalid={!validateNombres(formData.nombres)}
                errorMessage={
                  !validateNombres(formData.nombres) &&
                  "El nombre debe contener al menos un nombre y un apellido."
                }
              />

              <Input
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                placeholder="Correo"
                label="Correo"
                isInvalid={!validateCorreo(formData.correo)}
                errorMessage={
                  !validateCorreo(formData.correo) &&
                  "El correo electrónico debe contener el símbolo @ y un dominio válido."
                }
              />
              <Input
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                label="Teléfono"
              />
              <Input
                maxLength={8}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
                label="Contraseña"
                type="password"
                isInvalid={!validatePassword(formData.password)}
                errorMessage={
                  !validatePassword(formData.password) &&
                  "La contraseña debe tener al menos 8 caracteres y contener al menos un carácter especial."
                }
              />

              <Select
                label="Municipio"
                name="municipio"
                value={formData.municipio}
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
                value={formData.rol}
                onChange={(e) => handleSelectChange("rol", e.target.value)}
              >
                <SelectItem key="Lider" value="Lider">
                  Líder
                </SelectItem>
                <SelectItem key="Instructor" value="Instructor">
                  Instructor
                </SelectItem>
                <SelectItem key="Coordinador" value="Coordinador">
                  Coordinador
                </SelectItem>
              </Select>
              <Select
                label="Cargo"
                name="cargo"
                value={formData.cargo}
                onChange={(e) => handleSelectChange("cargo", e.target.value)}
              >
                <SelectItem key="Aprendiz" value="Aprendiz">
                  Aprendiz
                </SelectItem>
                <SelectItem key="Instructor" value="Instructor">
                  Instructor
                </SelectItem>
                <SelectItem key="Coordinador" value="Coordinador">
                  Coordinador
                </SelectItem>
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => onOpenChange(false)}
              >
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
