# Identidade Visual & Nome — Sistema de Overlays para OBS

> Sistema genérico de assets/overlays para **rádios e programas ao vivo no YouTube**.
> Este documento propõe nome, conceito, paleta, tipografia, logo e diretrizes de UI.

---

## 1. NOME DO SISTEMA

### Recomendação principal

## **ONDA** — _Overlays para transmissão ao vivo_

**Por quê:**

- "Onda" referencia diretamente **rádio** (ondas hertzianas) e **live/audiência** (onda de público).
- Curto, fácil de falar, funciona bem como marca (onda.studio, onda.tv).
- Neutro e genérico: serve para rádio, podcast, YouTube e qualquer produtor.
- Permite um símbolo gráfico forte (linhas de sinal que se transformam em UI).

### Tagline / slogans possíveis

- **"Sua transmissão, com identidade."**

### Naming dos módulos (coerência de produto)

- **Onda Studio** — o app/painel (página de testes/gerenciador).
- **Onda Cast** — overlay de GC/nome (locutor).
- **Onda Lower** — lower thirds.
- **Onda Wave** — relógio/tempo.
- **Onda Live** — selos de gravação/REC/no ar.

---

## 2. CONCEITO CRIATIVO

**"Do som para a imagem."** A identidade traduz a ideia de **sinal que vira imagem**:
linhas de onda (áudio) se transformam em elementos de interface (formas geométricas,
grades, barras de lower third).

**Palavras-chave de direção de arte:**
`estúdio · sinal · grade · ao vivo · movimento · contraste · premium · legível`

**Princípios:**

1. **Pronto para o ar** — visual com cara de estúdio profissional (dark UI, brilho sutil).
2. **Legibilidade em vídeo** — overlays com alto contraste, pensados para YouTube.
3. **Neutro e tematizável** — base visual própria, mas cada programa define sua cor.
4. **Consistência** — regras claras de cor, forma, tipografia e movimento.

---

## 3. PALETA DE CORES

### Cores de marca (base genérica)

| Token                | Hex                     | Uso                                               |
| -------------------- | ----------------------- | ------------------------------------------------- |
| `--onda-primary`     | `#5B5BF6`               | Cor principal (indigo elétrico) — CTAs, destaques |
| `--onda-primary-600` | `#4646E0`               | Hover / estados                                   |
| `--onda-ink`         | `#0B0E17`               | Fundo escuro principal (UI do Studio)             |
| `--onda-surface`     | `#151A28`               | Superfícies/cards                                 |
| `--onda-elevated`    | `#1E2536`               | Cards em destaque, modais                         |
| `--onda-text`        | `#EDF0F7`               | Texto principal sobre escuro                      |
| `--onda-muted`       | `#8B93A7`               | Texto secundário                                  |
| `--onda-line`        | `rgba(255,255,255,.08)` | Bordas/divisores                                  |

### Cores funcionais

| Token             | Hex                   | Uso                                  |
| ----------------- | --------------------- | ------------------------------------ |
| `--live`          | `#FF3B4E`             | "AO VIVO" / REC / urgência           |
| `--live-glow`     | `rgba(255,59,78,.45)` | Brilho pulsante do indicador ao vivo |
| `--success`       | `#22C55E`             | Online/OK, "no ar"                   |
| `--warning`       | `#F5A524`             | Alertas/atenção                      |
| `--info`          | `#38BDF8`             | Informação/links                     |
| `--accent-violet` | `#A46DFF`             | Gradiente/apoio                      |

### Gradiente de marca (sinal → imagem)

```css
--onda-gradient: linear-gradient(135deg, #5b5bf6 0%, #a46dff 55%, #38bdf8 100%);
```

### Paletas de tema por programa (overlays)

Cada programa recebe um par `primary` + `primary-dark` para GC, lower e let:

```js
export const THEMES = {
  default: { primary: '#5B5BF6', dark: '#3B3BB8' },
  noticias: { primary: '#2563EB', dark: '#1E4FBF' },
  esporte: { primary: '#16A34A', dark: '#0F7A37' },
  cultura: { primary: '#A46DFF', dark: '#7E4ACB' },
  musica: { primary: '#F5A524', dark: '#C97F0F' },
  alarme: { primary: '#FF3B4E', dark: '#C42636' },
};
```

**Acessibilidade:** texto de overlay sempre em `#FFFFFF` sobre cor sólida; garantir
contraste mínimo AA (4.5:1) e adicionar leve sombra/contorno em textos sobre transparência.

---

## 4. TIPOGRAFIA

| Papel                   | Fonte                          | Fallback              | Motivo                                      |
| ----------------------- | ------------------------------ | --------------------- | ------------------------------------------- |
| **Display/Títulos**     | **Sora** ou **Space Grotesk**  | Montserrat, system-ui | Geométrica, técnica, ótima para marca       |
| **UI/Texto**            | **Inter**                      | Montserrat, Arial     | Legibilidade máxima em telas pequenas       |
| **Overlays (nomes/GC)** | **Montserrat** (Bold/SemiBold) | Arial Black           | Já usada no projeto, muito legível em vídeo |
| **Números/relógio**     | **Inter** ou tabular nums      | —                     | Alinhamento estável do relógio              |

**Pesos:** 400 (texto), 500 (subtítulos), 600 (GC/nome), 700/800 (títulos e marca).

**Regras:**

- Overlay de nome: sempre **UPPERCASE**, `font-weight: 600–800`, `letter-spacing: .02em`.
- Corpo do Studio: `16px`, `line-height: 1.5`.
- Nunca usar mais de **2 famílias** por tela.

---

## 5. LOGO E SÍMBOLO

### Conceito do símbolo

Ícone formado por **três arcos/ondas concêntricos** (sinal de rádio) cujo traço se
transforma em uma **barra de lower third** retangular — unindo "sinal" e "overlay".

### Variações

1. **Símbolo** — arcos + barra (usar em favicon, avatar, canto da UI).
2. **Wordmark** — "ONDA" em Sora/Space Grotesk Bold, com o arco substituindo o "O".
3. **Lockup** — símbolo + "ONDA" + "STUDIO" pequeno acima.
4. **Monocromático** — versão branca (sobre overlays) e preta (documentos).

### Usos e clear space

- Área de respiro: altura do símbolo / 2 em todos os lados.
- Tamanho mínimo: 24px (símbolo), 120px (lockup).
- Sobre overlay transparente: sempre usar versão **branca com glow sutil**.

### Aplicação "AO VIVO"

Selos com ponto vermelho pulsante + texto `AO VIVO` (uppercase, bold).
Componente: `<LiveBadge />` com animação de pulso.

---

## 6. ICONOGRAFIA

- Biblioteca: **react-icons** (`Fi*` para UI, `Fa*` para marcas sociais).
- Estilo: **outline** (traço 1.5–2px), cantos arredondados, tamanho base 20–24px.
- Ícones-assinatura: onda de sinal, ponto ao vivo, relógio, alfinete de local,
  microfone, câmera, QR, coração/engajamento.
- Agrupamento por cor de categoria (mesma lógica de `accent` do catálogo).

---

## 7. ESTILO DE UI (Onda Studio)

Direção: **dark, técnico, premium** com toques de glassmorphism e neon sutil.

- **Fundo:** `--onda-ink` com grade sutil (`background-image` de linhas 1px em
  `rgba(255,255,255,.03)`) e um _glow_ radial da cor primária no topo.
- **Cards:** `--onda-surface`, borda `--onda-line`, `border-radius: 16px`.
- **Elevação:** sombras suaves `0 10px 30px rgba(0,0,0,.35)`.
- **Glass:** `backdrop-filter: blur(12px)` em nav/toolbar.
- **Estados:** borda/brilho primário no hover; foco acessível visível.
- **Categorias:** cada grupo usa uma cor `accent` (dot + badge) — como na página de testes atual.
- **Preview dos overlays:** moldura tipo "monitor de estúdio", fundo quadriculado
  (checkerboard) para evidenciar transparência, com selo de resolução `1920×1080`.

### Tokens CSS de exemplo

```css
:root {
  --onda-primary: #5b5bf6;
  --onda-ink: #0b0e17;
  --onda-surface: #151a28;
  --onda-text: #edf0f7;
  --onda-muted: #8b93a7;
  --onda-live: #ff3b4e;
  --onda-line: rgba(255, 255, 255, 0.08);
  --radius: 16px;
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  --font-display: 'Sora', 'Space Grotesk', Montserrat, sans-serif;
  --font-ui: 'Inter', Montserrat, sans-serif;
}
```

---

## 8. MOVIMENTO (MOTION)

- **Micro-interações:** 120–200ms ease-out (hover, foco).
- **Entradas de conteúdo:** fade + slide vertical de 8–12px, 400–700ms.
- **Relógio/troca de cena:** crossfade (`AnimatePresence`, framer-motion).
- **Selos ao vivo:** pulso contínuo de opacidade/glow no ponto vermelho.
- **Lower:** rolagem contínua (marquee) com velocidade proporcional ao texto.
- **Preview carregando:** spinner em arco (mesmo motivo do logo).

---

## 9. DIRETRIZES PARA OS OVERLAYS (VÍDEO)

- **Safe area:** manter elementos de texto a 5% das bordas (65px em 1920 / 36px em 1080).
- **Contraste:** textos sobre fundo transparente recebem fundo sólido ou leve
  `text-shadow` para garantir leitura sobre qualquer cena.
- **Consistência de altura:** GC ~44–52px, lower ~64–80px, selos ~36–44px.
- **Cantos:** arredondamento discreto (8–12px) ou barra reta com "cauda" de sinal.
- **Cores:** usar o tema do programa; nunca misturar temas na mesma cena.

---

## 10. APLICAÇÕES

| Peça                        | Direção                                                             |
| --------------------------- | ------------------------------------------------------------------- |
| **Landing page**            | Hero escuro com gradiente de sinal, mockup de estúdio, CTA primário |
| **Onda Studio (`/testes`)** | Dark UI, cards com preview em moldura, QuickNav lateral             |
| **Overlays**                | Fundo transparente, tipografia uppercase, cores do tema             |
| **Documentação/README**     | Fundo claro opcional, wordmark preto, blocos de código em indigo    |
| **Redes sociais**           | Capa com ondas + gradiente; avatar com o símbolo                    |

---

## 11. RESUMO EXECUTIVO

- **Nome:** **ONDA** — _Overlays para transmissão ao vivo_.
- **Símbolo:** arcos de sinal que se tornam barra de lower third.
- **Cor principal:** indigo `#5B5BF6`; **"ao vivo":** vermelho `#FF3B4E`.
- **Fundo:** escuro `#0B0E17` com grade sutil e glow.
- **Tipografia:** Sora/Space Grotesk (display) + Inter (UI) + Montserrat (overlays).
- **Tom:** estúdio, sinal, grade, ao vivo, premium e legível em vídeo.
