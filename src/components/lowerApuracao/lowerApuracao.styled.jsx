import styled, { keyframes } from 'styled-components';
import { primary, secondary } from '../../constants/color';

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
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
  color: #fff;

  overflow: hidden;

  border-left: solid 8px #fff;

  background-color: ${primary};
`;

export const SideLabel = styled.div`
  width: 300px;
  height: 100%;
  margin-top: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${secondary};

  font-weight: 900;
  font-size: 20px;
  text-transform: uppercase;

  border-left: solid 8px #fff;
`;

export const ScrollingSide = styled.div`
  width: calc(100% - 300px);
  height: 100%;

  overflow: hidden;
  position: relative;

  background-color: ${primary};

  display: flex;
  align-items: center;
`;

export const ScrollingWrapper = styled.div`
  height: 100%;
  margin-top: 5px;

  display: flex;
  align-items: center;

  width: max-content;

  will-change: transform;
  backface-visibility: hidden;

  animation: ${scroll} ${(props) => props.$duration || 30}s linear infinite;
`;

export const CandidateSet = styled.div`
  display: flex;
  align-items: center;

  padding-right: 60px;
  white-space: nowrap;
`;

export const Candidate = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 0 28px;
  border-right: 1px solid rgba(255, 255, 255, 0.35);
`;

export const CandidateDot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;

  background: ${(props) => props.$color || '#fff'};
  box-shadow: 0 0 8px ${(props) => props.$color || '#fff'}66;
`;

export const CandidateName = styled.span`
  font-size: 19px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
`;

export const CandidatePct = styled.strong`
  font-size: 21px;
  font-weight: 900;
  color: #fff;
`;
