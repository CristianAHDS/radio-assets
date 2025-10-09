import styled from 'styled-components';
import { primaryMistura } from '../../../constants/color';

export const Container = styled.div`
  width: 180px;
  height: 105px;

  background-color: #fff;

  display: flex;
  flex-direction: column;

  border-radius: 15px !important;

  position: fixed;
  bottom: 0;
  left: 0;

  margin: 10px 10px;
`;

export const LogoContainer = styled.div`
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 100%;
  height: 75px;
  background-color: #fff;

  color: #3f3f3f;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogoImage = styled.img`
  width: 100%;
`;

export const ClockContainer = styled.div`
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  width: 100%;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${primaryMistura};

  color: #fff;
  font-size: 14px;
`;

export const SubContainer = styled.div`
  width: 85%;
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: ${primaryMistura};

  color: #fff;
  font-size: 14px;
`;

export const Hora = styled.div`
  font-size: 18px;
  font-weight: 400;

  color: #fff;
`;
