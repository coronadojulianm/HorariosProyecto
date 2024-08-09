import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";

const ActualizarVinculacion = ({ isOpen, onClose, vinculacion, onUpdate }) => {
  const [formData, setFormData] = useState({
    tipo: "",
    sede: "",
    area: "", // ESTE ES EL QUE FUNCIONA
  });
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchAreas();
    }
  }, [isOpen]);

  useEffect(() => {
    if (vinculacion && isOpen) {
      console.log("vinculacion data:", vinculacion); // Depuración
      setFormData({
        tipo: vinculacion.tipo || "",
        sede: vinculacion.sede || "",
        area: vinculacion.area ? vinculacion.area.toString() : "", // Asegúrate de que esto sea una cadena
      });
    }
  }, [vinculacion, isOpen]);

  const fetchAreas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/areas/");
      if (!response.ok) {
        throw new Error("Error al obtener áreas");
      }
      const data = await response.json();
      console.log("areas data:", data); // Verifica la estructura de la respuesta
      if (data && Array.isArray(data.data)) {
        setAreas(data.data); // Actualiza el estado con los datos de las áreas
      } else {
        throw new Error("Estructura de datos inesperada");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const updatedFormData = {
      ...formData,
      area: Number(formData.area), // Convertir a número si es necesario
    };
    onUpdate(updatedFormData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            Actualizar Vinculación
          </ModalHeader>
          <ModalBody>
            <div>
              <p>
                <strong>Instructor:</strong> {vinculacion.instructor}
              </p>
            </div>
            <Select
              label="Tipo de Vinculación"
              name="tipo"
              value={formData.tipo}
              onChange={(e) => handleSelectChange("tipo", e.target.value)}
            >
              <SelectItem key="contratisca" value="contratisca">
                Contratisca
              </SelectItem>
              <SelectItem key="planta" value="planta">
                Planta
              </SelectItem>
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
              label="Área"
              name="area"
              value={formData.area}
              onChange={(e) => handleSelectChange("area", e.target.value)}
            >
              {loading ? (
                <SelectItem value="">Cargando áreas...</SelectItem>
              ) : error ? (
                <SelectItem value="">Error al cargar áreas</SelectItem>
              ) : areas.length > 0 ? (
                areas.map((area) => (
                  <SelectItem
                    key={area.id_area}
                    value={area.id_area.toString()}
                  >
                    {area.nombre_area}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="">No hay áreas disponibles</SelectItem>
              )}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onClick={onClose}>
              Cerrar
            </Button>
            <Button className="bg-lime-500 text-white" onClick={handleSubmit}>
              Actualizar
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
      console.log("formData:", formData);
      console.log("areas:", areas);

    </Modal>
  );
};

export default ActualizarVinculacion;
