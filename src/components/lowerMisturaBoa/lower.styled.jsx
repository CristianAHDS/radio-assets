import styled, { keyframes } from 'styled-components';
import {
  primaryMisturaBoa,
  secondaryMisturaBoa,
} from '../../constants/color';

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

export const TextContainer = styled.div`
  width: 100vw;
  height: 50px;

  background-color: ${primaryMisturaBoa};

  display: flex;
  align-items: center;
  color: #fff;

  overflow: hidden;

  border-left: solid 8px #fff;
`;

export const LeftSide = styled.div`
  width: 300px;
  height: 100%;
  background-color: ${secondaryMisturaBoa};

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 900;
  font-size: 20px;
  text-transform: uppercase;

  border-left: solid 8px #fff;
`;

export const TextSide = styled.div`
  width: calc(100% - 300px);
  height: 100%;
  background-color: ${primaryMisturaBoa};

  overflow: hidden;
  position: relative;
`;

// Recebe duração da animação via prop
export const ScrollingWrapper = styled.div`
  margin-top: 1px;
  height: 100%;
  display: flex;
  width: max-content;
  will-change: transform;
  backface-visibility: hidden;
  animation: ${scroll} ${(props) => props.animationDuration || 10}s linear
    infinite;
`;
