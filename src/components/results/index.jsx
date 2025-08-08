import {
  Container,
  Card,
  Title,
  IconContainer,
  ResultsContainer,
  IoIosFootball,
  MatchesContainer,
  Match,
  Left,
  Center,
  Right,
  Name,
  Logo,
} from './results.styled.jsx';

const campLogo = 'https://i.imgur.com/e6onV8c.png';

import { FaRegClock } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import { TbLivePhoto } from 'react-icons/tb';

const Results = () => {
  return (
    <Container>
      <Card>
        <Title>Resultados da Rodada</Title>
        <IconContainer>
          <IoIosFootball src={campLogo} /> Colonial
        </IconContainer>
        <MatchesContainer>
          {/* 1 */}
          <Match>
            <Left>
              <Name>Sanga Funda</Name>
              <Logo src="https://i.pinimg.com/originals/18/09/fb/1809fbb39f9dafa381397959ab53b7a1.png" />
            </Left>
            <Center>
              0 - 0<TbLivePhoto style={{ fontSize: 30, color: '#ff9671' }} />
            </Center>
            <Right>
              <Logo src="https://i.pinimg.com/originals/18/09/fb/1809fbb39f9dafa381397959ab53b7a1.png" />
              <Name>Arroio do Padre</Name>
            </Right>
          </Match>
          {/* 2 */}
          <Match>
            <Left>
              <Name>Concórdia </Name>
              <Logo src="https://i.pinimg.com/originals/18/09/fb/1809fbb39f9dafa381397959ab53b7a1.png" />
            </Left>
            <Center>
              0 - 0<FaCheck style={{ color: '#49ad7d' }} />
            </Center>
            <Right>
              <Logo src="https://i.pinimg.com/originals/18/09/fb/1809fbb39f9dafa381397959ab53b7a1.png" />
              <Name>Santa Irene</Name>
            </Right>
          </Match>
          {/* 3 */}
          <Match>
            <Left>
              <Name>Independente </Name>
              <Logo src="https://i.pinimg.com/originals/18/09/fb/1809fbb39f9dafa381397959ab53b7a1.png" />
            </Left>
            <Center>
              15 : 30
              <FaRegClock style={{ fontSize: 22 }} />
            </Center>
            <Right>
              <Logo src="https://i.pinimg.com/originals/18/09/fb/1809fbb39f9dafa381397959ab53b7a1.png" />
              <Name>Vila Nova</Name>
            </Right>
          </Match>
        </MatchesContainer>
        <ResultsContainer />
      </Card>
    </Container>
  );
};

export default Results;
