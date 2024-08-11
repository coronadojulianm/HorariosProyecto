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

export default function RegistrarHorario() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    fecha_inicio: "",
    hora_inicio: "",
    fecha_fin: "",
    hora_fin: "",
    dia: "",
    cantidad_horas: "",
    instructor: "",
    ficha: "",
    ambiente: "",
    estado: "",
  });

  const [instructores, setInstructores] = useState([]);
  const [fichas, setFichas] = useState([]);
  const [ambientes, setAmbientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchInstructores();
      fetchFichas();
      fetchAmbientes();
    }
  }, [isOpen]);

  const fetchInstructores = async () => {
    setLoading(true);
    setError(null);
    try {
      // Obtener vinculaciones
      const vinculacionResponse = await fetch(
        "http://localhost:3000/api/vinculacion"
      );
      if (!vinculacionResponse.ok)
        throw new Error("Error al obtener vinculaciones");
      const vinculacionResult = await vinculacionResponse.json();

      // Obtener personas
      const personasResponse = await fetch(
        "http://localhost:3000/api/personas"
      );
      if (!personasResponse.ok) throw new Error("Error al obtener personas");
      const personasResult = await personasResponse.json();

      // Crear un mapa de personas por id_persona
      const personasMap = new Map(
        personasResult.data.map((persona) => [
          persona.id_persona,
          persona.nombres,
        ])
      );

      // Mapear vinculaciones con nombres de personas
      const instructoresConNombre = vinculacionResult.data.map(
        (vinculacion) => ({
          id_vinculacion: vinculacion.id_vinculacion,
          nombre:
            personasMap.get(vinculacion.instructor) || "Nombre no disponible",
        })
      );

      setInstructores(instructoresConNombre);
    } catch (error) {
      setError(error.message);
      console.error("Error al cargar instructores:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFichas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/fichas");
      if (!response.ok) throw new Error("Error al obtener fichas");
      const result = await response.json();
      setFichas(result.data || []);
    } catch (error) {
      setError(error.message);
      console.error("Error al cargar fichas:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAmbientes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/ambientes");
      if (!response.ok) throw new Error("Error al obtener ambientes");
      const result = await response.json();
      setAmbientes(result.data || []);
    } catch (error) {
      setError(error.message);
      console.error("Error al cargar ambientes:", error);
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

  const validateForm = () => {
    return (
      formData.fecha_inicio &&
      formData.hora_inicio &&
      formData.fecha_fin &&
      formData.hora_fin &&
      formData.dia &&
      formData.cantidad_horas &&
      formData.instructor &&
      formData.ficha &&
      formData.ambiente &&
      formData.estado
    );
  };

  const handleSubmit = async () => {
    try {
      console.log("Datos del formulario:", formData); // Verifica los datos aquí
      if (!validateForm()) {
        await Swal.fire({
          title: "Campos Vacíos",
          text: "Por favor, complete todos los campos.",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }

      // Fecha arbitraria para las horas
      const fechaArbitrariaHora = "1970-01-01";
      // Hora arbitraria para las fechas
      const horaArbitrariaFecha = "00:00:00";

      // Combina la fecha arbitraria con la hora para formar un valor DateTime
      const horaInicio = formData.hora_inicio || "00:00:00";
      const horaFin = formData.hora_fin || "23:59:59";

      // Combina la fecha proporcionada con la hora arbitraria para las fechas
      const fechaInicio = formData.fecha_inicio
        ? `${formData.fecha_inicio}T${horaArbitrariaFecha}Z`
        : null;
      const fechaFin = formData.fecha_fin
        ? `${formData.fecha_fin}T${horaArbitrariaFecha}Z`
        : null;

      // Construcción del objeto que se enviará al backend
      const newFormData = {
        fecha_inicio: fechaInicio,
        hora_inicio: `${fechaArbitrariaHora}T${horaInicio}:00Z`,
        fecha_fin: fechaFin,
        hora_fin: `${fechaArbitrariaHora}T${horaFin}:00Z`,
        dia: formData.dia,
        cantidad_horas: parseInt(formData.cantidad_horas, 10),
        instructor: parseInt(formData.instructor, 10),
        ficha: parseInt(formData.ficha, 10),
        ambiente: parseInt(formData.ambiente, 10),
        estado: formData.estado,
      };

      console.log("Datos enviados:", newFormData); // Verifica los datos aquí

      const response = await fetch("http://localhost:3000/api/horarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFormData),
      });

      if (!response.ok) throw new Error("Error al registrar el horario");

      await Swal.fire({
        title: "Éxito",
        text: "El horario se registró correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Error al registrar el horario:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al registrar el horario.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <>
      <Button className="bg-lime-500 text-white ml-5" onPress={onOpen}>
        Registrar Horario
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader>Registrar Horario</ModalHeader>
            <ModalBody>
              <Input
                name="fecha_inicio"
                type="date"
                value={formData.fecha_inicio}
                onChange={handleChange}
                placeholder="Fecha de Inicio"
                label="Fecha de Inicio"
              />
              <Input
                name="hora_inicio"
                type="time"
                value={formData.hora_inicio}
                onChange={handleChange}
                placeholder="Hora de Inicio"
                label="Hora de Inicio"
              />
              <Input
                name="fecha_fin"
                type="date"
                value={formData.fecha_fin}
                onChange={handleChange}
                placeholder="Fecha de Fin"
                label="Fecha de Fin"
              />
              <Input
                name="hora_fin"
                type="time"
                value={formData.hora_fin}
                onChange={handleChange}
                placeholder="Hora de Fin"
                label="Hora de Fin"
              />
              <Select
                label="Día"
                name="dia"
                value={formData.dia}
                onChange={(e) => handleSelectChange("dia", e.target.value)}
              >
                <SelectItem key="lunes" value="lunes">
                  Lunes
                </SelectItem>
                <SelectItem key="martes" value="martes">
                  Martes
                </SelectItem>
                <SelectItem key="miercoles" value="miercoles">
                  Miércoles
                </SelectItem>
                <SelectItem key="jueves" value="jueves">
                  Jueves
                </SelectItem>
                <SelectItem key="viernes" value="viernes">
                  Viernes
                </SelectItem>
                <SelectItem key="sabado" value="sabado">
                  Sábado
                </SelectItem>
                <SelectItem key="domingo" value="domingo">
                  Domingo
                </SelectItem>
              </Select>
              <Input
                name="cantidad_horas"
                type="number"
                value={formData.cantidad_horas}
                onChange={handleChange}
                placeholder="Cantidad de Horas"
                label="Cantidad de Horas"
              />
              <Select
                label="Instructor"
                name="instructor"
                value={formData.instructor}
                onChange={(e) =>
                  handleSelectChange("instructor", e.target.value)
                }
              >
                {loading ? (
                  <SelectItem value="">Cargando instructores...</SelectItem>
                ) : error ? (
                  <SelectItem value="">Error al cargar instructores</SelectItem>
                ) : instructores.length > 0 ? (
                  instructores.map((instructor) => (
                    <SelectItem
                      key={instructor.id_vinculacion}
                      value={instructor.id_vinculacion.toString()}
                    >
                      {instructor.nombre}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="">
                    No hay instructores disponibles
                  </SelectItem>
                )}
              </Select>
              <Input
                name="ficha"
                type="number"
                value={formData.ficha}
                onChange={handleChange}
                placeholder="Ficha"
                label="Ficha"
              />
              <Select
                label="Ambiente"
                name="ambiente"
                value={formData.ambiente}
                onChange={(e) => handleSelectChange("ambiente", e.target.value)}
              >
                {loading ? (
                  <SelectItem value="">Cargando ambientes...</SelectItem>
                ) : error ? (
                  <SelectItem value="">Error al cargar ambientes</SelectItem>
                ) : ambientes.length > 0 ? (
                  ambientes.map((ambiente) => (
                    <SelectItem
                      key={ambiente.id_ambiente}
                      value={ambiente.id_ambiente.toString()}
                    >
                      {ambiente.nombre_amb}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="">No hay ambientes disponibles</SelectItem>
                )}
              </Select>
              <Select
                label="Estado"
                name="estado"
                value={formData.estado}
                onChange={(e) => handleSelectChange("estado", e.target.value)}
              >
                <SelectItem key="solicitud" value="solicitud">
                  Solicitud
                </SelectItem>
                <SelectItem key="aprobado" value="aprobado">
                  Aprobado
                </SelectItem>
                <SelectItem key="no_aprobado" value="no_aprobado">
                  No Aprobado
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
