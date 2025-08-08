import styled from 'styled-components';
import { primaryPensarNegocios } from '../../constants/color';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  width: 400px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;

  background-color: #f1f1f1;

  padding: 0px 10px;
`;

export const Title = styled.div`
  width: 100%;
  font-weight: 600;

  padding: 20px 0px 10px 0px;

  text-align: center;

  color: #3f3f3f;
`;

export const IconContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  padding: 10px 0px;

  color: #3f3f3f;
`;

export const IoIosFootball = styled.img`
  width: 40px;
`;

export const ResultsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  height: 300px;
`;
