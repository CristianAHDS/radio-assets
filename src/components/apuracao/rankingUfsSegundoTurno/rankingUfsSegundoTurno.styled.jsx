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

export const HeaderBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  white-space: nowrap;
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

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Row = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 50px 76px minmax(0, 1fr) minmax(140px, 300px) 132px;
  align-items: center;
  gap: 16px;
  padding: 10px 18px 10px 22px;
  border-radius: 14px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  animation: ${fadeIn} 0.4s ease both;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 10px;
    bottom: 10px;
    width: 5px;
    border-radius: 0 6px 6px 0;
    background: ${(p) => p.$cor || CORES.textoSuave};
  }
`;

export const Rank = styled.div`
  font-size: 24px;
  font-weight: 900;
  letter-spacing: -1px;
  color: ${(p) => (p.$destaque ? CORES.ouro : CORES.textoSuave)};
`;

export const Uf = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 10px;
  background: ${(p) => `${p.$cor}24`};
  border: 1px solid ${(p) => `${p.$cor}66`};
  color: ${(p) => p.$cor};
  font-size: 19px;
  font-weight: 900;
  letter-spacing: 0.5px;
`;

export const Info = styled.div`
  min-width: 0;
`;

export const Lider = styled.div`
  font-size: 19px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.2px;
  line-height: 1.15;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Adversario = styled.div`
  margin-top: 2px;
  font-size: 12px;
  font-weight: 700;
  color: ${CORES.textoSuave};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MargemTrack = styled.div`
  height: 10px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
`;

export const MargemFill = styled.div`
  height: 100%;
  width: ${(p) => p.$width || 0}%;
  border-radius: 100px;
  background: linear-gradient(
    90deg,
    ${(p) => p.$cor || CORES.ouro} 0%,
    ${CORES.ouro} 100%
  );
  transition: width 0.9s ease;
`;

export const Marks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1px;
  white-space: nowrap;
`;

export const Pct = styled.div`
  font-size: 26px;
  font-weight: 900;
  letter-spacing: -1px;
  line-height: 1;
  color: ${(p) => p.$cor || CORES.texto};
`;

export const Delta = styled.div`
  font-size: 12px;
  font-weight: 800;
  color: ${CORES.ouro};
  text-transform: uppercase;
  letter-spacing: 0.6px;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  font-size: 12px;
  font-weight: 700;
  color: ${CORES.textoSuave};
  text-transform: uppercase;
  letter-spacing: 0.7px;
  flex-wrap: wrap;
`;

export const FooterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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
