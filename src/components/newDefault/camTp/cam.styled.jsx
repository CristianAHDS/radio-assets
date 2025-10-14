import styled from 'styled-components';
import { primary, secondary} from '../../../constants/color';

export const Container = styled.div`


  display: flex;
  justify-content: center;
  align-items: flex-end;

  width: 100vw;
  height: 90vh;

  color: #fff;

  border-radius: 15px;`;

export const TextContainer = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;

  
`;

export const VetorialSide = styled.div`
  width: 140px;
  height: 100%;
  background-color: ${secondary};

  padding: 0px 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
`;

export const Logo = styled.img`
  width: 90%;
`;

export const LocateText = styled.div`
  background-color: ${primary};
  display: flex;
  align-items: center;
  padding: 0px 20px;
  font-weight: 700;

  font-size: 19px;

  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`