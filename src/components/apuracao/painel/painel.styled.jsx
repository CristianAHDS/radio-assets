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

const growBar = keyframes`
  from { width: 0; }
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

export const Panel = styled.div`
  width: 1500px;
  max-width: 92vw;
  padding: 44px 48px 40px;
  animation: ${fadeInUp} 0.5s ease both;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 34px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const HeaderIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${CORES.primaria}1f;
  color: ${CORES.primaria};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const Title = styled.h1`
  font-size: 34px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin: 0;
  line-height: 1.1;
`;

export const Subtitle = styled.p`
  margin: 4px 0 0;
  font-size: 14px;
  color: ${CORES.textoSuave};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const HeaderBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 100px;
  background: ${CORES.primaria}1a;
  border: 1px solid ${CORES.primaria}40;
  color: ${CORES.primaria};
  font-weight: 700;
  font-size: 14px;
  white-space: nowrap;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 70px 1fr 190px 140px;
  align-items: center;
  gap: 18px;
  padding: 16px 20px;
  border-radius: 14px;
  transition: background 0.3s ease;
  animation: ${fadeInUp} 0.4s ease both;

  &:hover {
    background: ${(props) => props.$cor || CORES.primaria}14;
  }
`;

export const Rank = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 900;
  color: #fff;
  background: ${(props) => props.$cor || CORES.primaria};
`;

export const Info = styled.div`
  min-width: 0;
`;

export const Name = styled.div`
  font-size: 22px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BarTrack = styled.div`
  height: 10px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.08);
  margin-top: 10px;
  overflow: hidden;
`;

export const Bar = styled.div`
  height: 100%;
  border-radius: 100px;
  background: linear-gradient(90deg, ${(props) => props.$cor}, ${(props) => props.$cor}99);
  animation: ${growBar} 0.8s ease both;
  transition: width 0.8s ease;
`;

export const Pct = styled.div`
  font-size: 40px;
  font-weight: 900;
  letter-spacing: -1px;
  text-align: right;
  color: ${CORES.texto};
`;

export const Votes = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${CORES.textoSuave};
  text-align: right;
`;