import { Container, Lower } from './corpoEMente.styled.jsx';
import ClockPelotasMerece from '../../components/clockPelotasMerece';
import TempoPelotasMerece from '../../components/tempoPelotasMerece';
import GcPelotasMerece from '../../components/gcPelotasMerece';
import PinPelotasMerece from '../../components/pinPelotasMerece';
import WhatsPelotasMerece from '../../components/whatsPelotasMerece';
import InstaCorpoEMente from '../../components/InstaCorpoEMente';
import LowerPelotasMerece from '../../components/lowerPelotasMerece';

const Esportes = () => {
  return (
    <Container>
      <ClockPelotasMerece />
      <TempoPelotasMerece />
      <GcPelotasMerece />
      <PinPelotasMerece />
      <WhatsPelotasMerece />

      <Lower>
        <LowerPelotasMerece />
      </Lower>
    </Container>
  );
};

export default Esportes;
