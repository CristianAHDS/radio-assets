import styled, { keyframes } from 'styled-components';
import { primary, secondary } from '../../constants/color';
import { CORES } from '../apuracao/data';

const scroll = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

export const Bar = styled.div`
  width: 100vw;
  height: 50px;
  display: flex;
  align-items: center;
  color: #ffffff;
  border-left: solid 8px #ffffff;
  background-color: ${primary};
  overflow: hidden;
`;

export const SideLabel = styled.div`
  width: 280px;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: ${secondary};
  border-left: solid 8px #ffffff;
  font-size: 17px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const SideDot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: ${CORES.ouro};
  box-shadow: 0 0 9px ${CORES.ouro};
  flex-shrink: 0;
`;

export const ScrollingSide = styled.div`
  width: calc(100% - 280px);
  height: 100%;
  display: flex;
  align-items: center;
  background-color: ${primary};
  overflow: hidden;
  position: relative;
`;

export const ScrollingWrapper = styled.div`
  width: max-content;
  height: 100%;
  display: flex;
  align-items: center;
  will-change: transform;
  backface-visibility: hidden;
  animation: ${scroll} ${(props) => props.$duration || 60}s linear infinite;
`;

export const UfGroup = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 20px;
  border-right: 1px solid rgba(255, 255, 255, 0.22);
  white-space: nowrap;
`;

export const UfTag = styled.span`
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${CORES.ouro};
`;

export const Candidato = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const Cor = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: ${(props) => props.$color || '#ffffff'};
  box-shadow: 0 0 8px ${(props) => props.$color || '#ffffff'};
  flex-shrink: 0;
`;

export const Nome = styled.span`
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
`;

export const Pct = styled.strong`
  font-size: 18px;
  font-weight: 900;
`;

export const Measure = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  align-items: center;
  width: max-content;
  visibility: hidden;
  pointer-events: none;
`;
