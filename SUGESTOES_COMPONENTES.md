# Sugestões de Novos Componentes

Documento de ideias para a suíte de overlays da Rádio Pelotense / A Hora do Sul.
As sugestões foram pensadas a partir do que **já existe** no projeto (rotas em `src/App.jsx`,
grupos em `src/pages/testes/groups.js`, assets em `src/assets` e integrações atuais).

Legenda de esforço:

- 🟢 Baixo — reaproveita componentes/hooks existentes
- 🟡 Médio — precisa de novo layout ou tratamento de dados
- 🔴 Alto — depende de API externa ou lógica mais complexa

Legenda de prioridade:

- ⭐⭐⭐ Impacto imediato no ar
- ⭐⭐ Complementa bem o que já existe
- ⭐ Experimental / depende de terceiros

---

## Sumário

| # | Componente | Rota sugerida | Esforço | Prioridade |
|---|------------|---------------|---------|------------|
| 1 | Rodapé de Patrocínio | `/patrocinio` | 🟡 | ⭐⭐⭐ |
| 2 | Ticker de Notícias (Breaking) | `/newsTicker` | 🟢 | ⭐⭐⭐ |
| 3 | Enquete ao Vivo + QR | `/enquete` | 🟡 | ⭐⭐⭐ |
| 4 | Contagem Regressiva | `/contagem` | 🟢 | ⭐⭐⭐ |
| 5 | Agora Tocando (automático) | `/nowPlaying` | 🔴 | ⭐⭐⭐ |
| 6 | Alertas Meteorológicos / Defesa Civil | `/alertaClima` | 🟡 | ⭐⭐ |
| 7 | Tábua de Marés / Nível do Rio | `/mare` | 🔴 | ⭐⭐ |
| 8 | Cotações Agro (dólar, soja, boi) | `/cotacoes` | 🟡 | ⭐⭐ |
| 9 | Agenda de Eventos / Shows | `/agenda` | 🟡 | ⭐⭐ |
| 10 | Aniversariantes do Dia | `/aniversariantes` | 🟢 | ⭐⭐ |
| 11 | Placar Rodada (multi-jogo) | `/placarRodada` | 🟡 | ⭐⭐ |
| 12 | Horóscopo do Dia | `/horoscopo` | 🟢 | ⭐⭐ |
| 13 | Programação Semanal (grade cheia) | `/gradeSemanal` | 🟡 | ⭐ |
| 14 | Cronômetro de Programa | `/tempoPrograma` | 🟢 | ⭐⭐ |
| 15 | Pix / Doação (QR) | `/pix` | 🟢 | ⭐ |
| 16 | Trânsito / Rodovias | `/transito` | 🔴 | ⭐ |
| 17 | Resultados de Loteria | `/loteria` | 🟡 | ⭐ |
| 18 | Comparativo de Pesquisas | `/pesquisas` | 🟡 | ⭐ |
| 19 | Rodapé Social Unificado | `/social` | 🟢 | ⭐ |
| 20 | Indicador "No ar há X min" | `/noArTempo` | 🟢 | ⭐ |

---

## 1. Rodapé de Patrocínio ⭐⭐⭐

**Rota:** `/patrocinio?programa=acorda-zona-sul&intervalo=8`

Existe a pasta `src/assets/PATROCINIOS` (ex.: `ACORDA_ZONA_SUL`, `CONEXÃO`) mas nenhum
overlay dedicado. Este componente exibe logos de patrocinadores em rotação automática,
numa barra inferior ou em cards.

- **Parâmetros:** `programa` (filtra a pasta), `intervalo` (segundos por logo), `ordem='aleatoria'`
- **Apresentações possíveis:** faixa contínua (crawler) ou grid que troca a cada N segundos
- **Reuso:** estrutura de `lower` + lógica de `setInterval` (como em `usePortalNews`)
- **Diferencial:** biblioteca de logos lida de `src/assets/PATROCINIOS`, sem trabalho manual

## 2. Ticker de Notícias (Breaking) ⭐⭐⭐

**Rota:** `/newsTicker?velocidade=60&cor=#e11d48`

Uma faixa de "última hora" com rolagem contínua, separada do `lowerTeste`. Hoje o hook
`usePortalNews` já entrega os títulos do portal — basta um layout focado só em manchetes.

- **Parâmetros:** `velocidade`, `cor`, `limite` (quantidade de manchetes)
- **Fonte:** `src/hooks/usePortalNews.js` (já pronto)
- **Reuso:** mesmo hook + animação via `motion`/`keyframes`
- **Extra:** variante "BREAKING" piscante para matérias urgentes

## 3. Enquete ao Vivo + QR ⭐⭐⭐

**Rota:** `/enquete?pergunta=Qual%20sua%20opinião?&opcoes=Sim,Não`

Mostra a pergunta, barras de porcentagem e um QR Code para o público votar (reaproveita
`react-qr-code`, já presente). Ideal para interação durante os programas.

- **Parâmetros:** `pergunta`, `opcoes` (separadas por vírgula), `resultados` (dados do backend)
- **Fonte:** função Netlify própria (ex.: `/.netlify/functions/enquete`)
- **Reuso:** `qrCode` + animação de barras similar ao `apuracao/progresso`

## 4. Contagem Regressiva ⭐⭐⭐

**Rota:** `/contagem?titulo=Voltamos%20já&segundos=120&modo=regressiva`

Conta regressiva (ou crescente) para intervalos, retorno ao ar, sorteios e eventos.

- **Parâmetros:** `titulo`, `segundos` ou `ate=2026-10-05T20:00:00`, `modo=regressiva|cronometro`
- **Reuso:** base de `clock` (hook de tempo) + tipografia já existente
- **Extra:** aviso visual nos últimos 10 segundos

## 5. Agora Tocando (automático) ⭐⭐⭐

**Rota:** `/nowPlaying?fonte=lastfm&estacao=pelotense`

Hoje o `GC Música` é preenchido manualmente. Um componente que busca a música atual
(Last.fm, metadados do stream ou Spotify) evita erro humano no ar.

- **Fonte:** API Last.fm / Icecast metadata / Spotify API
- **Parâmetros:** `fonte`, `estacao`
- **Reuso:** layout do `gcMusica` com dados dinâmicos
- **Observação:** requer chave de API e tratamento de falha (fallback manual)

## 6. Alertas Meteorológicos / Defesa Civil ⭐⭐

**Rota:** `/alertaClima?cidade=Pelotas`

A API `weatherapi.com` já é usada com `alerts=yes` em `geral.jsx`. Este componente
destaca somente alertas (chuva forte, vento, emergência) em tela cheia ou faixa.

- **Parâmetros:** `cidade`, `tipo=faixa|telaCheia`
- **Fonte:** `weatherapi.com` (chave já no projeto)
- **Reuso:** lógica de fetch de `geral.jsx`/`esporte.jsx`

## 7. Tábua de Marés / Nível do Rio ⭐⭐

**Rota:** `/mare?ponto=rio-grande`

Muito relevante para a Zona Sul (cheias, Lagoa dos Patos, Rio Grande). Exibe maré
alta/baixa e nível do rio.

- **Parâmetros:** `ponto` (ex.: `rio-grande`, `pelotas`, `lagoa`)
- **Fonte:** tábua da Marinha / CEPED/RS ou API de nível
- **Esforço:** depende de fonte pública estável

## 8. Cotações Agro (dólar, soja, boi) ⭐⭐

**Rota:** `/cotacoes?itens=dolar,soja,milho,boi`

O programa **Agro 360º** existe na grade e nos assets, mas não há overlay financeiro.
Barra com indicadores atualizados.

- **Parâmetros:** `itens` (lista), `ordem`, `variacao=on|off`
- **Fonte:** BCB (dólar) e CEPEA/ESALQ (soja, milho, boi)
- **Reuso:** layout de `tabela` + fetch periódico

## 9. Agenda de Eventos / Shows ⭐⭐

**Rota:** `/agenda?dias=7`

Lista de eventos culturais e shows da Zona Sul, ótimo para redes e patrocinadores.

- **Parâmetros:** `dias`, `categoria`
- **Fonte:** função Netlify ou dados em `src/constants`
- **Reuso:** cards de `programacao` + logos

## 10. Aniversariantes do Dia ⭐⭐

**Rota:** `/aniversariantes`

Faixa/cards com nomes de ouvintes aniversariantes, muito usado em programas de auditório.

- **Parâmetros:** `fonte`, `layout=faixa|carrossel`
- **Fonte:** função Netlify / planilha
- **Reuso:** animação de `carrosselCandidatos`

## 11. Placar Rodada (multi-jogo) ⭐⭐

**Rota:** `/placarRodada?campeonato=14&rodada=33`

A API `api-futebol.com.br` já é usada em `liveScore`. Este modo mostra vários jogos
da rodada simultaneamente em vez de um só.

- **Parâmetros:** `campeonato`, `rodada`, `destaque`
- **Reuso:** `esportes/liveScore` + `tabela`
- **Extra:** destaque para o jogo do time local

## 12. Horóscopo do Dia ⭐⭐

**Rota:** `/horoscopo?signo=peixes`

Card com o horóscopo diário, de preenchimento simples, bom para redes sociais.

- **Parâmetros:** `signo`, `texto`, `data`
- **Reuso:** `alert`/`gc` como base

## 13. Programação Semanal (grade cheia) ⭐

**Rota:** `/gradeSemanal`

A tela cheia com a grade de todos os dias (o `programacao` já tem os dados em
`FALLBACK_SCHEDULE` e a função Netlify).

- **Fonte:** `/.netlify/functions/programacao` (já pronto)
- **Reuso:** `programacao` + `getLogoByName` (`src/components/programacao/logos.js`)

## 14. Cronômetro de Programa ⭐⭐

**Rota:** `/tempoPrograma?programa=acorda-zona-sul`

Mostra há quanto tempo o programa está no ar e/ou quanto falta para o próximo.

- **Parâmetros:** `programa`, `modo=decorrido|restante`
- **Reuso:** `getSchedule`/`programacao` + `clock`

## 15. Pix / Doação (QR) ⭐

**Rota:** `/pix?chave=...&valor=`

QR Code para doações/apoio cultural, reaproveitando `react-qr-code`.

- **Parâmetros:** `chave`, `valor`, `texto`
- **Reuso:** `qrCode`

## 16. Trânsito / Rodovias ⭐

**Rota:** `/transito?br=116`

Faixa ou mapa com condições de trânsito (obras, bloqueios) da região Sul.

- **Fonte:** PRF / DAER-RS (dados públicos)
- **Esforço:** depende de fonte estável; pode começar com dados manuais

## 17. Resultados de Loteria ⭐

**Rota:** `/loteria?jogo=mega-sena`

Exibe dezenas sorteadas e acumulado.

- **Parâmetros:** `jogo`
- **Fonte:** API Caixa Loterias
- **Reuso:** `results`/`tabela`

## 18. Comparativo de Pesquisas ⭐

**Rota:** `/pesquisas?cargo=presidente`

Complementa a suíte de **Apuração de Votos** (`src/components/apuracao`) mostrando
intenção de voto por instituto.

- **Parâmetros:** `cargo`, `instituto`
- **Reuso:** `useEleicoes`/`useApuracao` + `carrosselCandidatos`

## 19. Rodapé Social Unificado ⭐

**Rota:** `/social?programa=geral`

Hoje Instagram e WhatsApp são componentes separados. Uma faixa única unindo
redes + portal economiza cenas no OBS.

- **Parâmetros:** `programa`, `redes=insta,whats,site`
- **Reuso:** `insta` + `whats` + `pin`

## 20. Indicador "No ar há X min" ⭐

**Rota:** `/noArTempo?desde=2026-10-05T18:00:00`

Complemento ao `noAr`/`rec`: mostra há quanto tempo a transmissão está no ar.

- **Parâmetros:** `desde` (timestamp) ou acumula via `localStorage`
- **Reuso:** `gravado/noAr` + `clock`

---

## Melhorias estruturais sugeridas (bônus)

- **Tema por programa:** `src/constants/color.jsx` já tem as cores. Centralizar num
  `theme` (cor + logo + nome) reduziria a duplicação entre dezenas de componentes
  (`gcX`, `clockX`, `lowerX`).
- **Hook `useOverlayParams`:** padronizar leitura de `nome`, `local`, `sub` via query
  string (hoje repetida em vários componentes).
- **Estado vazio/erro padrão:** componentes de API (clima, esportes, notícias) se
  beneficiam de um fallback visual único.
- **Grupo "Novos" em `groups.js`:** registrar as ideias aprovadas com `placeholder: true`
  para já aparecerem em `/testes` com card "em breve" (já suportado pelo componente).

## Ordem sugerida de implementação

1. Rodapé de Patrocínio (assets já existem)
2. Ticker de Notícias (hook já existe)
3. Enquete + QR (engajamento alto)
4. Contagem Regressiva
5. Agora Tocando (depende de API)
