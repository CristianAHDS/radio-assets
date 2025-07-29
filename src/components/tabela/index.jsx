import {
  Container,
  CardTabela,
  HeaderTable,
  HeaderLegends,
  LegendPo,
  LegendTeam,
  LegendResults,
  LegendGoals,
  LegendPoints,
  HeaderContent,
  RowContent,
  RowPo,
  RowContentClass,
  RowTeam,
  RowLogo,
  RowResults,
  RowGoals,
  RowPoints,
} from './tabela.styled.jsx';

const Tabela = () => {
  const genericLogo =
    'https://images.vexels.com/media/users/3/134354/isolated/preview/2ba2daf5ec6efb90183e8e67c3d2f7fe-etiqueta-do-emblema-escudo-brilhante-3d.png?w=360'; // imagem genérica do escudo

  return (
    <Container>
      <CardTabela>
        <HeaderTable>Brasileiro Serie D 2025, Group A8</HeaderTable>

        <HeaderLegends>
          <LegendPo>PO</LegendPo>
          <LegendTeam>TIME</LegendTeam>
          <LegendResults>W</LegendResults>
          <LegendResults>D</LegendResults>
          <LegendResults>L</LegendResults>
          <LegendGoals>GOLS</LegendGoals>
          <LegendPoints>PTS</LegendPoints>
        </HeaderLegends>

        <HeaderContent>
          <RowContentClass>
            <RowPo>1</RowPo>
            <RowTeam>
              <RowLogo src={genericLogo} alt="Escudo" />
              Barra FC
            </RowTeam>
            <RowResults>8</RowResults>
            <RowResults>2</RowResults>
            <RowResults>4</RowResults>
            <RowGoals>20 : 10</RowGoals>
            <RowPoints>26</RowPoints>
          </RowContentClass>

          <RowContentClass>
            <RowPo>2</RowPo>
            <RowTeam>
              <RowLogo src={genericLogo} alt="Escudo" />
              São José PA
            </RowTeam>
            <RowResults>7</RowResults>
            <RowResults>5</RowResults>
            <RowResults>3</RowResults>
            <RowGoals>21 : 11</RowGoals>
            <RowPoints>26</RowPoints>
          </RowContentClass>

          <RowContentClass>
            <RowPo>3</RowPo>
            <RowTeam>
              <RowLogo src={genericLogo} alt="Escudo" />
              Joinville
            </RowTeam>
            <RowResults>6</RowResults>
            <RowResults>3</RowResults>
            <RowResults>5</RowResults>
            <RowGoals>11 : 11</RowGoals>
            <RowPoints>21</RowPoints>
          </RowContentClass>

          <RowContentClass>
            <RowPo>4</RowPo>
            <RowTeam>
              <RowLogo src={genericLogo} alt="Escudo" />
              Marcilio Dias
            </RowTeam>
            <RowResults>5</RowResults>
            <RowResults>6</RowResults>
            <RowResults>3</RowResults>
            <RowGoals>17 : 15</RowGoals>
            <RowPoints>21</RowPoints>
          </RowContentClass>

          <RowContent>
            <RowPo>5</RowPo>
            <RowTeam>
              <RowLogo src={genericLogo} alt="Escudo" />
              Garany de Bagé
            </RowTeam>
            <RowResults>5</RowResults>
            <RowResults>4</RowResults>
            <RowResults>5</RowResults>
            <RowGoals>11 : 14</RowGoals>
            <RowPoints>19</RowPoints>
          </RowContent>

          <RowContent>
            <RowPo>6</RowPo>
            <RowTeam>
              <RowLogo src={genericLogo} alt="Escudo" />
              Brasil de Pelotas
            </RowTeam>
            <RowResults>5</RowResults>
            <RowResults>1</RowResults>
            <RowResults>8</RowResults>
            <RowGoals>11 : 12</RowGoals>
            <RowPoints>16</RowPoints>
          </RowContent>

          <RowContent>
            <RowPo>7</RowPo>
            <RowTeam>
              <RowLogo src={genericLogo} alt="Escudo" />
              São Luiz
            </RowTeam>
            <RowResults>4</RowResults>
            <RowResults>1</RowResults>
            <RowResults>9</RowResults>
            <RowGoals>10 : 20</RowGoals>
            <RowPoints>13</RowPoints>
          </RowContent>

          <RowContent>
            <RowPo>8</RowPo>
            <RowTeam>
              <RowLogo src={genericLogo} alt="Escudo" />
              Azuriz FC
            </RowTeam>
            <RowResults>3</RowResults>
            <RowResults>4</RowResults>
            <RowResults>7</RowResults>
            <RowGoals>6 : 14</RowGoals>
            <RowPoints>13</RowPoints>
          </RowContent>
        </HeaderContent>
      </CardTabela>
    </Container>
  );
};

export default Tabela;
