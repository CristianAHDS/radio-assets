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
  width: 680px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;

  background-color: #f5f7fb;

  background-image: url('https://i.imgur.com/l2Zb674.png');

  background-position: center;
  background-size: cover;

  padding: 0px 10px;
`;

export const Title = styled.div`
  width: 100%;
  font-weight: 700;
  font-size: 26px;

  padding: 20px 0px 10px 0px;

  text-align: center;

  color: #f5f7fb;
`;

export const IconContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 600;

  padding: 10px 0px;

  color: #f5f7fb;

  margin-bottom: 20px;
`;

export const IoIosFootball = styled.img`
  width: 40px;
  margin-right: 10px;
`;

export const ResultsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MatchesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Match = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  height: 80px;

  background-color: #e5e5e5;

  color: #505050;
  font-weight: 600;

  margin-bottom: 20px;
`;

export const Left = styled.div`
  width: 35%;
  height: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  text-transform: uppercase;
`;

export const Center = styled.div`
  width: 25%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  text-transform: uppercase;

  font-size: 24px;
`;

export const Right = styled.div`
  width: 35%;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  text-transform: uppercase;
`;

export const Name = styled.div``;
export const Logo = styled.img`
  width: 60px;
  margin: 0px 5px;
`;
