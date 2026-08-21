import { useEffect, useMemo, useRef, useState } from 'react';
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
  SectionRight,
  SectionTitle,
  SectionDot,
  SectionBadge,
  CategorySearchBox,
  CategoryInput,
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

const copyText = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {}
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
};

const ComponentCard = ({ item, index }) => {
  const initialValues = (item.params || []).reduce(
    (acc, param) => ({ ...acc, [param.key]: param.default || '' }),
    {},
  );
  const [values, setValues] = useState(initialValues);
  const [copied, setCopied] = useState(false);
  const [inView, setInView] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '300px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const url = useMemo(() => buildUrl(item.path, values), [item.path, values]);

  const handleCopy = async () => {
    const ok = await copyText(url);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <Card
      ref={cardRef}
      style={{ animationDelay: `${Math.min(index * 40, 360)}ms` }}
    >
      <CardHeader>
        <CardTitle title={item.name}>{item.name}</CardTitle>
        <RouteTag title={url}>{item.path}</RouteTag>
      </CardHeader>

      <Preview>
        {inView ? (
          <PreviewFrame
            src={url}
            title={item.name}
            loading="lazy"
            scrolling="no"
          />
        ) : (
          <EmptyState>
            <FiLayers size={24} />
            Carregando preview...
          </EmptyState>
        )}
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
  const [categorySearch, setCategorySearch] = useState({});

  const setCategoryQuery = (title, query) => {
    setCategorySearch((prev) => ({ ...prev, [title]: query }));
  };

  const filteredGroups = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return GROUPS;

    return GROUPS.map((group) => {
      const titleMatch = group.title.toLowerCase().includes(query);

      return {
        ...group,
        items: titleMatch
          ? group.items
          : group.items.filter(
              (item) =>
                item.name.toLowerCase().includes(query) ||
                item.path.toLowerCase().includes(query),
            ),
      };
    }).filter((group) => group.items.length > 0);
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

        {filteredGroups.map((group, gi) => {
          const query = (categorySearch[group.title] || '').trim().toLowerCase();
          const items = query
            ? group.items.filter(
                (item) =>
                  item.name.toLowerCase().includes(query) ||
                  item.path.toLowerCase().includes(query),
              )
            : group.items;

          return (
            <Section key={group.title} style={{ animationDelay: `${gi * 60}ms` }}>
              <SectionHeader>
                <SectionTitle>
                  <SectionDot />
                  {group.title}
                </SectionTitle>
                <SectionRight>
                  <CategorySearchBox>
                    <FiSearch size={13} />
                    <CategoryInput
                      type="text"
                      placeholder="Buscar nesta categoria..."
                      value={categorySearch[group.title] || ''}
                      onChange={(e) =>
                        setCategoryQuery(group.title, e.target.value)
                      }
                    />
                  </CategorySearchBox>
                  <SectionBadge>
                    {items.length} componente{items.length === 1 ? '' : 's'}
                  </SectionBadge>
                </SectionRight>
              </SectionHeader>

              {items.length === 0 ? (
                <EmptyState>
                  <FiSearch size={28} />
                  Nenhum componente encontrado nesta categoria.
                </EmptyState>
              ) : (
                <Grid>
                  {items.map((item, i) => (
                    <ComponentCard key={item.path} item={item} index={i} />
                  ))}
                </Grid>
              )}
            </Section>
          );
        })}
      </Container>
    </Page>
  );
};

export default Testes;