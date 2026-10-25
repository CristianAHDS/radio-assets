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

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(0.75); }
`;

export const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat', 'Inter', 'Segoe UI', system-ui, sans-serif;
  color: ${CORES.texto};
  box-sizing: border-box;
  padding: 0 48px;
`;

export const Wrap = styled.div`
  width: 1500px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 22px 26px;
  border-radius: 24px;
  box-sizing: border-box;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    #05306a 0%,
    #001d41 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.42);
  animation: ${fadeIn} 0.5s ease both;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const HeaderIcon = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${CORES.ouro};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin: 0;
  line-height: 1.1;
  text-transform: uppercase;
`;

export const Subtitle = styled.p`
  margin: 4px 0 0;
  font-size: 13px;
  color: ${CORES.textoSuave};
  text-transform: uppercase;
  letter-spacing: 0.6px;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const LiveBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: ${CORES.textoSuave};
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
`;

export const LiveDot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: ${(p) => (p.$on ? '#4ade80' : '#94a3b8')};
  box-shadow: ${(p) => (p.$on ? '0 0 10px rgba(74, 222, 128, 0.8)' : 'none')};
  animation: ${(p) => (p.$on ? pulse : 'none')} 1.4s ease-in-out infinite;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  grid-auto-rows: 138px;
  gap: 12px;
`;

export const Tile = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 12px;
  box-sizing: border-box;
  overflow: hidden;
  background: ${(p) =>
    p.$ativo ? `${p.$cor}1a` : 'rgba(255, 255, 255, 0.04)'};
  border: 1px solid
    ${(p) => (p.$ativo ? `${p.$cor}59` : 'rgba(255, 255, 255, 0.08)')};
  animation: ${fadeIn} 0.45s ease both;
`;

export const TileTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
`;

export const CidadeSigla = styled.span`
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 0.5px;
  line-height: 1;
  color: ${(p) => p.$cor || CORES.textoSuave};
`;

export const TileApurado = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: ${CORES.textoSuave};
  white-space: nowrap;
`;

export const TileName = styled.div`
  margin-top: 6px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.15;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: #cbd5e1;
`;

export const TilePct = styled.div`
  font-size: 34px;
  font-weight: 900;
  letter-spacing: -1px;
  line-height: 1;
  color: ${(p) => p.$cor || CORES.texto};
  white-space: nowrap;

  small {
    font-size: 15px;
    font-weight: 800;
    margin-left: 1px;
  }
`;

export const TileVazio = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: ${CORES.textoSuave};
`;

export const TileTrack = styled.div`
  height: 5px;
  margin-top: 7px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
`;

export const TileBar = styled.div`
  height: 100%;
  width: ${(p) => p.$width || 0}%;
  border-radius: 100px;
  background: ${(p) => p.$cor || CORES.textoSuave};
  transition: width 0.8s ease;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
`;

export const Legend = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

export const LegendItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: ${CORES.textoSuave};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
`;

export const LegendDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(p) => p.$cor || CORES.ouro};
  flex-shrink: 0;
`;

export const LegendName = styled.span`
  color: #ffffff;
`;

export const LegendPct = styled.strong`
  color: ${CORES.ouro};
  font-weight: 900;
`;

export const FooterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: ${CORES.textoSuave};
  text-transform: uppercase;
  letter-spacing: 0.6px;
  white-space: nowrap;
`;

export const EmptyState = styled.div`
  padding: 80px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: ${CORES.textoSuave};
  text-transform: uppercase;
  letter-spacing: 1px;
`;