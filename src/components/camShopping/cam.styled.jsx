import styled from 'styled-components';
import { primary } from '../../constants/color';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 15px; /* espaço entre o Square e os blocos de texto */

  border-top-left-radius: 16px; 

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

`;


export const ContainerFrame = styled.div`
  width: 1368px;
  height: 900px;
`

export const VetorialLogo = styled.img`
  width: 100px;
  margin-right: 50px;
`

export const PelotenseLogo = styled.img`
  width: 130px;
  margin-right: 20px; 
`

export const Logos = styled.div`
  position: fixed;
  width: 1320px;
  height: 100px;

  top: 0;

  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

`
