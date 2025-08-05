import styled, { keyframes } from 'styled-components';
import { primaryFenadoce, secondaryFenadoce } from './constants/color';

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

  background-color: ${secondaryFenadoce};

  display: flex;
  align-items: center;
  color: #fff;

  border-left: solid 10px #fff;
  overflow: hidden;
`;

export const LeftSide = styled.div`
  width: 300px;
  height: 100%;
  background-color: ${primaryFenadoce};

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
  background-color: ${secondaryFenadoce};

  overflow: hidden;
  position: relative;
`;

// Recebe duração da animação via prop
export const ScrollingWrapper = styled.div`
  height: 100%;
  display: flex;
  width: max-content;
  animation: ${scroll} ${(props) => props.animationDuration || 10}s linear
    infinite;
`;

// Recebe largura via prop
export const ScrollingText = styled.textarea.attrs({
  rows: 1,
  wrap: 'off',
})`
  width: ${(props) =>
    props.width ? `${props.width}px` : 'calc(100vw - 300px)'};
  height: 50px; /* altura igual à barra */
  line-height: 50px; /* centraliza verticalmente */

  overflow: hidden;
  overflow-x: hidden;
  overflow-y: hidden;

  border: none;
  outline: none;
  resize: none;

  white-space: nowrap;
  font-weight: 400;
  font-size: 18px;
  padding-right: 30px; /* espaço entre duplicações */

  text-transform: uppercase;
  background-color: transparent;
  color: #fff;

  &:focus {
    outline: none;
  }
`;
