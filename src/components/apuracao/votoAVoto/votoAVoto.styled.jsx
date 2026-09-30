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

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-family: 'Montserrat', 'Inter', 'Segoe UI', system-ui, sans-serif;
  color: ${CORES.texto};
  padding-bottom: 90px;
  box-sizing: border-box;
`;

export const Card = styled.div`
  width: 1000px;
  max-width: 94vw;
  padding: 24px 28px;
  animation: ${fadeInUp} 0.5s ease both;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${CORES.primaria};
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Counter = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${CORES.textoSuave};
  white-space: nowrap;

  strong {
    color: ${CORES.texto};
  }
`;

export const Track = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 12px;
`;

export const Marquee = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  will-change: transform;
  backface-visibility: hidden;
  animation: ${scroll} ${(props) => props.$duration || 25}s linear infinite;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 26px;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
`;

export const ItemDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color || CORES.primaria};
`;