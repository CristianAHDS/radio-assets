import styled from 'styled-components';
import { primaryOutros } from '../../constants/color';

export const Card = styled.div`
  width: 235px;
  //height: 180px;

  background-color: #f9f9f9;

  display: flex;
  flex-direction: column;
`;

export const TopCard = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${primaryOutros};

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 900;
  font-size: 20px;
  color: #fff;
`;

export const CardLogos = styled.div`
  width: 100%;
  height: calc(100% - 50px);

  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Hora = styled.div`
  margin-left: 20px;
  font-size: 22px;

  font-weight: 400;

  color: #fff;
`;
