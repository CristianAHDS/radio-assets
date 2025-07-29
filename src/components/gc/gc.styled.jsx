import styled from 'styled-components';
import { secondary } from '../../constants/color';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GcTop = styled.div`
  background-color: ${secondary};
  padding: 10px 20px;
  display: inline-flex; /* <-- muda para inline-flex */
  align-items: center;
`;

export const TextMirror = styled.span`
  position: absolute;
  visibility: hidden;
  white-space: pre;
  font-size: 28px;
  font-weight: 600;
  text-transform: uppercase;
  font-family: inherit;
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
  display: inline-block; /* <-- impede ocupar 100% */

  &:focus {
    outline: none;
  }

  padding: 0px 30px 0px 0px;
`;

export const GcBottom = styled.div`
  width: auto;
  background-color: #f9f9f9;
  padding: 10px 20px;
  display: inline-flex; /* idem aqui */
  align-items: center;
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
  display: inline-block; /* impede ocupar largura total */
  transition: width 0.2s ease;

  padding: 0px 30px 0px 0px;

  &:focus {
    outline: none;
  }
`;

export const Logo = styled.img`
  height: 30px;

  filter: brightness(100);

  margin-right: 20px;
`;
