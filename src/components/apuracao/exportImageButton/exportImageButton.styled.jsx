import styled, { keyframes } from 'styled-components';
import { CORES } from '../data';

const girar = keyframes`
  to { transform: rotate(360deg); }
`;

export const Wrap = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

export const Button = styled.button`
  position: relative;
  display: block;
  width: 36px;
  height: 36px;
  min-width: 36px;
  box-sizing: border-box;
  padding: 0 !important;
  margin: 0 !important;
  line-height: 0;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.65);
  font-family: inherit;
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: background 0.2s ease, color 0.2s ease;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.16);
    color: ${CORES.texto};
  }

  &:disabled {
    cursor: progress;
    opacity: 0.7;
  }

  svg {
    position: absolute;
    inset: 0;
    display: block;
    margin: auto;
    width: 16px;
    height: 16px;
  }

  .spin {
    animation: ${girar} 0.9s linear infinite;
    transform-origin: center;
  }
`;

export const Erro = styled.span`
  padding: 6px 10px;
  border-radius: 8px;
  background: rgba(0, 29, 65, 0.92);
  color: #fca5a5;
  font-size: 0.72rem;
  font-weight: 600;
`;
