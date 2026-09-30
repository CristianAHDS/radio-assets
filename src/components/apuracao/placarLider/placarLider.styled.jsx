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

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(60px); }
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
  width: 640px;
  max-width: 92vw;
  padding: 34px 36px;
  animation: ${slideIn} 0.5s ease both;
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
  margin-bottom: 18px;
`;

export const LeaderName = styled.h2`
  font-size: 34px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin: 0 0 6px;
`;

export const LeaderPct = styled.div`
  font-size: 88px;
  font-weight: 900;
  letter-spacing: -3px;
  line-height: 1;
  color: ${(props) => props.$cor || CORES.texto};
`;

export const Diff = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid #1e2d47;
  color: ${CORES.textoSuave};
  font-size: 15px;

  strong {
    color: ${CORES.ouro};
    font-weight: 800;
  }
`;