import { useEffect, useState } from 'react';
import GameResult from '../gameResult'; // importa o componente pronto

const LiveScore = () => {
  const [dados, setDados] = useState(null);

  const horariosPermitidos = [
    '12:00',
    '12:30',
    '12:40',
    '18:00',
    '18:10',
    '18:20',
    '18:30',
    '18:40',
    '18:50',
    '19:00',
  ];

  const fetchDados = async () => {
    try {
      const response = await fetch(
        'https://api.api-futebol.com.br/v1/campeonatos/14/rodadas/33',
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer live_794f2c64379593df1ccf3bd66ab40d',
          },
        },
      );

      if (!response.ok)
        throw new Error('Erro na requisição: ' + response.status);

      const data = await response.json();
      console.log('🔄 Dados atualizados da API:', data);

      localStorage.setItem('dadosLiveScore', JSON.stringify(data));
      localStorage.setItem(
        'dadosLiveScoreUltimaAtualizacao',
        new Date().toISOString(),
      );
      setDados(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const deveAtualizarAgora = () => {
    const agora = new Date();
    const horaMinuto = agora.toTimeString().slice(0, 5);
    return horariosPermitidos.includes(horaMinuto);
  };

  useEffect(() => {
    const dadosLocal = localStorage.getItem('dadosLiveScore');

    if (dadosLocal) {
      setDados(JSON.parse(dadosLocal));
      console.log('📦 Dados carregados do localStorage');
    }

    if (!dadosLocal) {
      console.log('⚠️ Nenhum dado encontrado, buscando da API...');
      fetchDados();
    } else {
      const interval = setInterval(() => {
        if (deveAtualizarAgora()) {
          console.log('⏰ Horário permitido, atualizando dados...');
          fetchDados();
        }
      }, 60 * 1000);
      return () => clearInterval(interval);
    }
  }, []);

  if (!dados) {
    return <p style={{ padding: 20 }}>Carregando dados...</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      {dados.partidas?.map((jogo) => (
        <GameResult
          key={jogo.partida_id}
          TeamLogo1={jogo.time_mandante.escudo}
          TeamLogo2={jogo.time_visitante.escudo}
          TeamName1={jogo.time_mandante.nome_popular}
          TeamName2={jogo.time_visitante.nome_popular}
          HomeScore={jogo.placar_mandante}
          AwayScore={jogo.placar_visitante}
          Camp={jogo.campeonato?.nome || 'Brasileirão Série A'}
        />
      ))}
    </div>
  );
};

export default LiveScore;
