import styled from 'styled-components';
import { primary } from '../../constants/color';

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 1375px;
  height: 118px;
  background-color: ${({ $bg }) => $bg || primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 18px 40px 0;
  overflow: hidden;
`;

export const TopBox = styled.div`
  position: relative;
  width: fit-content;
  max-width: calc(100% - 80px);
  background-color: ${({ $bg }) => $bg || '#0053bc'};
  padding: 4px 15px;
  display: flex;
  align-items: center;
`;

export const TextMirror = styled.span`
  position: absolute;
  visibility: hidden;
  white-space: pre;
  font-size: 30px;
  font-weight: 500;
  text-transform: uppercase;
  font-family: inherit;
`;

export const TextMirrorBottom = styled(TextMirror)`
  font-size: 48px;
  font-weight: 700;
`;

export const TopContainer = styled.textarea`
  height: 1.2em;
  resize: none;
  overflow: hidden;
  background-color: transparent;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: 30px;
  font-weight: 500;
  text-transform: uppercase;
  color: #fff;
  white-space: nowrap;
  padding-right: 40px !important;
  padding-left: 25px !important;
  &:focus {
    outline: none;
  }
`;

export const BottomContainer = styled.textarea`
  width: 100%;
  height: 1.2em;
  resize: none;
  overflow: hidden;
  background-color: transparent;
  border: none;
  padding: 0;
  font-family: inherit;
  font-size: 48px;
  font-weight: 700;
  text-transform: uppercase;
  color: #fff;
  white-space: nowrap;

  &:focus {
    outline: none;
  }
`;
