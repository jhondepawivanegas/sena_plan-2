import styled from "styled-components";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import axiosCliente from "../axioCliente.js";

const daysOfWeek = [
  "Lunes", "Martes", "Miércoles", "Jueves", "Viernes"
];

export function HorariosTemplate() {
  const [instructors, setInstructors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Cargar instructores y ambientes desde la API
    const fetchInitialData = async () => {
      try {
        const instructorsResponse = await axiosCliente.get('/personas');
        setInstructors(instructorsResponse.data.datos);

        const roomsResponse = await axiosCliente.get('/ambientes');
        setRooms(roomsResponse.data.datos);
      } catch (error) {
        setError('Error al cargar los datos iniciales.');
      }
    };

    fetchInitialData();
  }, []);

  const handleAddSchedule = async () => {
    if (!selectedInstructor || !selectedRoom || !selectedDay || !selectedStartTime || !selectedEndTime || !selectedDate) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    const newSchedule = {
      instructor: parseInt(selectedInstructor),
      room: parseInt(selectedRoom),
      day: selectedDay,
      start_time: selectedStartTime,
      end_time: selectedEndTime,
      date: selectedDate,
    };

    try {
      if (editIndex !== null) {
        await axiosCliente.put(`/schedule/${schedule[editIndex].id_horario}`, newSchedule);
        const updatedSchedule = schedule.map((item, index) =>
          index === editIndex ? { ...item, ...newSchedule } : item
        );
        setSchedule(updatedSchedule);
        setEditIndex(null);
      } else {
        const response = await axiosCliente.post('/schedule', newSchedule);
        setSchedule([...schedule, response.data]);
      }

      setError('');
    } catch (error) {
      setError('Error al agregar o actualizar el horario.');
    }
  };

  const handleRemoveSchedule = async (index) => {
    const item = schedule[index];
    try {
      await axiosCliente.delete(`/schedule/${item.id_horario}`);
      setSchedule(schedule.filter((_, i) => i !== index));
    } catch (error) {
      setError('Error al eliminar el horario.');
    }
  };

  const handleEditSchedule = (index) => {
    const item = schedule[index];
    setSelectedInstructor(item.instructor.toString());
    setSelectedRoom(item.room.toString());
    setSelectedDay(item.day);
    setSelectedStartTime(item.start_time);
    setSelectedEndTime(item.end_time);
    setSelectedDate(item.date);
    setEditIndex(index);
  };

  return (
    <Container>
      <Title>Administración de Horarios</Title>
      <Form>
        <Select onChange={(e) => setSelectedInstructor(e.target.value)} value={selectedInstructor}>
          <option value="">Seleccionar Instructor</option>
          {instructors.map((instructor) => (
            <option key={instructor.id} value={instructor.id}>
              {instructor.nombres}
            </option>
          ))}
        </Select>
        <Select onChange={(e) => setSelectedRoom(e.target.value)} value={selectedRoom}>
          <option value="">Seleccionar Ambiente</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.nombre_amb}
            </option>
          ))}
        </Select>
        <Select onChange={(e) => setSelectedDay(e.target.value)} value={selectedDay}>
          <option value="">Seleccionar Día</option>
          {daysOfWeek.map((day, index) => (
            <option key={index} value={day}>
              {day}
            </option>
          ))}
        </Select>
        <Input type="time" onChange={(e) => setSelectedStartTime(e.target.value)} value={selectedStartTime} />
        <Input type="time" onChange={(e) => setSelectedEndTime(e.target.value)} value={selectedEndTime} />
        <Input type="date" onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate} />
        <Button onClick={handleAddSchedule}>
          {editIndex !== null ? "Actualizar Horario" : "Añadir Horario"}
        </Button>
        {error && <Error>{error}</Error>}
      </Form>
      <ScheduleTable>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Instructor</TableHeaderCell>
            <TableHeaderCell>Ambiente</TableHeaderCell>
            <TableHeaderCell>Fecha</TableHeaderCell>
            <TableHeaderCell>Lunes</TableHeaderCell>
            <TableHeaderCell>Martes</TableHeaderCell>
            <TableHeaderCell>Miércoles</TableHeaderCell>
            <TableHeaderCell>Jueves</TableHeaderCell>
            <TableHeaderCell>Viernes</TableHeaderCell>
            <TableHeaderCell>Acciones</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedule.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{instructors.find(instructor => instructor.id === item.instructor)?.nombres}</TableCell>
              <TableCell>{rooms.find(room => room.id === item.room)?.nombre}</TableCell>
              <TableCell>{item.date}</TableCell>
              {daysOfWeek.map(day => (
                <TableCell key={day}>
                  {item.day === day ? `${item.start_time} - ${item.end_time}` : ''}
                </TableCell>
              ))}
              <TableCell>
                <ButtonContainer>
                  <ActionButton onClick={() => handleRemoveSchedule(index)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </ActionButton>
                  <UpdateButton onClick={() => handleEditSchedule(index)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </UpdateButton>
                </ButtonContainer>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ScheduleTable>
    </Container>
  );
}

// Estilos usando styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  width: 100%;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.primary};
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
  max-width: 400px;
  background: ${({ theme }) => theme.formBg};
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  color: #333;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  color: #333;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ScheduleTable = styled.table`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  border-collapse: collapse;
  background: ${({ theme }) => theme.listBg};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.thead`
  background: ${({ theme }) => theme.primary};
  color: #fff;
`;

const TableBody = styled.tbody`
  & > tr:nth-child(even) {
    background-color: ${({ theme }) => theme.secondaryBg};
  }
`;

const TableRow = styled.tr`
  height: 50px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.border};
`;

const TableHeaderCell = styled(TableCell)`
  font-weight: bold;
  background-color: ${({ theme }) => theme.primary};
  color: #fff;
`;

const ActionButton = styled.button`
  padding: 10px;
  font-size: 1.2rem;
  color: #fff;
  background-color: #e74c3c; /* Rojo */
  border: none;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #c0392b;
  }
`;

const UpdateButton = styled.button`
  padding: 10px;
  font-size: 1.2rem;
  color: #fff;
  background-color: #f39c12; /* Naranja */
  border: none;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #e67e22;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Error = styled.div`
  color: ${({ theme }) => theme.error};
  margin-top: 10px;
`;

export default HorariosTemplate;
