import { useEffect, useMemo, useState } from 'react';
import {
  Bar,
  LabelBlock,
  LabelText,
  LabelDot,
  ProgramBlock,
  NextProgramBlock,
  AccentRule,
  ProgramName,
  ProgramLogo,
  ProgramTime,
  TimeLabel,
  Block,
} from './programacao.styled';
import { getLogoByName } from './logos';

const SCHEDULE_URL = `${window.location.origin}/.netlify/functions/programacao`;
const STORAGE_KEY = 'programacaoSchedule';

const DAY_KEYS = [
  'domingo',
  'segunda',
  'terca',
  'quarta',
  'quinta',
  'sexta',
  'sabado',
];

const FALLBACK_SCHEDULE = {
  segunda: [
    { time: '00:00', name: 'Programação Rádio Pelotense' },
    { time: '05:00', name: 'Agro 360º' },
    { time: '06:00', name: 'Acorda Zona Sul' },

    { time: '09:00', name: 'Debate Regional' },
    { time: '11:00', name: 'Conexão' },
    { time: '12:00', name: 'Resenha Esportiva' },
    { time: '13:10', name: 'Passado a Limpo' },
    { time: '15:00', name: 'Jornal da Tarde' },
    { time: '17:00', name: 'Última Hora' },
    { time: '19:00', name: 'Atualidades Esportivas' },
    { time: '20:00', name: 'Versão Brasileira' },
    { time: '21:00', name: 'A Voz do Brasil' },
    { time: '22:00', name: 'Programação Rádio Pelotense' },
  ],
  terca: [
    { time: '00:00', name: 'Programação Rádio Pelotense' },
    { time: '05:00', name: 'Agro 360°' },
    { time: '06:00', name: 'Acorda Zona Sul' },
    { time: '09:00', name: 'Debate Regional' },
    { time: '11:00', name: 'Conexão' },
    { time: '12:00', name: 'Resenha Esportiva' },
    { time: '13:10', name: 'Passado a Limpo' },
    { time: '15:00', name: 'Jornal da Tarde' },
    { time: '17:00', name: 'Passado a Limpo' },
    { time: '19:00', name: 'Atualidades Esportivas' },
    { time: '20:00', name: 'Versão Brasileira' },
    { time: '21:00', name: 'A Voz do Brasil' },
    { time: '22:00', name: 'Programação Rádio Pelotense' },
  ],
  quarta: [
    { time: '00:00', name: 'Programação Rádio Pelotense' },
    { time: '05:00', name: 'Agro 360°' },
    { time: '06:00', name: 'Acorda Zona Sul' },
    { time: '09:00', name: 'Debate Regional' },
    { time: '11:00', name: 'Conexão' },
    { time: '12:00', name: 'Resenha Esportiva' },
    { time: '13:10', name: 'Passado a Limpo' },
    { time: '15:00', name: 'Jornal da Tarde' },
    { time: '17:00', name: 'Última Hora' },
    { time: '19:00', name: 'Atualidades Esportivas' },
    { time: '20:00', name: 'Versão Brasileira' },
    { time: '21:00', name: 'A Voz do Brasil' },
    { time: '22:00', name: 'Programação Rádio Pelotense' },
  ],
  quinta: [
    { time: '00:00', name: 'Programação Rádio Pelotense' },
    { time: '05:00', name: 'Agro 360°' },
    { time: '06:00', name: 'Acorda Zona Sul' },
    { time: '09:00', name: 'Debate Regional' },
    { time: '11:00', name: 'Conexão' },
    { time: '12:00', name: 'Resenha Esportiva' },
    { time: '13:10', name: 'Passado a Limpo' },
    { time: '15:00', name: 'Jornal da Tarde' },
    { time: '17:00', name: 'Última Hora' },
    { time: '19:00', name: 'Atualidades Esportivas' },
    { time: '20:00', name: 'Versão Brasileira' },
    { time: '21:00', name: 'A Voz do Brasil' },
    { time: '22:00', name: 'Programação Rádio Pelotense' },
  ],
  sexta: [
    { time: '00:00', name: 'Programação Rádio Pelotense' },
    { time: '05:00', name: 'Agro 360º' },
    { time: '06:00', name: 'Acorda Zona Sul' },
    { time: '09:00', name: 'Debate Regional' },
    { time: '11:00', name: 'Conexão' },
    { time: '12:00', name: 'Resenha Esportiva' },
    { time: '13:10', name: 'Passado a Limpo' },
    { time: '15:00', name: 'Jornal da Tarde' },
    { time: '17:00', name: 'Última Hora' },
    { time: '19:00', name: 'Atualidades Esportivas' },
    { time: '20:00', name: 'Versão Brasileira' },
    { time: '21:00', name: 'A Voz do Brasil' },
    { time: '22:00', name: 'Programação Rádio Pelotense' },
  ],
  sabado: [
    { time: '00:00', name: 'Programação Rádio Pelotense' },
    { time: '07:00', name: 'Acorda Zona Sul' },
    { time: '09:00', name: 'Pensar Negócios' },
    { time: '10:00', name: 'Mistura Boa' },
    { time: '12:00', name: 'Programação Rádio Pelotense' },
  ],
  domingo: [
    { time: '00:00', name: 'Programação Rádio Pelotense' },
    { time: '09:00', name: 'Sou do Sul' },
    { time: '12:00', name: 'Programação Rádio Pelotense' },
  ],
};

const WEEKDAY_TO_KEY = {
  Sun: 'domingo',
  Mon: 'segunda',
  Tue: 'terca',
  Wed: 'quarta',
  Thu: 'quinta',
  Fri: 'sexta',
  Sat: 'sabado',
};

const toMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const getBrasiliaNow = () => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date());

  const part = (type) => parts.find((p) => p.type === type)?.value ?? '';
  const weekday = part('weekday');
  const hours = part('hour') === '24' ? '00' : part('hour');
  const minutes = part('minute');

  return {
    dayKey: WEEKDAY_TO_KEY[weekday] || 'segunda',
    minutes: toMinutes(`${hours}:${minutes}`),
    time: `${hours}:${minutes}`,
  };
};

const getPrograms = (schedule, dayKey, minutes) => {
  const entries = schedule[dayKey] || [];
  if (entries.length === 0) {
    return { current: null, next: null };
  }

  let index = 0;
  for (let i = 0; i < entries.length; i += 1) {
    if (toMinutes(entries[i].time) <= minutes) {
      index = i;
    } else {
      break;
    }
  }

  return {
    current: entries[index],
    next: entries[(index + 1) % entries.length],
  };
};

const Programacao = ({
  colors,
  liveText = 'AO VIVO',
  nextText = 'A SEGUIR',
  currentLogo,
  nextLogo,
}) => {
  const [schedule, setSchedule] = useState(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      return cached ? JSON.parse(cached) : FALLBACK_SCHEDULE;
    } catch {
      return FALLBACK_SCHEDULE;
    }
  });
  const [now, setNow] = useState(() => getBrasiliaNow());

  useEffect(() => {
    let cancelled = false;

    const loadSchedule = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
        const res = await fetch(SCHEDULE_URL, { signal: controller.signal });
        const data = await res.json();
        clearTimeout(timeout);

        if (cancelled) return;

        if (data && data.schedule) {
          setSchedule(data.schedule);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data.schedule));
          } catch {
            // ignore storage errors
          }
        }
      } catch {
        if (!cancelled) {
          try {
            const cached = localStorage.getItem(STORAGE_KEY);
            if (cached) setSchedule(JSON.parse(cached));
          } catch {
            // keep fallback
          }
        }
      }
    };

    loadSchedule();

    const refreshTimer = setInterval(loadSchedule, 15 * 60 * 1000);
    const clockTimer = setInterval(() => setNow(getBrasiliaNow()), 30 * 1000);

    return () => {
      cancelled = true;
      clearInterval(refreshTimer);
      clearInterval(clockTimer);
    };
  }, []);

  const programs = useMemo(
    () => getPrograms(schedule, now.dayKey, now.minutes),
    [schedule, now.dayKey, now.minutes],
  );

  const current = programs.current || { name: '—', time: '' };
  const next = programs.next || { name: '—', time: '' };

  const currentLogoSrc = currentLogo ?? getLogoByName(current.name);
  const nextLogoSrc = nextLogo ?? getLogoByName(next.name);

  return (
    <Bar $colors={colors}>
      <Block>
        <LabelBlock>
          <LabelText>
            <LabelDot />
            {liveText}
          </LabelText>
        </LabelBlock>

        <ProgramBlock>
          {currentLogoSrc ? (
            <ProgramLogo src={currentLogoSrc} alt={current.name} />
          ) : (
            <ProgramName title={current.name}>{current.name}</ProgramName>
          )}
        </ProgramBlock>
      </Block>
      <Block>
        <LabelBlock next>
          <LabelText>{nextText}</LabelText>
        </LabelBlock>

        <NextProgramBlock>
          {nextLogoSrc ? (
            <ProgramLogo src={nextLogoSrc} alt={next.name} />
          ) : (
            <ProgramName title={next.name}>{next.name}</ProgramName>
          )}
        </NextProgramBlock>
      </Block>
    </Bar>
  );
};

export default Programacao;
