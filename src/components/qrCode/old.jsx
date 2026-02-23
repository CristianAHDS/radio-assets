import { useState, useEffect } from 'react';
import {
  Container,
  Logo,
  QrCodeContainer,
  TextContainer,
  Qr,
  Sistema,
} from './qrCodeOutros.styled.jsx';

import { DiAndroid } from 'react-icons/di';

import { FaApple } from 'react-icons/fa';

const QrCode = () => {
  const qrLinks = [
    'https://i.imgur.com/SdXgcjB.png', // Android
    'https://i.imgur.com/oDv9DDu.png', // IOS
  ];

  const sistemaLabels = [
    {
      label: 'Android',
      icon: (
        <DiAndroid
          style={{
            marginLeft: 8,
            color: '#3f3f3f',
            fontSize: 26,
            marginTop: -5,
          }}
        />
      ),
    },
    {
      label: 'IOS',
      icon: (
        <FaApple
          style={{
            marginLeft: 8,
            color: '#3f3f3f',
            fontSize: 26,
            marginTop: -5,
          }}
        />
      ),
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % qrLinks.length);
    }, 10000); // troca a cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <TextContainer>
        <Logo src="https://i.imgur.com/dCl9lc6.png" />
      </TextContainer>
      <QrCodeContainer>
        <Sistema>
          {sistemaLabels[index].label} {sistemaLabels[index].icon}
        </Sistema>
        <Qr src={qrLinks[index]} />
      </QrCodeContainer>
    </Container>
  );
};

export default QrCode;
