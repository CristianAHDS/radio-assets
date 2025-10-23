import {
  Container,
  Top,
  TopLeft,
  TopCenter,
  HomeScore,
  XScore,
  AwayScore,
  TopRight,
  Bottom,
  BottomContent,
  TeamLogo,
  TeamName,
  LogoLeft,
  LogoRight,
} from './styles.styled.jsx';

const defaultLogo =
  'https://png.pngtree.com/png-clipart/20241221/original/pngtree-football-team-logo-vector-png-image_18123638.png';

const GameResult = (props) => {
  return (
    <Container>
      <Top>
        <TopLeft>
          <TeamLogo>
            <LogoLeft src={props.TeamLogo2 || defaultLogo} alt="Logo" />
          </TeamLogo>
          <TeamName>{props.TeamName1 || 'Time 1'}</TeamName>
        </TopLeft>
        <TopCenter>
          <HomeScore>{props.HomeScore || 0}</HomeScore>
          <XScore>X</XScore>
          <AwayScore>{props.AwayScore || 0}</AwayScore>
        </TopCenter>
        <TopRight>
          <TeamName>{props.TeamName2 || 'Time 2'}</TeamName>
          <TeamLogo>
            <LogoRight src={props.TeamLogo2 || defaultLogo} alt="Logo" />
          </TeamLogo>
        </TopRight>
      </Top>
      <Bottom>
        <BottomContent>{props.Camp || 'Brasileirão'}</BottomContent>
      </Bottom>
    </Container>
  );
};

export default GameResult;
