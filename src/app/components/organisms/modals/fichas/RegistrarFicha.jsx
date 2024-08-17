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

export default function RegistrarFicha() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    codigo: "",
    inicio_ficha: "",
    fin_lectiva: "",
    fin_ficha: "",
    programa: "",
    sede: "",
    estado: "",
  });

  const [programas, setProgramas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchProgramas();
    }
  }, [isOpen]);

  const fetchProgramas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/programas/");
      if (!response.ok) {
        throw new Error("Error al obtener programas");
      }
      const result = await response.json();
      if (Array.isArray(result.data)) {
        setProgramas(result.data);
      } else {
        throw new Error("Estructura de datos inesperada");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error al cargar programas:", error);
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

  const validateCodigo = (codigo) => {
    return /^\d+$/.test(codigo);  // Verifica si el código solo contiene números
  };

  const handleSubmit = async () => {
    try {
      if (!formData.codigo || !formData.inicio_ficha || !formData.fin_lectiva || !formData.fin_ficha || !formData.programa || !formData.sede || !formData.estado) {
        await Swal.fire({
          title: 'Campos Vacíos',
          text: 'Por favor, complete todos los campos.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }

      if (!validateCodigo(formData.codigo)) {
        await Swal.fire({
          title: 'Código Inválido',
          text: 'El código debe contener solo números.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }
  
      const getCurrentTime = () => new Date().toISOString().split('T')[1].split('.')[0];
  
      const newFormData = {
        codigo: parseInt(formData.codigo, 10),  // Convertir a entero
        inicio_ficha: `${formData.inicio_ficha}T${getCurrentTime()}Z`,
        fin_lectiva: `${formData.fin_lectiva}T${getCurrentTime()}Z`,
        fin_ficha: `${formData.fin_ficha}T${getCurrentTime()}Z`,
        programa: Number(formData.programa),
        sede: formData.sede,
        estado: formData.estado,
      };
  
      console.log("Enviando datos:", newFormData);
  
      const response = await fetch("http://localhost:3000/api/fichas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFormData),
      });
  
      if (!response.ok) {
        throw new Error("Error al registrar la ficha");
      }
  
      const newFicha = await response.json();
  
      Swal.fire({
        title: 'Éxito',
        text: 'La ficha se registró correctamente.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
  
      onOpenChange(false);  // Cerrar el modal después del registro
    } catch (error) {
      console.error("Error al registrar la ficha:", error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al registrar la ficha.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };
  
  return (
    <>
      <Button className="bg-lime-500 text-white ml-5" onPress={onOpen}>
        Registrar Ficha
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader>Registrar Ficha</ModalHeader>
            <ModalBody>
              <Input
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
                placeholder="Código"
                label="Código"
              />
              <Input
                name="inicio_ficha"
                type="date"
                value={formData.inicio_ficha}
                onChange={handleChange}
                placeholder="Inicio Ficha"
                label="Inicio Ficha"
              />
              <Input
                name="fin_lectiva"
                type="date"
                value={formData.fin_lectiva}
                onChange={handleChange}
                placeholder="Fin Lectiva"
                label="Fin Lectiva"
              />
              <Input
                name="fin_ficha"
                type="date"
                value={formData.fin_ficha}
                onChange={handleChange}
                placeholder="Fin Ficha"
                label="Fin Ficha"
              />
              <Select
                label="Programa"
                name="programa"
                value={formData.programa}
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




