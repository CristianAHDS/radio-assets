import styled from 'styled-components';
import { primaryMisturaBoa } from '../../constants/color';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GcTop = styled.div`
  background-color: ${primaryMisturaBoa};
  display: inline-flex;
  align-items: center;
  position: fixed;
  right: 0;
  top: 0;
  padding: 0px 20px;
  height: 50px;
`;

export const TextMirror = styled.span`
  position: absolute;
  visibility: hidden;
  white-space: pre;
  font-size: 26px;
  font-weight: 600;
  text-transform: uppercase;
  font-family: inherit;
  direction: rtl;
  text-align: right;
`;

export const TextContainerTop = styled.textarea`
  height: 1.2em;
  resize: none;
  overflow: hidden;
  background-color: transparent;
  border: none;
  font-size: 26px;
  font-weight: 600;
  text-transform: uppercase;
  color: #fff;
  white-space: nowrap;
  display: inline-block;

  text-align: right;

  padding: 0px 0px 0px 10px;

  &:focus {
    outline: none;
  }
`;
