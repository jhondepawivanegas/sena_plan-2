import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axiosCliente from "../axioCliente";

export function UsuarioTemplate() {
  const [usuarios, setUsuarios] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const roles = ["Administrador", "Instructor", "Coordinador", "Lider"];
  const cargos = ["Instructor", "Aprendiz", "Coordinador"];
  const [nuevoUsuario, setNuevoUsuario] = useState({
    identificacion: '',
    nombres: '',
    correo: '',
    telefono: '',
    password: '',
    rol: '',
    cargo: '',
    municipio: ''
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editarUsuario, setEditarUsuario] = useState(null);

  useEffect(() => {
    fetchUsuarios();
    fetchMunicipios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axiosCliente.get('/personas');
      setUsuarios(response.data.datos);
    } catch (error) {
      console.error("Error al listar Usuarios", error);
    }
  };

  const fetchMunicipios = async () => {
    try {
      const response = await axiosCliente.get('/municipios');
      setMunicipios(response.data.datos);
    } catch (error) {
      console.error("Error al listar Municipios", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editarUsuario) {
        // Actualizar usuario existente
        await axiosCliente.put(`/personas/${editarUsuario.id_persona}`, nuevoUsuario);
      } else {
        // Crear nuevo usuario
        await axiosCliente.post('/personas', nuevoUsuario);
      }
      fetchUsuarios();
      resetForm();
      setModalOpen(false);
    } catch (error) {
      console.error("Error al guardar Usuario", error);
    }
  };

  const handleEdit = (usuario) => {
    setNuevoUsuario({
      identificacion: usuario.identificacion,
      nombres: usuario.nombres,
      correo: usuario.correo,
      telefono: usuario.telefono,
      password: '',
      rol: usuario.rol,
      cargo: usuario.cargo,
      municipio: usuario.municipio
    });
    setEditarUsuario(usuario);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axiosCliente.delete(`/personas/${id}`);
      fetchUsuarios();
    } catch (error) {
      console.error("Error al eliminar Usuario", error);
    }
  };

  const resetForm = () => {
    setNuevoUsuario({
      identificacion: '',
      nombres: '',
      correo: '',
      telefono: '',
      password: '',
      rol: '',
      cargo: '',
      municipio: ''
    });
    setEditarUsuario(null);
  };

  return (
    <Container>
      <h1>Vista de Usuarios</h1>
      <Button onClick={() => setModalOpen(true)}>Registrar un Nuevo Usuario</Button>
      <Modal isOpen={modalOpen} onClose={() => {
        resetForm();
        setModalOpen(false);
      }}>
        <Form onSubmit={handleSubmit}>
          <h2>{editarUsuario ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h2>
          <Input
            type="number"
            name="identificacion"
            value={nuevoUsuario.identificacion}
            onChange={handleInputChange}
            placeholder="Identificación"
            required
          />
          <Input
            type="text"
            name="nombres"
            value={nuevoUsuario.nombres}
            onChange={handleInputChange}
            placeholder="Nombres"
            required
          />
          <Input
            type="email"
            name="correo"
            value={nuevoUsuario.correo}
            onChange={handleInputChange}
            placeholder="Correo"
            required
          />
          <Input
            type="tel"
            name="telefono"
            value={nuevoUsuario.telefono}
            onChange={handleInputChange}
            placeholder="Teléfono"
            required
          />
          <Input
            type="password"
            name="password"
            value={nuevoUsuario.password}
            onChange={handleInputChange}
            placeholder="Contraseña"
            required
          />
          <Select
            name="rol"
            value={nuevoUsuario.rol}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccionar Rol</option>
            {roles.map((rol) => (
              <option key={rol} value={rol}>
                {rol}
              </option>
            ))}
          </Select>
          <Select
            name="cargo"
            value={nuevoUsuario.cargo}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccionar Cargo</option>
            {cargos.map((cargo) => (
              <option key={cargo} value={cargo}>
                {cargo}
              </option>
            ))}
          </Select>
          <Select
            name="municipio"
            value={nuevoUsuario.municipio}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccionar Municipio</option>
            {municipios.map((municipio) => (
              <option key={municipio.id} value={municipio.id}>
                {municipio.nombre_mpio}
              </option>
            ))}
          </Select>
          <Button type="submit">{editarUsuario ? 'Actualizar Usuario' : 'Crear Usuario'}</Button>
        </Form>
      </Modal>
      <UserList>
        <h2>Lista de Usuarios</h2>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Identificación</th>
              <th>Nombres</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Cargo</th>
              <th>Municipio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(usuario => (
              <tr key={usuario.id_persona}>
                <td>{usuario.id_persona}</td>
                <td>{usuario.identificacion}</td>
                <td>{usuario.nombres}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.rol}</td>
                <td>{usuario.cargo}</td>
                <td>{usuario.Municipios.nombre_mpio}</td>
                <td>
                  <Button onClick={() => handleEdit(usuario)}>Editar</Button>
                  <Button onClick={() => handleDelete(usuario.id_persona)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </UserList>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  overflow: auto;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #4682b4;
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin: 5px;

  &:hover {
    background-color: #4169e1;
  }
`;

const UserList = styled.div`
  max-width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #4682b4;
    color: white;
  }

  tr:hover {
    background-color: #f0f8ff;
  }
`;

// Componente Modal
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        {children}
      </ModalContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
`;
