
import {
  Container,
  ContainerFrame,
  VetorialLogo,
  PelotenseLogo,
  Logos
} from './cam.styled.jsx';

const CamUna = () => {

  return (
    <Container>
      <ContainerFrame>
        <iframe frameborder="0" width='1368' height='900'
          src="https://bitcom.camerite.com/embed/732035/rio-grande-do-sul/pelotas/pet-posto-da-baronesa?autoplay=true&sound=true">
        </iframe>
        <Logos>
        <PelotenseLogo src="https://i.imgur.com/x8O2f2L.png" />
        <VetorialLogo src="https://static.wixstatic.com/media/1eccce_45135450e82a48adb3d43956d96f9e30~mv2.png" />
        </Logos>
        </ContainerFrame>
    </Container>
  );
};

export default CamUna;
