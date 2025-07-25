import styled from 'styled-components';
import {
  primaryFenadoce,
  secondaryFenadoce,
  grayPrimary,
} from './constants/color';

export const Card = styled.div`
  width: 235px;
  height: 141px;

  background-color: #f9f9f9;

  display: flex;
  flex-direction: column;
`;

export const NameSection = styled.div`
  width: 100%;
  min-height: 25%;

  background-color: #fff;
  color: ${secondaryFenadoce};

  font-size: 24px;
  font-weight: bold;

  display: flex;
  justify-content: center;

  overflow: hidden;
  white-space: nowrap;
  position: relative;
`;

export const MidleSection = styled.div`
  width: 100%;
  min-height: 50%;

  display: flex;
  flex-direction: row;
`;

export const Temp = styled.div`
  width: 70%;
  height: 100%;

  background-color: ${primaryFenadoce};

  font-size: 34px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 900;

  color: #fff;
`;

export const Icon = styled.div`
  width: 30%;
  height: 100%;

  background-color: ${grayPrimary};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IconImage = styled.img`
  width: 80%;
`;

export const InfoSection = styled.div`
  width: 100%;
  min-height: 25%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${secondaryFenadoce};

  color: #fff;
  font-size: 18px;

  text-transform: uppercase;
`;
