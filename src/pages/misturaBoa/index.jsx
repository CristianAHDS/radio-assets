import { Container, Lower } from './misturaBoa.styled.jsx';
import ClockMisturaBoa from '../../components/clockMisturaBoa';
import TempoMisturaBoa from '../../components/tempoMisturaBoa';
import GcMisturaBoa from '../../components/gcMisturaBoa';
import PinMisturaBoa from '../../components/pinMisturaBoa';
import WhatsMisturaBoa from '../../components/whatsMisturaBoa';
import LowerMisturaBoa from '../../components/lowerMisturaBoa';

const MisturaBoa = () => {
  return (
    <Container>
      <ClockMisturaBoa />
      <TempoMisturaBoa />
      <GcMisturaBoa />
      <PinMisturaBoa />
      <WhatsMisturaBoa />

      <Lower>
        <LowerMisturaBoa />
      </Lower>
    </Container>
  );
};

export default MisturaBoa;
