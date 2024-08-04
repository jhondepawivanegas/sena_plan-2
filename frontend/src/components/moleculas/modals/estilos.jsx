// Estilos
const Container = styled.div`
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background: #f0f8ff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #4682b4;
  text-align: center;
  font-family: 'Arial', sans-serif;
`;

const AmbienteForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
`;

const AmbienteInput = styled.input`
  flex: 1;
  padding: 12px;
  font-size: 1em;
  border: 1px solid #b0c4de;
  border-radius: 8px;
  outline: none;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  background: #fff;
  color: #333;

  &:focus {
    border-color: #4682b4;
    box-shadow: 0 0 0 2px rgba(70, 130, 180, 0.25);
  }
`;

const AmbienteSelect = styled.select`
  flex: 1;
  padding: 12px;
  font-size: 1em;
  border: 1px solid #b0c4de;
  border-radius: 8px;
  outline: none;
  background: #fff;
  color: #333;

  &:focus {
    border-color: #4682b4;
    box-shadow: 0 0 0 2px rgba(70, 130, 180, 0.25);
  }
`;

const AmbienteButton = styled.button`
  padding: 12px 24px;
  font-size: 1em;
  color: #fff;
  background-color: ${(props) => (props.delete ? "#ff4d4d" : "#4682b4")};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${(props) => (props.delete ? "#e60000" : "#4169e1")};
  }

  &:active {
    background-color: ${(props) => (props.delete ? "#cc0000" : "#3742fa")};
  }
`;

const EstadoButton = styled.button`
  padding: 8px 16px;
  font-size: 1em;
  color: #fff;
  background-color: ${(props) => (props.activo ? "#4caf50" : "#f44336")}; // Verde para activo, rojo para inactivo
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${(props) => (props.activo ? "#388e3c" : "#d32f2f")}; // Colores más oscuros para el hover
  }

  &:active {
    background-color: ${(props) => (props.activo ? "#2e7d32" : "#c62828")}; // Colores más oscuros para el active
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  padding: 12px;
  background: #4682b4;
  color: #fff;
  text-align: left;
  border-bottom: 2px solid #4169e1;
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #b0c4de;
  color: #333;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #e6f0ff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const SelectedTitle = styled.h2`
  font-size: 1.8em;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #4682b4;
  font-family: 'Arial', sans-serif;
`;