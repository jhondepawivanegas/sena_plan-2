import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import axiosCliente from "../axioCliente.js";

export function FichaTemplate() {
  const [fichasData, setFichasData] = useState([]);
  const [newFicha, setNewFicha] = useState({
    codigo: "",
    inicio_fecha: "",
    fin_lectiva: "",
    fin_ficha: "",
    programa: "",
    sede: "",
    estado: "",
  });
  const [selectedFicha, setSelectedFicha] = useState(null); // Estado para la ficha seleccionada
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [programas, setProgramas] = useState([]);
  const sedes = ["centro", "Yamboro"];
  const estados = ["lectiva", "electiva", "finalizada"]; // Opciones de estado

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosCliente.get("/fichas");
        console.log(res.data); // Muestra la estructura de la respuesta en consola
        if (Array.isArray(res.data.datos)) {
          setFichasData(res.data.datos); // Accede al array 'datos'
        } else {
          throw new Error("La respuesta no contiene un arreglo de datos");
        }
      } catch (error) {
        setError("Error al cargar las fichas.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Carga los datos para los selects de programa
    const fetchSelectData = async () => {
      try {
        const programasRes = await axiosCliente.get("/progrmas");
        setProgramas(programasRes.data.datos);
      } catch (error) {
        console.error("Error al cargar los datos para selects:", error);
      }
    };

    fetchSelectData();
  }, []);

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (
      !newFicha.codigo ||
      !newFicha.inicio_fecha ||
      !newFicha.fin_lectiva ||
      !newFicha.fin_ficha ||
      !newFicha.programa ||
      !newFicha.sede ||
      !newFicha.estado
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      if (selectedFicha) {
        // Si hay una ficha seleccionada, actualiza
        const res = await axiosCliente.put(
          `/fichas/${selectedFicha.codigo}`,
          newFicha
        );
        setFichasData(
          fichasData.map((ficha) =>
            ficha.codigo === selectedFicha.codigo ? res.data : ficha
          )
        );
        setSuccess("Ficha actualizada con éxito.");
      } else {
        // Si no hay ficha seleccionada, crea una nueva
        const res = await axiosCliente.post("/fichas", newFicha);
        setFichasData([...fichasData, res.data]);
        setSuccess("Ficha creada con éxito.");
      }
      //setNewFicha({
      //  codigo: "",
      //  inicio_fecha: "",
      //  fin_lectiva: "",
      //  fin_ficha: "",
      //  programa: "",
      //  sede: "",
      //  estado: "",
      //});
      //setSelectedFicha(null); // Restablecer la ficha seleccionada
      window.location.reload();
    } catch (error) {
      console.error(error);
      setError("Error al guardar la ficha.");
    }
  };

  const handleDelete = async (codigo) => {
    setError(null);
    setSuccess(null);

    try {
      await axiosCliente.delete(`/fichas/${codigo}`);
      setFichasData(fichasData.filter((ficha) => ficha.codigo !== codigo));
      setSuccess("Ficha eliminada con éxito.");
    } catch (error) {
      console.error(error);
      setError("Error al eliminar la ficha.");
    }
  };

  const handleEdit = (ficha) => {
    setNewFicha({
      codigo: ficha.codigo,
      inicio_fecha: ficha.inicio_fecha.slice(0, 10), // Formato de fecha correcto para el input
      fin_lectiva: ficha.fin_lectiva.slice(0, 10),
      fin_ficha: ficha.fin_ficha.slice(0, 10),
      programa: ficha.programa.id_programa, // Asegúrate de usar el ID del programa
      sede: ficha.sede, // Cambiado para usar el valor de sede directamente
      estado: ficha.estado,
    });
    setSelectedFicha(ficha);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFicha({ ...newFicha, [name]: value });
  };

  return (
    <MainContainer>
      <Header>
        <Title>Gestión de Fichas</Title>
      </Header>
      <Content>
        <Form onSubmit={handleCreateOrUpdate}>
          <FormGroup>
            <Label htmlFor="codigo">Código</Label>
            <Input
              type="number"
              name="codigo"
              value={newFicha.codigo}
              onChange={handleChange}
              placeholder="Código"
              required
              disabled={selectedFicha !== null} // Desactivar durante la edición
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="inicio_fecha">Fecha de Inicio</Label>
            <Input
              type="date"
              name="inicio_fecha"
              value={newFicha.inicio_fecha}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="fin_lectiva">Fin Lectiva</Label>
            <Input
              type="date"
              name="fin_lectiva"
              value={newFicha.fin_lectiva}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="fin_ficha">Fin Ficha</Label>
            <Input
              type="date"
              name="fin_ficha"
              value={newFicha.fin_ficha}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="programa">Programa</Label>
            <Select
              name="programa"
              value={newFicha.programa}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un programa</option>
              {programas.map((programa) => (
                <option key={programa.id_programa} value={programa.id_programa}>
                  {programa.nombre_programa}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="sede">Sede</Label>
            <Select
              name="sede"
              value={newFicha.sede}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una sede</option>
              {sedes.map((sede) => (
                <option key={sede} value={sede}>
                  {sede}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="estado">Estado</Label>
            <Select
              name="estado"
              value={newFicha.estado}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un estado</option>
              {estados.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </Select>
          </FormGroup>
          <Button type="submit">
            {selectedFicha ? "Actualizar Ficha" : "Crear Ficha"}
          </Button>
          {success && <Message success>{success}</Message>}
          {error && <Message>{error}</Message>}
        </Form>
        {loading ? (
          <Loading>Cargando...</Loading>
        ) : (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Inicio Fecha</th>
                  <th>Fin Lectiva</th>
                  <th>Fin Ficha</th>
                  <th>Programa</th>
                  <th>Sede</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {fichasData.map((ficha) => (
                  <tr key={ficha.codigo}>
                    <td>{ficha.codigo}</td>
                    <td>{ficha.inicio_fecha.slice(0, 10)}</td>
                    <td>{ficha.fin_lectiva.slice(0, 10)}</td>
                    <td>{ficha.fin_ficha.slice(0, 10)}</td>
                    <td>{ficha.Programas.sigla}</td> {/* Asegúrate de que esto sea correcto */}
                    <td>{ficha.sede}</td>
                    <td>{ficha.estado}</td>
                    <td>
                      <ActionsContainer>
                        <ActionButton onClick={() => handleEdit(ficha)} color="blue">
                          Editar
                        </ActionButton>
                        <ActionButton onClick={() => handleDelete(ficha.codigo)} color="red">
                          Eliminar
                        </ActionButton>
                      </ActionsContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        )}
      </Content>
    </MainContainer>
  );
}

// Componentes estilizados para el formulario
const MainContainer = styled.div`
  padding: 20px;
`;

const Header = styled.header`
  background: #f4f4f4;
  padding: 10px 0;
`;

const Title = styled.h1`
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  max-width: 600px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 10px;  // Espacio entre los botones
`;

const ActionButton = styled.button`
  padding: 8px 12px;
  background-color: ${(props) => (props.color === 'blue' ? '#007bff' : '#dc3545')};
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.color === 'blue' ? '#0056b3' : '#c82333')};
  }
`;

const Message = styled.div`
  margin-top: 15px;
  color: ${(props) => (props.success ? "green" : "red")};
`;

const Loading = styled.div`
  text-align: center;
  margin: 20px 0;
`;

const TableContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th, td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }
`;
