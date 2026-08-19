import { useMemo, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import {
  FiExternalLink,
  FiCopy,
  FiCheck,
  FiSearch,
  FiLayers,
  FiGrid,
  FiSliders,
  FiMonitor,
  FiZap,
  FiCalendar,
} from 'react-icons/fi';
import { GROUPS } from './groups';
import {
  Page,
  Container,
  Hero,
  HeroLeft,
  HeroTag,
  HeroTitle,
  HeroSubtitle,
  HeroRight,
  SearchBox,
  SearchIcon,
  SearchInput,
  DatePill,
  StatsGrid,
  StatCard,
  StatIcon,
  StatInfo,
  StatValue,
  StatLabel,
  Section,
  SectionHeader,
  SectionTitle,
  SectionDot,
  SectionBadge,
  Grid,
  Card,
  CardHeader,
  CardTitle,
  RouteTag,
  Preview,
  PreviewFrame,
  CardFooter,
  ParamsRow,
  ParamInput,
  Actions,
  PrimaryButton,
  GhostButton,
  EmptyState,
} from './testes.styled';

const buildUrl = (path, values) => {
  const params = Object.entries(values)
    .filter(([, value]) => value && value.trim() !== '')
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return `${window.location.origin}${path}${params ? `?${params}` : ''}`;
};

const TestesGlobalStyle = createGlobalStyle`
  body {
    display: block;
  }

  #root {
    width: 100%;
    min-height: 100vh;
  }
`;

const ComponentCard = ({ item, index }) => {
  const initialValues = (item.params || []).reduce(
    (acc, param) => ({ ...acc, [param.key]: param.default || '' }),
    {},
  );
  const [values, setValues] = useState(initialValues);
  const [copied, setCopied] = useState(false);

  const url = useMemo(() => buildUrl(item.path, values), [item.path, values]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Card style={{ animationDelay: `${Math.min(index * 40, 360)}ms` }}>
      <CardHeader>
        <CardTitle title={item.name}>{item.name}</CardTitle>
        <RouteTag title={url}>{item.path}</RouteTag>
      </CardHeader>

      <Preview>
        <PreviewFrame
          src={url}
          title={item.name}
          loading="lazy"
          scrolling="no"
        />
      </Preview>

      <CardFooter>
        {item.params && item.params.length > 0 && (
          <ParamsRow>
            {item.params.map((param) => (
              <ParamInput
                key={param.key}
                type="text"
                placeholder={param.label}
                value={values[param.key]}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    [param.key]: e.target.value,
                  }))
                }
              />
            ))}
          </ParamsRow>
        )}

        <Actions>
          <PrimaryButton as="a" href={url} target="_blank" rel="noreferrer">
            <FiExternalLink size={14} /> Abrir
          </PrimaryButton>
          <GhostButton type="button" onClick={handleCopy}>
            {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
            {copied ? 'Copiado' : 'Copiar URL'}
          </GhostButton>
        </Actions>
      </CardFooter>
    </Card>
  );
};

const Testes = () => {
  const [search, setSearch] = useState('');

  const filteredGroups = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return GROUPS;

    return GROUPS.map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.path.toLowerCase().includes(query),
      ),
    })).filter((group) => group.items.length > 0);
  }, [search]);

  const totalItems = useMemo(
    () => GROUPS.reduce((acc, group) => acc + group.items.length, 0),
    [],
  );

  const withParams = useMemo(
    () =>
      GROUPS.reduce(
        (acc, group) =>
          acc +
          group.items.filter((item) => item.params && item.params.length > 0)
            .length,
        0,
      ),
    [],
  );

  const scenesCount = useMemo(
    () =>
      GROUPS.filter((g) =>
        ['Cenas (Tempo)', 'Páginas', 'Grupo A Hora'].includes(g.title),
      ).reduce((acc, g) => acc + g.items.length, 0),
    [],
  );

  const today = useMemo(
    () =>
      new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    [],
  );

  const stats = [
    { label: 'Componentes', value: totalItems, icon: FiLayers, accent: '#6366f1' },
    { label: 'Categorias', value: GROUPS.length, icon: FiGrid, accent: '#38bdf8' },
    { label: 'Com Parâmetros', value: withParams, icon: FiSliders, accent: '#f59e0b' },
    { label: 'Cenas / Páginas', value: scenesCount, icon: FiMonitor, accent: '#10b981' },
  ];

  return (
    <Page>
      <TestesGlobalStyle />
      <Container>
        <Hero>
          <HeroLeft>
            <HeroTag>
              <FiZap size={12} /> OBS Assets
            </HeroTag>
            <HeroTitle>Testes de Componentes</HeroTitle>
            <HeroSubtitle>
              Visualize e teste todos os componentes da rádio ao vivo. Abra em
              tela cheia ou copie a URL para usar direto no OBS.
            </HeroSubtitle>
          </HeroLeft>

          <HeroRight>
            <SearchBox>
              <SearchIcon>
                <FiSearch size={15} />
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder="Buscar componente ou rota..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </SearchBox>
            <DatePill>
              <FiCalendar size={14} /> {today}
            </DatePill>
          </HeroRight>
        </Hero>

        <StatsGrid>
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <StatCard key={stat.label} $accent={stat.accent} style={{ animationDelay: `${i * 80}ms` }}>
                <StatIcon $accent={stat.accent}>
                  <Icon size={22} />
                </StatIcon>
                <StatInfo>
                  <StatValue>{stat.value}</StatValue>
                  <StatLabel>{stat.label}</StatLabel>
                </StatInfo>
              </StatCard>
            );
          })}
        </StatsGrid>

        {filteredGroups.length === 0 && (
          <EmptyState>
            <FiSearch size={28} />
            Nenhum componente encontrado para "{search}".
          </EmptyState>
        )}

        {filteredGroups.map((group, gi) => (
          <Section key={group.title} style={{ animationDelay: `${gi * 60}ms` }}>
            <SectionHeader>
              <SectionTitle>
                <SectionDot />
                {group.title}
              </SectionTitle>
              <SectionBadge>{group.items.length} componente{group.items.length === 1 ? '' : 's'}</SectionBadge>
            </SectionHeader>

            <Grid>
              {group.items.map((item, i) => (
                <ComponentCard key={item.path} item={item} index={i} />
              ))}
            </Grid>
          </Section>
        ))}
      </Container>
    </Page>
  );
};

export default Testes;