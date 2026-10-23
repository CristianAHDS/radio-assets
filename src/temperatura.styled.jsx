import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Card = styled.div`
  width: 235px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
`;

export const TopCard = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  background-color: ${({ $background }) => $background};
  overflow: hidden;
  color: #fff;
`;

export const Linha = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 12px;
`;

export const Icone = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  flex-shrink: 0;
  filter: brightness(0) invert(1);
`;

export const Cidade = styled.span`
  min-width: 0;
  overflow: hidden;
  font-size: ${({ $longa }) => ($longa ? '13px' : '16px')};
  line-height: 1.2;
  font-weight: 900;
  white-space: normal;
  word-break: break-word;
  text-align: center;
`;

export const Valor = styled.span`
  flex-shrink: 0;
  font-size: 22px;
  line-height: 1;
  font-weight: 400;
`;
