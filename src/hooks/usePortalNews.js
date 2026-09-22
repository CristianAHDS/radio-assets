import { useEffect, useState } from 'react';

const NEWS_URL = `${window.location.origin}/.netlify/functions/news`;
const REFRESH_INTERVAL = 5 * 60 * 1000;

export const DEFAULT_NEWS_TEXT =
  'Mais da metade dos municípios da Zona Sul decretaram emergência • Pressionado, Brasil recebe o Aimoré no Bento Freitas • Leilão do Polo Rodoviário Pelotas está agendado para dezembro • Dor persistente não deve ser ignorada: reumatologista explica quando procurar avaliação • Estado se compromete a agilizar homologação de decretos da região • Homem de 28 anos é morto a tiros em Rio Grande • Líderes disparam na sexta rodada da Série A-2; fora do G-8, dupla Bra-Pel não perde posições • Mostra de Max Ziemer reúne charge e ironia no Caixeiral • Gabriel Morbeck espera reação do Xavante já contra o Aimoré: “A gente precisa reverter esta chave” • Defesa Civil nacional se instala na região Sul • Empresário, você se sente culpado por não produzir conteúdo? • O Teatro Frio, de Giorgio Ronna: um grupo de vanguarda estética e intelectual • Seu lugar no mundo • Para quem tem fé • O frágil ser humano • O espaço que ainda não ocuparam • BR-116 completa 14 anos de obras com 31 quilômetros ainda sem duplicação • Defesa Civil Nacional desenvolve ações na Zona Sul • Tabelinha eleitoral • Negócios na Expoagas 2026 chegam a R$ 830 milhões • Polícia Civil deflagra operação contra grupo investigado por extorsões • Cerrito decreta situação de emergência após chuvas intensas • “Grão tem uma proposta de linguagem cinematográfica diferente e isso é sempre um risco” • Prefeitura atualiza situação de escolas e UBSs nesta sexta-feira • Homem atropelado na Duque de Caxias morre após cinco dias no hospital •';

const joinTitles = (titles) => `${titles.map((t) => `  ${t}  `).join('•')} •`;

let inflight = null;

const fetchNews = () => {
  if (!inflight) {
    inflight = fetch(NEWS_URL, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .catch((err) => {
        inflight = null;
        throw err;
      })
      .then((data) => {
        inflight = null;
        return data;
      });
  }
  return inflight;
};

export const usePortalNews = () => {
  const [news, setNews] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await fetchNews();
        if (cancelled) return;
        if (data && Array.isArray(data.titles) && data.titles.length > 0) {
          setNews(joinTitles(data.titles));
        }
      } catch {
        // mantém o texto atual em caso de falha
      }
    };

    load();
    const interval = setInterval(load, REFRESH_INTERVAL);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return news;
};