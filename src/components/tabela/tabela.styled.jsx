import styled from 'styled-components';
import { primary, secondary } from '../../constants/color';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  color: #505050;
`;

export const CardTabela = styled.div`
  background-color: #f5f7fb;
  padding-bottom: 8px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
`;

export const HeaderTable = styled.div`
  width: 100%;
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;
  font-weight: bold;

  border-bottom: solid 2px #0028641f;
`;

export const HeaderLegends = styled.div`
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  padding: 0px 0px 0px 20px;

  font-size: 20px;
  font-weight: 600;

  border-bottom: solid 1px #0028641f;
  background: #eef1f7;
`;

export const LegendPo = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #9aa0ac;
`;

export const LegendTeam = styled.div`
  min-width: 240px;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #9aa0ac;
`;

export const LegendResults = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #9aa0ac;
`;

export const LegendGoals = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #9aa0ac;
`;

export const LegendPoints = styled.div`
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #9aa0ac;
`;

export const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 20px;
`;

/* ---- LINHAS DA TABELA ---- */
export const RowContent = styled.div`
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  padding: 0px 20px;
  border-bottom: solid 1px #0028641f;

  &:nth-child(even) {
    background-color: #f0f3f8; /* cor alternada para zebra */
  }

  border-left: solid 8px transparent;
`;

export const RowPo = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
  font-weight: 600;
`;

export const RowContentClass = styled.div`
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  padding: 0px 20px;
  border-bottom: solid 1px #0028641f;

  &:nth-child(even) {
    background-color: #f0f3f8; /* cor alternada para zebra */
  }

  border-left: solid 8px #85c020;
`;

export const RowTeam = styled.div`
  min-width: 240px;
  width: fit-content;
  display: flex;
  align-items: center;
  font-weight: 500;

  color: #505050;
`;

export const RowResults = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
  color: #505050;
`;

export const RowGoals = styled.div`
  width: 100px;
  display: flex;
  align-items: center;

  color: #505050;
`;

export const RowPoints = styled.div`
  width: 40px;
  display: flex;
  align-items: center;
  font-weight: bold;
  color: ${primary};
`;

export const RowLogo = styled.img`
  width: 35px;

  margin-right: 15px;
  object-fit: cover;
`;
