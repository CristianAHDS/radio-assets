import {
  Container,
  Card,
  Title,
  IconContainer,
  ResultsContainer,
  IoIosFootball,
} from './results.styled.jsx';

const campLogo = 'https://i.imgur.com/e6onV8c.png';

const Results = () => {
  return (
    <Container>
      <Card>
        <Title>Resultados da Rodada</Title>
        <IconContainer>
          <IoIosFootball src={campLogo} />
        </IconContainer>
        <ResultsContainer />
      </Card>
    </Container>
  );
};

export default Results;
