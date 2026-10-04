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

export const SectionGroup = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  white-space: nowrap;
`;

export const SectionTag = styled.span`
  padding: 0 22px 0 28px;
  margin-right: 4px;

  font-size: 14px;
  font-weight: 900;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  white-space: nowrap;

  color: #fbbf24;
`;

export const Candidate = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 0 22px;
  border-right: 1px solid rgba(255, 255, 255, 0.35);
`;

export const CandidateAvatar = styled.span`
  position: relative;

  width: 34px;
  height: 34px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  overflow: hidden;

  border: 2px solid ${(props) => props.$color || '#fff'};
  box-shadow: 0 0 8px ${(props) => props.$color || '#fff'}66;

  background: ${(props) => props.$color || '#1f4e9c'};
  color: #fff;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export const CandidatePhoto = styled.img`
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;

  opacity: ${(props) => (props.$loaded ? 1 : 0)};
  transition: opacity 0.25s ease;
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
