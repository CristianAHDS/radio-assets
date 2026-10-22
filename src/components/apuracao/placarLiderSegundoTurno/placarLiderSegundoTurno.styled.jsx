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

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(60px); }
  to { opacity: 1; transform: translateX(0); }
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

export const Card = styled.div`
  width: 900px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 34px 42px;
  border-radius: 24px;
  box-sizing: border-box;
  background: linear-gradient(
    135deg,
    rgba(5, 48, 106, 0.96) 0%,
    rgba(0, 29, 65, 0.98) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.42);
  animation: ${fadeIn} 0.5s ease both;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 100px;
  background: rgba(251, 191, 36, 0.16);
  border: 1px solid rgba(251, 191, 36, 0.45);
  color: ${CORES.ouro};
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  white-space: nowrap;
`;

export const LiveBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: ${CORES.textoSuave};
  font-size: 12px;
  font-weight: 700;
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

export const LeaderName = styled.div`
  font-size: 42px;
  font-weight: 900;
  letter-spacing: -1px;
  line-height: 1.05;
  text-transform: uppercase;
  animation: ${slideIn} 0.45s ease both;
`;

export const LeaderPct = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 116px;
  font-weight: 900;
  letter-spacing: -6px;
  line-height: 0.9;
  color: ${(p) => p.$cor || CORES.texto};

  small {
    font-size: 40px;
    font-weight: 800;
    letter-spacing: -1px;
    margin-top: 8px;
    margin-left: 4px;
  }
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 26px;
  flex-wrap: wrap;
  padding: 14px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const Meta = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${CORES.textoSuave};
  text-transform: uppercase;
  letter-spacing: 0.6px;
  white-space: nowrap;

  svg {
    color: ${CORES.ouro};
  }

  strong {
    color: #ffffff;
    font-weight: 900;
  }
`;

export const Split = styled.div`
  display: flex;
  height: 16px;
  border-radius: 100px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
`;

export const SplitFill = styled.div`
  width: ${(p) => p.$width || 0}%;
  height: 100%;
  background: ${(p) => p.$cor || CORES.textoSuave};
  transition: width 0.9s ease;

  & + & {
    border-left: 3px solid rgba(0, 29, 65, 0.9);
  }
`;

export const LegendRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
`;

export const LegendItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 13px;
  font-weight: 700;
  color: ${CORES.textoSuave};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;

  strong {
    color: #ffffff;
    font-weight: 900;
  }
`;

export const LegendDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(p) => p.$cor || CORES.ouro};
  flex-shrink: 0;
`;

export const Diff = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 15px;
  font-weight: 600;
  color: ${CORES.textoSuave};
  flex-wrap: wrap;

  strong {
    color: ${CORES.ouro};
    font-weight: 900;
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-size: 12px;
  font-weight: 700;
  color: ${CORES.textoSuave};
  text-transform: uppercase;
  letter-spacing: 0.7px;
  white-space: nowrap;
`;

export const FooterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const EmptyState = styled.div`
  padding: 60px 20px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: ${CORES.textoSuave};
  text-transform: uppercase;
  letter-spacing: 1px;
`;
