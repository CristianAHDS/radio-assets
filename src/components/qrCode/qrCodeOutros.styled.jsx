import styled from 'styled-components';
import { primaryOutros } from '../../constants/color';

export const Container = styled.div`
  width: 233px;
  height: 360px;

  background-color: #f9f9f9;

  display: flex;
  flex-direction: column;
`;

export const TextContainer = styled.div`
  width: 100%;
  height: 30%;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #3f3f3f;
  font-weight: 800;
  font-size: 22px;
`;

export const Logo = styled.img`
  width: 75%;
`;

export const QrCodeContainer = styled.div`
  width: 100%;
  height: 70%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Qr = styled.img`
  height: calc(100% - 30px);
`;

export const Sistema = styled.div`
  height: 50px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;

  margin-bottom: -10px;

  z-index: 100;
  font-size: 20px;
  color: #3f3f3f;
`;
