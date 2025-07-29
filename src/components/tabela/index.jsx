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
              <RowLogo
                src="https://barrafc.com.br/wp-content/uploads/2025/04/logo-barra-official-01-690x900.png"
                alt="Escudo"
              />
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
              <RowLogo
                src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Esporte_Clube_S%C3%A3o_Jos%C3%A9_logo.png"
                alt="Escudo"
              />
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
              <RowLogo
                src="https://jec.com.br/wp-content/smush-webp/2024/01/cropped-Logo-Joinville.png.webp"
                alt="Escudo"
              />
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
              <RowLogo
                src="https://images.seeklogo.com/logo-png/21/2/clube-nautico-marcilio-dias-logo-png_seeklogo-219083.png"
                alt="Escudo"
              />
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
              <RowLogo
                src="https://images.seeklogo.com/logo-png/6/2/guarany-futebol-clube-de-bage-rs-logo-png_seeklogo-64019.png"
                alt="Escudo"
              />
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
              <RowLogo
                src="https://logodownload.org/wp-content/uploads/2017/02/ge-gremio-esportivo-brasil-logo.png"
                alt="Escudo"
              />
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
              <RowLogo
                src="https://upload.wikimedia.org/wikipedia/pt/a/aa/EC_S%C3%A3o_Luiz.svg"
                alt="Escudo"
              />
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
              <RowLogo
                src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Azuriz_FC.png"
                alt="Escudo"
              />
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
