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
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
`;

const growBar = keyframes`
  from { width: 0; }
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
  gap: 20px;
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
  font-size: 34px;
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
  box-shadow: ${(p) =>
    p.$on ? '0 0 10px rgba(74, 222, 128, 0.8)' : 'none'};
  animation: ${(p) => (p.$on ? pulse : 'none')} 1.4s ease-in-out infinite;
`;

export const List = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  gap: 18px;
`;

export const CandidateCard = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  gap: 34px;
  padding: 24px 40px;
  border-radius: 18px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid
    ${(p) =>
      p.$leader ? `${p.$cor}66` : 'rgba(255, 255, 255, 0.08)'};
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease both;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 6px;
    background: ${(p) => p.$cor || CORES.primaria};
  }
`;

export const LeaderTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  padding: 5px 12px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #0b1220;
  background: ${CORES.ouro};
`;

export const Rank = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 900;
  flex-shrink: 0;
  color: ${(p) => p.$cor || CORES.primaria};
  background: ${(p) => p.$cor || CORES.primaria}22;
  border: 1px solid ${(p) => p.$cor || CORES.primaria}55;
`;

export const FotoWrap = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 6px solid ${(p) => p.$cor || CORES.primaria};
  box-shadow: 0 0 0 6px ${(p) => p.$cor || CORES.primaria}22;
  background: #0e1b30;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const FotoFallback = styled.span`
  font-size: 52px;
  font-weight: 900;
  color: ${(p) => p.$cor || CORES.primaria};
  text-transform: uppercase;
`;

export const Info = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Numero = styled.span`
  align-self: flex-start;
  padding: 5px 14px;
  border-radius: 100px;
  background: ${(p) => p.$cor || CORES.primaria}22;
  border: 1px solid ${(p) => p.$cor || CORES.primaria}55;
  color: ${(p) => p.$cor || CORES.primaria};
  font-size: 15px;
  font-weight: 900;
  letter-spacing: 1px;
`;

export const Nome = styled.div`
  font-size: 42px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  line-height: 1.05;
  word-break: break-word;
`;

export const Partido = styled.div`
  font-size: 19px;
  font-weight: 700;
  color: ${CORES.textoSuave};
  text-transform: uppercase;
  letter-spacing: 1px;
  word-break: break-word;
`;

export const BarTrack = styled.div`
  height: 12px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
  margin-top: 6px;
`;

export const Bar = styled.div`
  height: 100%;
  border-radius: 100px;
  width: ${(p) => p.$width}%;
  background: linear-gradient(
    90deg,
    ${(p) => p.$cor},
    ${(p) => p.$cor}99
  );
  animation: ${growBar} 0.9s ease both;
  transition: width 0.8s ease;
`;

export const PercentBox = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  min-width: 250px;
`;

export const Percentual = styled.div`
  font-size: 84px;
  font-weight: 900;
  letter-spacing: -3px;
  line-height: 1;
  color: ${(p) => p.$cor || CORES.texto};
  white-space: nowrap;
`;

export const PercentLabel = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${CORES.textoSuave};
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const Votos = styled.div`
  margin-top: 6px;
  font-size: 16px;
  font-weight: 600;
  color: ${CORES.textoSuave};
  white-space: nowrap;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const FooterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: ${CORES.textoSuave};
  text-transform: uppercase;
  letter-spacing: 0.6px;
`;

export const Diferenca = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${CORES.textoSuave};

  strong {
    color: ${CORES.ouro};
  }
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 414px;
  padding: 80px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: ${CORES.textoSuave};
  text-transform: uppercase;
  letter-spacing: 1px;
`;
