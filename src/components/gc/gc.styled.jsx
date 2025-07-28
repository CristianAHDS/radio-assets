import styled, { keyframes } from 'styled-components';
import { primary, secondary } from '../../constants/color';

export const Container = styled.div`
  width: 80vw;
  height: 180px;

  display: flex;
  flex-direction: column;
`;

export const GcTop = styled.div`
  width: 68%;
  height: 50px;

  background-color: ${secondary};

  padding-left: 20px;

  display: flex;
  align-items: center;
`;

export const TextContainerTop = styled.textarea`
  width: 100%;
  height: 100%;

  margin-top: 15px;

  background-color: transparent;
  border: none;
  vertical-align: middle;

  display: flex;
  align-items: center;

  font-size: 28px;
  font-weight: 600;

  text-transform: uppercase;

  color: #fff;

  &:focus {
    outline: none;
  }
`;

export const GcBottom = styled.div`
  width: 78%;
  height: calc(80% - 50px);

  background-color: #f9f9f9;

  padding-left: 20px;

  display: flex;
  align-items: center;

  color: #505050;

  font-size: 22px;
  font-weight: 500;
  border: none;
  outline: none;
  resize: none; /* opcional: remove o controle de redimensionamento */
`;

export const TextContainer = styled.textarea`
  width: 100%;

  margin-top: 15px;

  background-color: transparent;
  border: none;
  vertical-align: middle;
  color: #505050;

  font-size: 26px;
  border: none;
  outline: none;
  resize: none;

  &:focus {
    outline: none;
  }
`;
