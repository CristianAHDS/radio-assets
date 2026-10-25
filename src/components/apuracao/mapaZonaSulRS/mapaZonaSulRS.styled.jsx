import styled from 'styled-components';

export const GlobalStyle = styled.div`
  * { box-sizing: border-box; }
`;

export const Page = styled.div`
  font-family: 'Inter', system-ui, sans-serif;
  background: ${({ theme }) => theme?.secundaria || '#001d41'};
  color: ${({ theme }) => theme?.texto || '#fff'};
  min-height: 100vh;
  padding: 16px;
`;

export const Wrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  flex-wrap: wrap;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const HeaderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #05306a, #001d41);
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
`;

export const Subtitle = styled.p`
  font-size: 0.8rem;
  color: #94a3b8;
  margin: 2px 0 0;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const HeaderBadge = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: #fbbf24;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(251,191,36,0.15);
  border: 1px solid rgba(251,191,36,0.3);
`;

export const LiveBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #22c55e;
`;

export const LiveDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $on }) => ($on ? '#22c55e' : '#64748b')};
  box-shadow: ${({ $on }) => ($on ? '0 0 8px #22c55e' : 'none')};
  animation: ${({ $on }) => ($on ? 'pulse 2s infinite' : 'none')};

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.9); }
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
`;

export const Tile = styled.article`
  background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
  border: 1px solid ${({ $cor }) => $cor || 'rgba(255,255,255,0.1)'};
  border-radius: 16px;
  padding: 16px;
  transition: transform 0.2s, box-shadow 0.2s;
  opacity: ${({ $ativo }) => ($ativo ? 1 : 0.5)};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  }
`;

export const TileTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const CidadeNome = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ $cor }) => $cor || '#fff'};
  text-transform: uppercase;
  letter-spacing: 0.02em;
`;

export const TileApurado = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #fbbf24;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(251,191,36,0.15);
`;

export const TileName = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TilePct = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1;
  color: ${({ $cor }) => $cor || '#fff'};

  small {
    font-size: 0.7rem;
    font-weight: 500;
    opacity: 0.8;
  }
`;

export const TileVazio = styled.div`
  font-size: 2rem;
  font-weight: 300;
  color: #64748b;
  text-align: center;
  padding: 20px 0;
`;

export const TileTrack = styled.div`
  margin-top: 10px;
  height: 8px;
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
  overflow: hidden;
`;

export const TileBar = styled.div`
  height: 100%;
  width: ${({ $width }) => $width}%;
  background: ${({ $cor }) => $cor || '#fbbf24'};
  border-radius: 4px;
  transition: width 0.5s ease;
`;

export const Footer = styled.footer`
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
`;

export const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #e2e8f0;
`;

export const LegendDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $cor }) => $cor || '#fbbf24'};
`;

export const LegendName = styled.span`
  font-weight: 600;
`;

export const LegendUfs = styled.span`
  color: #94a3b8;
  font-size: 0.75rem;
`;

export const FooterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: #94a3b8;
`;

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  color: #64748b;
  font-size: 1rem;
`;