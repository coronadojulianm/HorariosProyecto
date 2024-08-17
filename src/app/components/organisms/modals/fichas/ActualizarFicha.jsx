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
import Swal from 'sweetalert2'; // Importa SweetAlert2

const ActualizarFicha = ({ isOpen, onClose, ficha, onUpdate }) => {
  const [formData, setFormData] = useState(ficha || {});
  const [programas, setProgramas] = useState([]);
  const [programasMap, setProgramasMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchProgramas();
    }
  }, [isOpen]);

  useEffect(() => {
    if (ficha && isOpen) {
      setFormData({
        ...ficha,
        programa: ficha.programa.toString(), // Convertir a cadena si es necesario
      });
    }
  }, [ficha, isOpen]);

  const fetchProgramas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/programas/");
      if (!response.ok) {
        throw new Error("Error al obtener programas");
      }
      const result = await response.json();
      console.log("Datos de programas recibidos:", result); // Depuración

      if (Array.isArray(result.data)) {
        // Crear un mapa de ID a nombre
        const programasMap = result.data.reduce((acc, programa) => {
          acc[programa.id_programa] = programa.nombre_programa;
          return acc;
        }, {});
        setProgramas(result.data);
        setProgramasMap(programasMap);
      } else {
        throw new Error("Estructura de datos inesperada");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error al cargar programas:", error); // Depuración
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
      if (!formData.inicio_ficha || !formData.fin_lectiva || !formData.fin_ficha || !formData.programa || !formData.sede || !formData.estado) {
        alert("Por favor, complete todos los campos.");
        return;
      }

      // Obtener la hora actual del ordenador
      const getCurrentTime = () => new Date().toISOString().split('T')[1].split('.')[0];

      // Convertir las fechas a DATETIME en formato ISO con la hora actual
      const updatedFormData = {
        codigo: ficha.codigo,
        inicio_ficha: `${formData.inicio_ficha}T${getCurrentTime()}Z`,
        fin_lectiva: `${formData.fin_lectiva}T${getCurrentTime()}Z`,
        fin_ficha: `${formData.fin_ficha}T${getCurrentTime()}Z`,
        programa: Number(formData.programa),
        sede: formData.sede,
        estado: formData.estado,
      };

      console.log("Datos a enviar:", updatedFormData);

      const response = await fetch(`http://localhost:3000/api/fichas/${ficha.codigo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar ficha");
      }

      const updatedFicha = await response.json(); // Obtener la ficha actualizada del servidor

      onUpdate(updatedFicha.resultado); // Pasa la ficha actualizada a la función onUpdate

      // Mostrar SweetAlert de éxito
      Swal.fire({
        title: 'Éxito',
        text: 'La ficha se actualizó correctamente.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload(); // Recargar la página
        }
      });

      onClose();  // Cierra el modal
    } catch (error) {
      console.error("Error al actualizar ficha:", error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al actualizar la ficha.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>Actualizar Ficha</ModalHeader>
        <ModalBody>
          <Input
            name="codigo"
            value={formData.codigo || ""}
            onChange={handleChange}
            placeholder="Código"
            disabled
            label="Código"
          />
          <Input
            name="inicio_ficha"
            type="date"
            value={formData.inicio_ficha || ""}
            onChange={handleChange}
            placeholder="Inicio Ficha"
            label="Inicio Ficha"
          />
          <Input
            name="fin_lectiva"
            type="date"
            value={formData.fin_lectiva || ""}
            onChange={handleChange}
            placeholder="Fin Lectiva"
            label="Fin Lectiva"
          />
          <Input
            name="fin_ficha"
            type="date"
            value={formData.fin_ficha || ""}
            onChange={handleChange}
            placeholder="Fin Ficha"
            label="Fin Ficha"
          />
          <Select
            label="Programa"
            name="programa"
            value={formData.programa || ""}
            onChange={(e) => handleSelectChange("programa", e.target.value)}
          >
            {loading ? (
              <SelectItem value="">Cargando programas...</SelectItem>
            ) : error ? (
              <SelectItem value="">Error al cargar programas</SelectItem>
            ) : programas.length > 0 ? (
              programas.map((programa) => (
                <SelectItem
                  key={programa.id_programa}
                  value={programa.id_programa.toString()}
                >
                  {programa.nombre_programa}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="">No hay programas disponibles</SelectItem>
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
            <SelectItem key="Lectiva" value="Lectiva">
              Lectiva
            </SelectItem>
            <SelectItem key="Electiva" value="Electiva">
              Electiva
            </SelectItem>
            <SelectItem key="Finalizada" value="Finalizada">
              Finalizada
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

export default ActualizarFicha;










