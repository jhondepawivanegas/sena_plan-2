import styled from "styled-components";
import { FaCalendarAlt, FaRegClock, FaRegCalendarCheck } from "react-icons/fa";
import senaLogo from '../../assets/sena.png'; // Importa la imagen correctamente

export function HomeTemplate() {
  return (
    <Container>
      <Overlay>
        <Content>
          <Header>
            <Logo src={senaLogo} alt="Logo" />
            <HeaderText>
              <Title>Bienvenido a tu Gestor de Calendario Sena</Title>
              <Subtitle>Organiza tu tiempo de manera eficiente</Subtitle>
            </HeaderText>
          </Header>
          <Description>
            Explora nuestra herramienta para gestionar tus eventos y tareas de forma intuitiva. Mantén tus planes organizados y al alcance de tu mano.
          </Description>
          <Features>
            <Feature>
              <Icon><FaCalendarAlt /></Icon>
              <FeatureTitle>Vista de Calendario</FeatureTitle>
              <FeatureDescription>Visualiza tus eventos en una vista de calendario clara y moderna.</FeatureDescription>
            </Feature>
            <Feature>
              <Icon><FaRegClock /></Icon>
              <FeatureTitle>Recordatorios</FeatureTitle>
              <FeatureDescription>Configura recordatorios para no olvidar tus compromisos importantes.</FeatureDescription>
            </Feature>
            <Feature>
              <Icon><FaRegCalendarCheck /></Icon>
              <FeatureTitle>Gestión de Tareas</FeatureTitle>
              <FeatureDescription>Administra tus tareas diarias con una interfaz fácil de usar.</FeatureDescription>
            </Feature>
          </Features>
          <Footer>
            <FooterText>© 2024 Gestor de Calendario. Todos los derechos reservados.</FooterText>
          </Footer>
        </Content>
      </Overlay>
    </Container>
  );
}

// Estilos usando styled-components
const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: url('/images/calendar-background.jpg') no-repeat center center/cover;
  color: ${({ theme }) => theme.text};
  overflow: auto;
`;

const Overlay = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  overflow: auto;
`;

const Content = styled.div`
  position: relative;
  text-align: center;
  max-width: 1100px;
  width: 100%;
  padding: 40px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  overflow: auto;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const Logo = styled.img`
  height: 100px; /* Aumenta el tamaño del logo */
  margin-right: 20px;
  border: none;
  box-shadow: none;
`;

const HeaderText = styled.div`
  text-align: left;
  max-width: 700px;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin: 0;
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
`;

const Subtitle = styled.h2`
  font-size: 1.5em;
  margin: 10px 0 0;
  color: ${({ theme }) => theme.secondary};
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 1.2em;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
`;

const Features = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 0 auto;
`;

const Feature = styled.div`
  text-align: center;
  max-width: 320px;
  margin: 20px;
  padding: 20px;
  border-radius: 15px;
  background: ${({ theme }) => theme.featureBackground};
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.featureBackgroundHover};
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }
`;

const Icon = styled.div`
  font-size: 3em;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.4em;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.title};
  font-weight: bold;
`;

const FeatureDescription = styled.p`
  font-size: 1em;
  color: ${({ theme }) => theme.text};
  line-height: 1.5;
`;

const Footer = styled.footer`
  margin-top: 40px;
  padding: 20px;
  border-top: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.footerBackground};
`;

const FooterText = styled.p`
  font-size: 0.9em;
  color: ${({ theme }) => theme.textLight};
  margin: 0;
`;
