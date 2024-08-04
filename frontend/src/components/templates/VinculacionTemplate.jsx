import { useEffect, useState } from "react";
import axiosClient from "../axioCliente";
import Swal from "sweetalert2";
import styled from "styled-components";
import Modal from "react-modal";

// Estilos
const Container = styled.div`
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background: #f0f8ff; /* Azul claro */
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #4682b4; /* Azul claro */
  text-align: center;
  font-family: "Arial", sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  font-size: 1em;
  border: 1px solid #b0c4de; /* Azul claro */
  border-radius: 8px;
  outline: none;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  background: #fff;
  color: #333;

  &:focus {
    border-color: #4682b4; /* Azul claro */
    box-shadow: 0 0 0 2px rgba(70, 130, 180, 0.25); /* Azul claro */
  }
`;

const Select = styled.select`
  flex: 1;
  padding: 12px;
  font-size: 1em;
  border: 1px solid #b0c4de; /* Azul claro */
  border-radius: 8px;
  outline: none;
  background: #fff;
  color: #333;

  &:focus {
    border-color: #4682b4; /* Azul claro */
    box-shadow: 0 0 0 2px rgba(70, 130, 180, 0.25); /* Azul claro */
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 1em;
  color: #fff;
  background-color: ${(props) =>
    props.delete ? "#ff4d4d" : "#4682b4"}; /* Rojo para eliminar, azul para otros */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.delete ? "#e60000" : "#4169e1"}; /* Rojo oscuro para eliminar, azul oscuro para otros */
  }

  &:active {
    background-color: ${(props) =>
      props.delete ? "#cc0000" : "#3742fa"}; /* Rojo más oscuro para eliminar, azul más oscuro para otros */
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  padding: 12px;
  background: #4682b4; /* Azul claro */
  color: #fff;
  text-align: left;
  border-bottom: 2px solid #4169e1; /* Azul más oscuro */
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #b0c4de; /* Azul claro */
  color: #333;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #e6f0ff; /* Azul claro muy suave */
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ModalTitle = styled.h2`
  font-size: 2em;
  margin-bottom: 20px;
  color: #4682b4; /* Azul claro */
  font-family: "Arial", sans-serif;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 0.9em;
  margin-top: -10px;
  margin-bottom: 10px;
`;

// Configuración de Modal
Modal.setAppElement("#root");

export function VinculacionesTemplate() {
  const [vinculaciones, setVinculaciones] = useState([]);
  const [instructores, setInstructores] = useState([]);
  const [tipos] = useState(["contratista", "planta"]);
  const [sedes] = useState(["centro", "yamboró"]);
  const [areas, setAreas] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [tipo, setTipo] = useState("");
  const [sede, setSede] = useState("");
  const [area, setArea] = useState("");
  const [editingVinculacion, setEditingVinculacion] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    listarVinculaciones();
    listarInstructores();
    listarAreas();
  }, []);

  const listarVinculaciones = async () => {
    try {
      const res = await axiosClient.get("/vinculacion");
      if (res.status === 200) {
        setVinculaciones(res.data.datos || []);
      }
    } catch (error) {
      console.error("Error al listar vinculaciones:", error);
    }
  };

  const listarInstructores = async () => {
    try {
      const res = await axiosClient.get("/personas");
      if (res.status === 200) {
        setInstructores(res.data.datos || []);
      }
    } catch (error) {
      console.error("Error al listar instructores:", error);
    }
  };

  const listarAreas = async () => {
    try {
      const res = await axiosClient.get("/areas");
      if (res.status === 200) {
        setAreas(res.data.datos || []);
      }
    } catch (error) {
      console.error("Error al listar áreas:", error);
    }
  };

  const registrarVinculacion = async () => {
    if (!selectedInstructor || !tipo || !sede || !area) {
      setError("Todos los campos son requeridos.");
      return;
    }

    try {
      const res = await axiosClient.post("/vinculacion", {
        instructor: selectedInstructor,
        tipo,
        sede,
        area,
      });
      if (res.status === 200) {
        setModalOpen(false);
        listarVinculaciones();
        resetForm();
        Swal.fire({
          title: "Registrado",
          text: res.data.message,
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error al registrar vinculación:", error);
    }
  };

  const actualizarVinculacion = async () => {
    if (!selectedInstructor || !tipo || !sede || !area) {
      setError("Todos los campos son requeridos.");
      return;
    }

    try {
      const res = await axiosClient.put(`/vinculacion/${editingVinculacion}`, {
        instructor: selectedInstructor,
        tipo,
        sede,
        area,
      });
      if (res.status === 200) {
        listarVinculaciones();
        resetForm();
        setEditingVinculacion(null);
        setModalOpen(false);
        Swal.fire({
          title: "Actualizado",
          text: res.data.message,
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error al actualizar vinculación:", error);
    }
  };

  const handleEdit = (vinculacion) => {
    setEditingVinculacion(vinculacion.id_vinculacion);
    setSelectedInstructor(vinculacion.instructor.id_persona);
    setTipo(vinculacion.tipo);
    setSede(vinculacion.sede);
    setArea(vinculacion.area.id_area);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axiosClient.delete(`/vinculacion/${id}`);
      if (res.status === 200) {
        listarVinculaciones();
        Swal.fire({
          title: "Eliminado",
          text: res.data.message,
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error al eliminar vinculación:", error);
    }
  };

  const resetForm = () => {
    setSelectedInstructor("");
    setTipo("");
    setSede("");
    setArea("");
    setError("");
  };

  return (
    <Container>
      <Title>Gestión de Vinculaciones</Title>

      <Form>
        <Select
          value={selectedInstructor}
          onChange={(e) => setSelectedInstructor(e.target.value)}
          aria-label="Instructor"
        >
          <option value="">Seleccionar Instructor</option>
          {instructores.map((instructor) => (
            <option key={instructor.id_persona} value={instructor.id_persona}>
              {instructor.nombres}
            </option>
          ))}
        </Select>
        <Select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          aria-label="Tipo"
        >
          <option value="">Seleccionar Tipo</option>
          {tipos.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
        <Select
          value={sede}
          onChange={(e) => setSede(e.target.value)}
          aria-label="Sede"
        >
          <option value="">Seleccionar Sede</option>
          {sedes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
        <Select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          aria-label="Área"
        >
          <option value="">Seleccionar Área</option>
          {areas.map((a) => (
            <option key={a.id_area} value={a.id_area}>
              {a.nombre_area}
            </option>
          ))}
        </Select>
        <Button onClick={registrarVinculacion}>Registrar</Button>
      </Form>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Table>
        <thead>
          <tr>
            <TableHeader>Instructor</TableHeader>
            <TableHeader>Tipo</TableHeader>
            <TableHeader>Sede</TableHeader>
            <TableHeader>Área</TableHeader>
            <TableHeader>Acciones</TableHeader>
          </tr>
        </thead>
        <tbody>
          {vinculaciones.map((vinculacion) => (
            <TableRow key={vinculacion.id_vinculacion}>
              <TableCell>{vinculacion.Personas.nombres}</TableCell>
              <TableCell>{vinculacion.tipo}</TableCell>
              <TableCell>{vinculacion.sede}</TableCell>
              <TableCell>{vinculacion.area.nombre}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(vinculacion)}>Editar</Button>
                <Button
                  delete
                  onClick={() => {
                    Swal.fire({
                      title: "¿Estás seguro?",
                      text: "Esta acción no se puede deshacer.",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Sí, eliminar",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDelete(vinculacion.id_vinculacion);
                      }
                    });
                  }}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => {
          setModalOpen(false);
          resetForm();
        }}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "12px",
            background: "#f0f8ff", /* Azul claro */
          },
        }}
      >
        <ModalTitle>{editingVinculacion ? "Editar Vinculación" : "Agregar Vinculación"}</ModalTitle>
        <ModalForm
          onSubmit={(e) => {
            e.preventDefault();
            editingVinculacion ? actualizarVinculacion() : registrarVinculacion();
          }}
        >
          <Select
            value={selectedInstructor}
            onChange={(e) => setSelectedInstructor(e.target.value)}
            aria-label="Instructor"
          >
            <option value="">Seleccionar Instructor</option>
            {instructores.map((instructor) => (
              <option key={instructor.id_persona} value={instructor.id_persona}>
                {instructor.nombres}
              </option>
            ))}
          </Select>
          <Select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            aria-label="Tipo"
          >
            <option value="">Seleccionar Tipo</option>
            {tipos.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
          <Select
            value={sede}
            onChange={(e) => setSede(e.target.value)}
            aria-label="Sede"
          >
            <option value="">Seleccionar Sede</option>
            {sedes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
          <Select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            aria-label="Área"
          >
            <option value="">Seleccionar Área</option>
            {areas.map((a) => (
              <option key={a.id_area} value={a.id_area}>
                {a.nombre_area}
              </option>
            ))}
          </Select>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <ModalButtonGroup>
            <Button onClick={resetForm}>Cancelar</Button>
            <Button type="submit">{editingVinculacion ? "Actualizar" : "Agregar"}</Button>
          </ModalButtonGroup>
        </ModalForm>
      </Modal>
    </Container>
  );
}
