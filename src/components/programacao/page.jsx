import { createGlobalStyle } from 'styled-components';
import Programacao from './index';
import { Wrapper } from './programacao.styled';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    height: 100%;
    background: transparent;
    overflow: hidden;
  }
`;

const ProgramacaoPage = ({ colors }) => (
  <>
    <GlobalStyle />
    <Wrapper>
      <Programacao colors={colors} />
    </Wrapper>
  </>
);

export default ProgramacaoPage;