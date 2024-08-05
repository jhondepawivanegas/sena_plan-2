import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import axiosCliente from "../axioCliente.js";

export function FichaTemplate() {
  const [fichasData, setFichasData] = useState([]);
  const [filteredFichasData, setFilteredFichasData] = useState([]);
  const [newFicha, setNewFicha] = useState({
    codigo: "",
    inicio_fecha: "",
    fin_lectiva: "",
    fin_ficha: "",
    programa: "",
    sede: "",
    estado: "",
  });
  const [selectedFicha, setSelectedFicha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [programas, setProgramas] = useState([]);
  const [showModal, setShowModal] = useState(false); // Estado para el modal
  const [searchCode, setSearchCode] = useState(""); // Estado para el código de búsqueda

  const sedes = ["centro", "Yamboro"];
  const estados = ["lectiva", "electiva", "finalizada"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosCliente.get("/fichas");
        console.log(res.data);
        if (Array.isArray(res.data.datos)) {
          setFichasData(res.data.datos);
          setFilteredFichasData(res.data.datos); // Inicialmente, todas las fichas están visibles
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
    const fetchSelectData = async () => {
      try {
        const programasRes = await axiosCliente.get("/programas");
        setProgramas(programasRes.data.datos);
      } catch (error) {
        console.error("Error al cargar los datos para selects:", error);
      }
    };

    fetchSelectData();
  }, []);

  useEffect(() => {
    // Filtrar fichas según el código de búsqueda
    const filtered = fichasData.filter((ficha) =>
      ficha.codigo.toString().includes(searchCode)
    );
    setFilteredFichasData(filtered);
  }, [searchCode, fichasData]);

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
        const res = await axiosCliente.post("/fichas", newFicha);
        setFichasData([...fichasData, res.data]);
        setSuccess("Ficha creada con éxito.");
      }
      setSearchCode(""); // Limpiar el campo de búsqueda
      closeModal(); // Cerrar el modal
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
      setSearchCode(""); // Limpiar el campo de búsqueda
    } catch (error) {
      console.error(error);
      setError("Error al eliminar la ficha.");
    }
  };

  const handleEdit = (ficha) => {
    setNewFicha({
      codigo: ficha.codigo,
      inicio_fecha: ficha.inicio_fecha.slice(0, 10),
      fin_lectiva: ficha.fin_lectiva.slice(0, 10),
      fin_ficha: ficha.fin_ficha.slice(0, 10),
      programa: ficha.programa.id_programa,
      sede: ficha.sede,
      estado: ficha.estado,
    });
    setSelectedFicha(ficha);
    setShowModal(true); // Mostrar modal al editar
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFicha({ ...newFicha, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchCode(e.target.value);
  };

  const openModal = () => {
    setSelectedFicha(null);
    setNewFicha({
      codigo: "",
      inicio_fecha: "",
      fin_lectiva: "",
      fin_ficha: "",
      programa: "",
      sede: "",
      estado: "",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <MainContainer>
      <Header>
        <Title>Gestión de Fichas</Title>
        <Button onClick={openModal}>Crear Ficha</Button>
      </Header>
      <Content>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Buscar por código"
            value={searchCode}
            onChange={handleSearchChange}
          />
        </SearchContainer>
        {loading ? (
          <Loading>Cargando...</Loading>
        ) : (
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Código</TableHeader>
                  <TableHeader>Inicio Fecha</TableHeader>
                  <TableHeader>Fin Lectiva</TableHeader>
                  <TableHeader>Fin Ficha</TableHeader>
                  <TableHeader>Programa</TableHeader>
                  <TableHeader>Sede</TableHeader>
                  <TableHeader>Estado</TableHeader>
                  <TableHeader>Acciones</TableHeader>
                </tr>
              </thead>
              <tbody>
                {filteredFichasData.map((ficha) => (
                  <TableRow key={ficha.codigo}>
                    <TableCell>{ficha.codigo}</TableCell>
                    <TableCell>{ficha.inicio_fecha.slice(0, 10)}</TableCell>
                    <TableCell>{ficha.fin_lectiva.slice(0, 10)}</TableCell>
                    <TableCell>{ficha.fin_ficha.slice(0, 10)}</TableCell>
                    <TableCell>{ficha.Programas.nombre_programa}</TableCell>
                    <TableCell>{ficha.sede}</TableCell>
                    <TableCell>{ficha.estado}</TableCell>
                    <TableCell>
                      <ActionsContainer>
                        <ActionButton
                          onClick={() => handleEdit(ficha)}
                          color="blue"
                        >
                          Editar
                        </ActionButton>
                        <ActionButton
                          onClick={() => handleDelete(ficha.codigo)}
                          color="red"
                        >
                          Eliminar
                        </ActionButton>
                      </ActionsContainer>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        )}
      </Content>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <ModalTitle>
              {selectedFicha ? "Editar Ficha" : "Crear Ficha"}
            </ModalTitle>
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
                  disabled={selectedFicha !== null}
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
                  <option value="">Selecciona un programa</option>
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
                  <option value="">Selecciona una sede</option>
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
                  <option value="">Selecciona un estado</option>
                  {estados.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              {success && <SuccessMessage>{success}</SuccessMessage>}
              <FormButton type="submit">
                {selectedFicha ? "Actualizar Ficha" : "Crear Ficha"}
              </FormButton>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </MainContainer>
  );
}

// Estilos con styled-components
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const MainContainer = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0;
  color: #007bff;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #0056b3;
  }
`;

const Content = styled.div`
  animation: ${fadeIn} 0.5s ease-in;
`;

const SearchContainer = styled.div`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
`;

const Loading = styled.div`
  font-size: 18px;
  color: #007bff;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #007bff;
  color: white;
  padding: 10px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background-color: ${(props) => (props.color === "blue" ? "#007bff" : "#dc3545")};
  color: white;
  border: none;
  padding: 5px 8px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: ${(props) =>
      props.color === "blue" ? "#0056b3" : "#c82333"};
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 60%; /* Reducir el ancho del modal */
  max-width: 300px; /* Ancho máximo reducido */
  position: relative;
  animation: ${fadeIn} 0.5s ease-in;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  margin-top: 0;
  color: #007bff;
  font-size: 18px; /* Tamaño de fuente reducido */
`;

const Form = styled.form``;

const FormGroup = styled.div`
  margin-bottom: 10px; /* Reducir el margen inferior */
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 14px; /* Tamaño de fuente reducido */
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  font-size: 14px; /* Tamaño de fuente reducido */
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  font-size: 14px; /* Tamaño de fuente reducido */
`;

const FormButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px; /* Tamaño de fuente reducido */
  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  margin-bottom: 10px;
  font-size: 14px; /* Tamaño de fuente reducido */
`;

const SuccessMessage = styled.div`
  color: #28a745;
  margin-bottom: 10px;
  font-size: 14px; /* Tamaño de fuente reducido */
`;
