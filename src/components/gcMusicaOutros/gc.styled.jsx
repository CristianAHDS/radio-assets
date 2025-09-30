import styled from 'styled-components';
import { primaryOutros } from '../../constants/color';

export const Container = styled.div`
    width: 100vw;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: flex-end;
`;

export const GcTop = styled.div`
  background-color: ${primaryOutros};
  padding: 10px 20px;
  display: inline-flex;
  align-items: center;
  position: fixed;
  height: 33px !important;
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
  display: inline-block;

  text-align: right;

  padding: 0px 00px 0px 10px;

  &:focus {
    outline: none;
  }
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
  padding: 0px 30px 0px 0px;

  &:focus {
    outline: none;
  }
`;

export const Logo = styled.img`
  margin-right: -5px;
  margin-left: -10px;
  height: 70px;
  filter: brightness(100);
`;
