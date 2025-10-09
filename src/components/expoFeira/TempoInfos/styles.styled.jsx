import styled from 'styled-components';
import { primaryExpo } from '../../../constants/color';

export const Card = styled.div`
  background-color: transparent;
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
`;

export const MidleSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
`;

export const Temp = styled.div`
  width: 50%;
  height: 100%;

  border-radius: 15px;

  background-color: ${primaryExpo};

  font-size: 22px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 900;

  color: #fff;
`;

export const Icon = styled.div`
  width: 30%;
  height: 100%;

  background-color: transparent;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IconImage = styled.img`
  width: 80%;
`;
