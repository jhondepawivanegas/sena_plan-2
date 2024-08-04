import { AiOutlineHome, AiOutlineSetting, AiOutlineUser, AiOutlineFileText } from "react-icons/ai";
import { BiUserCircle, BiLogOut } from "react-icons/bi";
import { FaUsers, FaCalendarAlt, FaCog, FaBuilding } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";

// DesplegableUser
export const DesplegableUser = [
  {
    text: "Mi perfil",
    icono: <BiUserCircle />,
    tipo: "miperfil",
  },
  {
    text: "Configuracion",
    icono: <AiOutlineSetting />,
    tipo: "configuracion",
  },
  {
    text: "Cerrar sesión",
    icono: <BiLogOut />,
    tipo: "cerrarsesion",
  },
];

// data SIDEBAR
export const LinksArray = [
  {
    label: "Ambientes",
    icon: <FaBuilding />,
    to: "/ambientes",
  },
  
  {
    label: "Vinculaciones",
    icon: <FaUsers />,
    to: "/vinculaciones",
  },
  {
    label: "Fichas",
    icon: <AiOutlineFileText />,
    to: "/fichas",
  },
  {
    label: "Instructores",
    icon: <IoMdPeople />,
    to: "/instructores",
  },
  {
    label: "Horarios",
    icon: <FaCalendarAlt />,
    to: "/horarios",
  },
  {
    label: "Usuarios",
    icon: <AiOutlineUser />,
    to: "/usuarios",
  },
];

export const SecondarylinksArray = [
  {
    label: "Configuration",
    icon: <AiOutlineSetting />,
    to: "/configurar",
  },
];

// temas
export const TemasData = [
  {
    icono: "🌞",
    descripcion: "light",
  },
  {
    icono: "🌚",
    descripcion: "dark",
  },
];

// data configuracion
export const DataModulosConfiguracion = [
  {
    title: "Productos",
    subtitle: "registra tus productos",
    icono: "https://i.ibb.co/85zJ6yG/caja-del-paquete.png",
    link: "/configurar/productos",
  },
  {
    title: "Personal",
    subtitle: "ten el control de tu personal",
    icono: "https://i.ibb.co/5vgZ0fX/hombre.png",
    link: "/configurar/usuarios",
  },
  {
    title: "Tu empresa",
    subtitle: "configura tus opciones básicas",
    icono: "https://i.ibb.co/x7mHPgm/administracion-de-empresas.png",
    link: "/configurar/empresa",
  },
  {
    title: "Categoria de productos",
    subtitle: "asigna categorias a tus productos",
    icono: "https://i.ibb.co/VYbMRLZ/categoria.png",
    link: "/configurar/categorias",
  },
  {
    title: "Marca de productos",
    subtitle: "gestiona tus marcas",
    icono: "https://i.ibb.co/1qsbCRb/piensa-fuera-de-la-caja.png",
    link: "/configurar/marca",
  },
];

// tipo usuario
export const TipouserData = [
  {
    descripcion: "Administrador",
    icono: "🪖",
  },
  {
    descripcion: "Lider",
    icono: "👑",
  },
  {
    descripcion: "Instructor",
    icono: "😎",
  },
  {
    descripcion: "Aprendiz",
    icono: "🙂",
  },
];

// tipodoc
export const TipoDocData = [
  {
    descripcion: "Dni",
    icono: "🪖",
  },
  {
    descripcion: "Libreta electoral",
    icono: "👑",
  },
  {
    descripcion: "Otros",
    icono: "👑",
  },
];
