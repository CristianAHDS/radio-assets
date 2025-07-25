import styled, { keyframes } from 'styled-components';
import { primaryEstporte, secondaryEsporte } from './constants/color';

// Animação de scroll contínuo da direita para a esquerda
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

  background-color: ${primaryEstporte};

  display: flex;
  align-items: center;
  color: #fff;

  border-left: solid 10px #fff;
  overflow: hidden;
`;

export const LeftSide = styled.div`
  width: 300px;
  height: 100%;
  background-color: ${secondaryEsporte};

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 900;
  font-size: 20px;
  text-transform: uppercase;
`;

export const TextSide = styled.div`
  width: calc(100% - 300px);
  height: 100%;
  background-color: ${primaryEstporte};

  overflow: hidden;
  position: relative;
`;

export const ScrollingWrapper = styled.div`
  height: 100%;
  display: flex;
  width: max-content;
  animation: ${scroll} 120s linear infinite;
`;

export const ScrollingText = styled.div`
  height: 100%;

  display: flex;
  align-items: center;

  white-space: nowrap;
  font-weight: 400;
  font-size: 18px;
  padding-right: 100px; /* Espaço entre as duplicações */

  text-transform: uppercase;
`;
