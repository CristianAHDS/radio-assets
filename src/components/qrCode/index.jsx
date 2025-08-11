import {
  Container,
  Logo,
  QrCodeContainer,
  TextContainer,
  Qr,
} from './qrCodeOutros.styled.jsx';

const QrCode = () => {
  return (
    <Container>
      <TextContainer>
        <Logo src="https://i.imgur.com/dCl9lc6.png" />
      </TextContainer>
      <QrCodeContainer>
        <Qr src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/QR_Code_Example.svg/368px-QR_Code_Example.svg.png" />
      </QrCodeContainer>
    </Container>
  );
};

export default QrCode;
