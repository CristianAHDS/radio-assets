
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
          src="https://bitcom.camerite.com/embed/755679/undefined/undefined/vet-parque-una? autoplay=true&sound=truecontrols=0">
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
