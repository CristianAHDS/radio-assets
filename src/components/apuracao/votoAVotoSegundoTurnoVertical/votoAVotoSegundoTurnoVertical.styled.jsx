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
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
`;

const growLeft = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(0.75); }
`;

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

export const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  font-family: 'Montserrat', 'Inter', 'Segoe UI', system-ui, sans-serif;
  color: ${CORES.texto};
`;

export const Card = styled.div`
  width: min(calc(94vh * 9 / 16), 92vw);
  aspect-ratio: 9 / 16;
  padding: 20px 22px 18px;
  border-radius: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
  background: linear-gradient(
    160deg,
    #05306a 0%,
    #001d41 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.42);
  animation: ${fadeInUp} 0.45s ease both;
`;

export const Top = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 11px;
  border-radius: 100px;
  background: ${CORES.ouro};
  color: #0b1220;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1.1px;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const LiveDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${(p) => (p.$on ? '#4ade80' : '#94a3b8')};
  box-shadow: ${(p) => (p.$on ? '0 0 8px rgba(74, 222, 128, 0.8)' : 'none')};
  animation: ${(p) => (p.$on ? pulse : 'none')} 1.4s ease-in-out infinite;
`;

export const Diff = styled.span`
  font-size: 10px;
  font-weight: 800;
  color: ${CORES.textoSuave};
  letter-spacing: 0.5px;
  text-transform: uppercase;
  white-space: nowrap;

  strong {
    color: ${CORES.ouro};
  }
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

export const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 9.5px;
  font-weight: 700;
  color: ${CORES.textoSuave};
  letter-spacing: 0.7px;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const Duel = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 12px;
`;

export const Side = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 14px 16px;
  border-radius: 18px;
  text-align: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

export const Avatar = styled.div`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0e1b30;
  border: 3px solid ${(p) => p.$cor || CORES.primaria};
  box-shadow: 0 0 0 3px ${(p) => p.$cor || CORES.primaria}22;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const AvatarFallback = styled.span`
  font-size: 22px;
  font-weight: 900;
  color: ${(p) => p.$cor || CORES.texto};
  text-transform: uppercase;
`;

export const Name = styled.div`
  max-width: 100%;
  font-size: 22px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.2px;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Party = styled.div`
  max-width: 100%;
  font-size: 10px;
  font-weight: 700;
  color: ${CORES.textoSuave};
  letter-spacing: 0.8px;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Pct = styled.div`
  font-size: 50px;
  font-weight: 900;
  letter-spacing: -2px;
  line-height: 1;
  color: ${(p) => p.$cor || CORES.texto};
  white-space: nowrap;

  small {
    font-size: 22px;
    font-weight: 800;
    margin-left: 1px;
  }
`;

export const Versus = styled.div`
  align-self: center;
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.5px;
  color: ${CORES.textoSuave};
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.14);
`;

export const Dispute = styled.div`
  display: flex;
  gap: 3px;
  height: 10px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
`;

export const Bar = styled.div`
  width: 100%;
  height: 10px;
  flex-shrink: 0;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
`;

export const BarFill = styled.div`
  height: 100%;
  width: ${(p) => p.$width}%;
  min-width: 2px;
  border-radius: 100px;
  background: linear-gradient(90deg, ${(p) => p.$cor}, ${(p) => p.$cor}88);
  transform-origin: left;
  animation: ${growLeft} 0.9s ease both;
  transition: width 0.8s ease;
`;

export const Segment = styled.div`
  height: 100%;
  width: ${(p) => p.$width}%;
  min-width: 2px;
  border-radius: 100px;
  background: linear-gradient(
    ${(p) => (p.$side === 'right' ? '270deg' : '90deg')},
    ${(p) => p.$cor},
    ${(p) => p.$cor}88
  );
  transform-origin: ${(p) => (p.$side === 'right' ? 'right' : 'left')};
  animation: ${growLeft} 0.9s ease both;
  transition: width 0.8s ease;
`;

export const Ticker = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.22);
  padding: 8px 0;
  mask-image: linear-gradient(
    90deg,
    transparent 0,
    #000 20px,
    #000 calc(100% - 20px),
    transparent 100%
  );
`;

export const Marquee = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  will-change: transform;
  backface-visibility: hidden;
  animation: ${scroll} ${(p) => p.$duration || 18}s linear infinite;
`;

export const TickerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 0 16px;
  white-space: nowrap;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.82);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
`;

export const TickerDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${(p) => p.$color || CORES.ouro};
`;

export const EmptyState = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: ${CORES.textoSuave};
`;
