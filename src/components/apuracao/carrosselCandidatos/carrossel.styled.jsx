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
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
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
  box-sizing: border-box;
  padding: 0 48px;
`;

export const Card = styled.div`
  width: 1200px;
  max-width: 94vw;
  animation: ${fadeIn} 0.5s ease both;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 30px;
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
  background: ${CORES.primaria}1a;
  border: 1px solid ${CORES.primaria}40;
  color: ${CORES.primaria};
  font-weight: 700;
  font-size: 14px;
  white-space: nowrap;
`;

export const Contador = styled.div`
  font-size: 14px;
  font-weight: 800;
  color: ${CORES.textoSuave};
  letter-spacing: 1px;
  white-space: nowrap;
`;

export const Viewport = styled.div`
  overflow: hidden;
`;

export const Slide = styled.div`
  animation: ${slideIn} 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
`;

export const CandidatoCard = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 40px;
  padding: 40px 48px;
  border-radius: 26px;
  box-sizing: border-box;
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0.07) 0%,
    rgba(255, 255, 255, 0.025) 60%,
    rgba(255, 255, 255, 0.01) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 6px;
    background: ${(props) => props.$cor || CORES.primaria};
  }
`;

export const FotoWrap = styled.div`
  width: 190px;
  height: 190px;
  border-radius: 50%;
  overflow: hidden;
  border: 6px solid ${(props) => props.$cor || CORES.primaria};
  box-shadow: 0 0 0 6px ${(props) => props.$cor || CORES.primaria}22;
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
  font-size: 64px;
  font-weight: 900;
  color: ${(props) => props.$cor || CORES.primaria};
  text-transform: uppercase;
`;

export const Info = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Numero = styled.span`
  align-self: flex-start;
  padding: 5px 14px;
  border-radius: 100px;
  background: ${(props) => props.$cor || CORES.primaria}22;
  border: 1px solid ${(props) => props.$cor || CORES.primaria}55;
  color: ${(props) => props.$cor || CORES.primaria};
  font-size: 15px;
  font-weight: 900;
  letter-spacing: 1px;
`;

export const Nome = styled.div`
  font-size: 46px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  line-height: 1.08;
  word-break: break-word;
`;

export const Partido = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${CORES.textoSuave};
  text-transform: uppercase;
  letter-spacing: 1px;
  word-break: break-word;
`;

export const BarTrack = styled.div`
  height: 12px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
  margin-top: 4px;
`;

export const Bar = styled.div`
  height: 100%;
  border-radius: 100px;
  width: ${(props) => props.$width}%;
  background: linear-gradient(
    90deg,
    ${(props) => props.$cor},
    ${(props) => props.$cor}99
  );
  animation: ${growBar} 0.9s ease both;
  transition: width 0.8s ease;
`;

export const PercentBox = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  min-width: 260px;
`;

export const Percentual = styled.div`
  font-size: 96px;
  font-weight: 900;
  letter-spacing: -4px;
  line-height: 1;
  color: ${(props) => props.$cor || CORES.texto};
  white-space: nowrap;
`;

export const PercentLabel = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${CORES.textoSuave};
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const Votos = styled.div`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
  color: ${CORES.textoSuave};
  white-space: nowrap;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 30px;
`;

export const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

export const Dot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: ${(props) =>
    props.$ativo ? CORES.primaria : 'rgba(255,255,255,0.18)'};
  transition: background 0.3s ease;
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
