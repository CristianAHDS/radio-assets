import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { CORES } from '../data';

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 100%;
  }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fillBar = keyframes`
  from { width: 0; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

export const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat', 'Inter', 'Segoe UI', system-ui, sans-serif;
  color: ${CORES.texto};
`;

export const Card = styled.div`
  width: 900px;
  max-width: 92vw;
  padding: 40px 44px;
  animation: ${fadeInUp} 0.5s ease both;
`;

export const Title = styled.h2`
  margin: 0 0 4px;
  font-size: 22px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Sub = styled.p`
  margin: 0 0 28px;
  color: ${CORES.textoSuave};
  font-size: 14px;
`;

export const Pct = styled.div`
  font-size: 96px;
  font-weight: 900;
  letter-spacing: -3px;
  line-height: 1;
  margin-bottom: 24px;
  color: ${CORES.primaria};
`;

export const Track = styled.div`
  height: 22px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.12);
  overflow: hidden;
  margin-bottom: 12px;
`;

export const Bar = styled.div`
  height: 100%;
  border-radius: 100px;
  background: linear-gradient(90deg, ${CORES.secundaria}, ${CORES.primaria});
  animation: ${fillBar} 1s ease both;
  transition: width 1s ease;
`;

export const Stats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 8px;
`;

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const StatValue = styled.strong`
  font-size: 22px;
  font-weight: 800;
`;

export const StatLabel = styled.span`
  font-size: 12px;
  color: ${CORES.textoSuave};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const LiveDot = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  color: ${CORES.primaria};
  text-transform: uppercase;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${CORES.primaria};
    animation: ${pulse} 1.5s ease-in-out infinite;
  }
`;