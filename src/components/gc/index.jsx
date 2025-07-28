import { useState, useEffect } from 'react';
import {
  Container,
  GcTop,
  GcBottom,
  TextContainer,
  TextContainerTop,
} from './gc.styled.jsx';

const Gc = () => {
  return (
    <Container>
      <GcTop>
        <TextContainerTop spellcheck="false">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </TextContainerTop>
      </GcTop>
      <GcBottom>
        <TextContainer spellcheck="false">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </TextContainer>
      </GcBottom>
    </Container>
  );
};

export default Gc;
