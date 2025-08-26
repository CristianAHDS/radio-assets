import styled from 'styled-components';
import { primary } from '../../constants/color';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 15px; /* espaço entre o Square e os blocos de texto */
`;

export const Square = styled.div`
  width: 0px;
  height: 0px;
  background-color: #fff;
`;

export const GcWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const GcTop = styled.div`
  background-color: ${primary};
  padding: 10px 20px;
  display: flex;
  align-items: center;
  width: fit-content; /* ocupa toda a largura */
`;

export const TextMirror = styled.span`
  position: absolute;
  visibility: hidden;
  white-space: pre;
  font-size: 28px;
  font-weight: 600;
  text-transform: uppercase;
  font-family: inherit;

  text-align: right;
`;

export const TextContainerTop = styled.textarea`
  height: 1.2em;
  resize: none;
  overflow: hidden;
  background-color: transparent;
  border: none;
  font-size: 28px;
  font-weight: 600;
  text-transform: uppercase;
  color: #fff;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;

  text-align: right;

  &:focus {
    outline: none;
  }
`;


export const GcBottom = styled.div`
  background-color: #f9f9f9;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  width: fit-content;
  margin-right: 10px;
`;

export const TextMirrorBottom = styled(TextMirror)`
  font-size: 26px;
  font-weight: 500;
  color: #505050;
`;

export const TextContainer = styled.textarea`
  height: 1.2em;
  resize: none;
  overflow: hidden;
  background-color: transparent;
  border: none;
  font-size: 26px;
  color: #505050;
  white-space: nowrap;
  display: inline-block;
  transition: width 0.2s ease;
  padding: 0px 15px 0px 10px;

  &:focus {
    outline: none;
  }
`;


export const TextContainerBottom= styled.textarea`
  height: 1.2em;
  resize: none;
  overflow: hidden;
  background-color: transparent;
  border: none;
  font-size: 26px;

  text-transform: uppercase;
  color: #505050;
  white-space: nowrap;
  max-width: 100%;

  padding: 0px 15px 0px 10px;



  &:focus {
    outline: none;
  }
`;

export const Logo = styled.img`
  height: 30px;
  filter: brightness(100);
`;
