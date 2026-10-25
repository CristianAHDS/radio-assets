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
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
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
  padding: 36px 40px;
  animation: ${fadeInUp} 0.5s ease both;
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border-radius: 100px;
  background: ${CORES.primaria}1f;
  border: 1px solid ${CORES.primaria}45;
  color: ${CORES.primaria};
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 20px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

export const Item = styled.div`
  padding: 20px 24px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  animation: ${slideIn} 0.4s ease both;
  animation-delay: ${(props) => props.$delay || 0}s;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ItemDot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $color }) => $color || CORES.primaria};
  flex-shrink: 0;
`;

export const ItemLabel = styled.span`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${CORES.textoSuave};
`;

export const ItemName = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.2px;
  line-height: 1.2;
`;

export const ItemPct = styled.div`
  font-size: 42px;
  font-weight: 900;
  letter-spacing: -2px;
  line-height: 1;
  color: ${({ $color }) => $color || CORES.texto};
`;

export const ItemVotos = styled.div`
  font-size: 14px;
  color: ${CORES.textoSuave};
  font-weight: 600;
`;

export const Legend = styled.div`
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #1e2d47;
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 13px;
  color: ${CORES.textoSuave};
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;

  strong {
    color: ${CORES.texto};
  }
`;

export const LegendDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;