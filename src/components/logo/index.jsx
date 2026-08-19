import styled from 'styled-components';
import logoImage from './hbFjw0C.png';

const LogoImg = styled.img`
  height: 100px;
  display: block;
`;

const Logo = () => {
  return <LogoImg src={logoImage} alt="Logo Rádio Pelotense" />;
};

export default Logo;
