import styled, { keyframes } from 'styled-components';
import { primary, secondary } from './constants/color';

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

  background-color: ${primary};

  display: flex;
  align-items: center;
  color: #fff;

  border-left: solid 10px #fff;
  overflow: hidden;
`;

export const LeftSide = styled.div`
  width: 300px;
  height: 100%;
  background-color: ${secondary};

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
  background-color: ${primary};

  overflow: hidden;
  position: relative;
`;

// Agora recebe a duração da animação via prop 'animationDuration'
export const ScrollingWrapper = styled.div`
  height: 100%;
  display: flex;
  width: max-content;
  animation: ${scroll} ${(props) => props.animationDuration || 30}s linear
    infinite;
`;

// Agora recebe a largura via prop 'width'
export const ScrollingText = styled.textarea`
  /* Removi min-width para usar a largura dinâmica */
  width: ${(props) =>
    props.width ? `${props.width}px` : 'calc(100vw - 300px)'};
  height: 15px;
  margin-top: 15px;
  overflow: hidden;

  border: none;
  outline: none;
  resize: none; /* opcional: remove o controle de redimensionamento */

  display: flex;
  align-items: center;

  white-space: nowrap;
  font-weight: 400;
  font-size: 18px;
  padding-right: 100px; /* Espaço entre as duplicações */

  text-transform: uppercase;

  background-color: transparent;

  color: #fff;

  &:focus {
    outline: none;
  }
`;
