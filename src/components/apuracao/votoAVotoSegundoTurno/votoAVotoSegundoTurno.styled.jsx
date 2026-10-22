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
  align-items: flex-end;
  justify-content: center;
  font-family: 'Montserrat', 'Inter', 'Segoe UI', system-ui, sans-serif;
  color: ${CORES.texto};
  padding-bottom: 72px;
  box-sizing: border-box;
`;

export const Card = styled.div`
  width: 940px;
  max-width: 94vw;
  padding: 18px 24px 16px;
  border-radius: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: linear-gradient(
    135deg,
    #05306a 0%,
    #001d41 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.42);
  animation: ${fadeInUp} 0.45s ease both;
`;

export const Topbar = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 14px;
`;

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-self: start;
  gap: 7px;
  padding: 4px 11px;
  border-radius: 100px;
  background: ${CORES.ouro};
  color: #0b1220;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1.3px;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const Diff = styled.span`
  justify-self: center;
  font-size: 11px;
  font-weight: 800;
  color: ${CORES.textoSuave};
  letter-spacing: 0.6px;
  text-transform: uppercase;
  white-space: nowrap;

  strong {
    color: ${CORES.ouro};
  }
`;

export const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 14px;
`;

export const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  font-weight: 700;
  color: ${CORES.textoSuave};
  letter-spacing: 0.8px;
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

export const Duel = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 18px;
  min-height: 56px;
`;

export const Side = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  ${(p) =>
    p.$right
      ? 'flex-direction: row-reverse; text-align: right;'
      : ''}
`;

export const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  flex-shrink: 0;
  overflow: hidden;
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
  font-size: 16px;
  font-weight: 900;
  color: ${(p) => p.$cor || CORES.texto};
  text-transform: uppercase;
`;

export const SideText = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: inherit;
`;

export const Name = styled.div`
  max-width: 100%;
  font-size: 19px;
  font-weight: 800;
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
  letter-spacing: 1px;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Pct = styled.div`
  min-width: 88px;
  font-size: 30px;
  font-weight: 900;
  letter-spacing: -1.2px;
  line-height: 1;
  color: ${(p) => p.$cor || CORES.texto};
  text-align: ${(p) => (p.$right ? 'left' : 'right')};
  white-space: nowrap;
  flex-shrink: 0;

  small {
    font-size: 15px;
    font-weight: 800;
    margin-left: 1px;
  }
`;

export const Versus = styled.span`
  width: 32px;
  height: 32px;
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
  height: 8px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
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
    #000 24px,
    #000 calc(100% - 24px),
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
  padding: 0 18px;
  white-space: nowrap;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 117px;
  padding: 30px 0 24px;
  text-align: center;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: ${CORES.textoSuave};
`;
