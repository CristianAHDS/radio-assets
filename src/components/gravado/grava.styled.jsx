import styled, { keyframes } from 'styled-components';
import { primary, secondary } from '../../constants/color';

const blink = keyframes`
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
`;

export const Badge = styled.div`
  background-color: ${primary};
  padding: 10px 20px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'Montserrat', sans-serif;
`;

export const BadgeDot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #e11d48;
  animation: ${blink} 1s infinite;
`;

export const BadgeText = styled.span`
  color: #fff;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

export const Banner = styled.div`
  background-color: ${secondary};
  padding: 10px 24px;
  display: inline-flex;
  align-items: center;
  color: #fff;
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
`;

export const GravaCard = styled.div`
  width: 320px;
  background-color: #f9f9f9;
  font-family: 'Montserrat', sans-serif;
`;

export const GravaCardTop = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #fff;
  font-weight: 900;
  font-size: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const GravaLogo = styled.img`
  height: 30px;
`;