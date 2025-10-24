import styled from 'styled-components';
import { primaryEstporte } from '../../../constants/color';

export const Container = styled.div`
  width: 500px;
  height: 55px;

  margin: 20px 0px;
`;

export const Top = styled.div`
  width: 100%;
  height: 60%;

  display: flex;
`;

export const TopLeft = styled.div`
  width: 35%;
  height: 100%;

  display: flex;
`;

export const TopCenter = styled.div`
  width: 25%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #3f3f3f;
`;

export const HomeScore = styled.div`
  width: 40px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const XScore = styled.div`
  width: 40px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #fff;

  color: #3f3f3f;
  font-weight: 700;
  font-size: 14pt;
`;

export const AwayScore = styled.div`
  width: 40px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TopRight = styled.div`
  width: 35%;
  height: 100%;

  display: flex;
`;

export const TeamLogo = styled.div`
  width: 25%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogoLeft = styled.img`
  width: 100%;

  margin-right: -20px;

  z-index: 100;
`;

export const LogoRight = styled.img`
  width: 100%;

  margin-left: -20px;

  z-index: 100;
`;

export const TeamName = styled.div`
  width: 75%;
  height: 100%;
  background-color: #fff;

  color: #3f3f3f;
  font-size: 12pt;
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Bottom = styled.div`
  width: 100%;
  height: 40%;

  display: flex;
  justify-content: center;
`;

export const BottomContent = styled.div`
  width: 60%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${primaryEstporte};
  font-weight: 500;
`;
