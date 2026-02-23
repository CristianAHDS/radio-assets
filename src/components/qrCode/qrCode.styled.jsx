import styled, { keyframes } from 'styled-components';
import { ahoraSecondary } from '../../constants/color';

const shadowAppear = keyframes`
  from {
    box-shadow: none;
  }
  to {
    box-shadow: ${ahoraSecondary} 10px 10px;
  }
`;

export const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const QrFrameContainer = styled.div`
  width: 250px;
  min-height: 400px;

  background-color: #fff;

  animation: ${shadowAppear} 0.3s ease forwards;
  animation-delay: 1s;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const QqText = styled.p`
  color: #505050;
  font-size: 28px;
  font-weight: 700;
`;
