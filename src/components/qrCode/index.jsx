import { MainContainer, QrFrameContainer, QqText } from './qrCode.styled';
import { useSearchParams } from 'react-router-dom';
import QRCode from 'react-qr-code';

const QrCode = () => {
  const [searchParams] = useSearchParams();
  const link = searchParams.get('link'); // pega ?link=XXX
  return (
    <MainContainer>
      <QrFrameContainer>
        <QRCode
          style={{ width: '75%' }}
          value={link || 'https://ahoradosul.com.br/'}
        />
        <QqText>Texto QR</QqText>
      </QrFrameContainer>
    </MainContainer>
  );
};

export default QrCode;
