import styled, { keyframes } from 'styled-components';

const defaultAccent = '#6366f1';

const hexToRgba = (hex, alpha) => {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

export const Page = styled.div`
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  padding: 28px;
  color: #e8edf5;
  font-family: 'Montserrat', 'Inter', 'Segoe UI', system-ui, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  background: #0a0e1a;
  background-image:
    radial-gradient(ellipse at 15% 0%, rgba(99, 102, 241, 0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 85% 100%, rgba(16, 185, 129, 0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.04) 0%, transparent 70%);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Hero = styled.section`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  padding: 28px 32px;
  border-radius: 20px;
  background: rgba(22, 29, 47, 0.55);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  animation: ${fadeIn} 0.4s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background:
      radial-gradient(circle at 15% 40%, rgba(99, 102, 241, 0.14) 0%, transparent 50%),
      radial-gradient(circle at 85% 60%, rgba(16, 185, 129, 0.08) 0%, transparent 50%);
  }
`;

export const HeroLeft = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 260px;
`;

export const HeroTag = styled.span`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: #818cf8;
  background: rgba(99, 102, 241, 0.12);
  border: 1px solid rgba(99, 102, 241, 0.2);
`;

export const HeroTitle = styled.h1`
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin: 0;
  color: #ffffff;
`;

export const HeroSubtitle = styled.p`
  margin: 0;
  font-size: 13.5px;
  color: #94a3b8;
  max-width: 560px;
`;

export const HeroRight = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const SearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 14px;
  color: #64748b;
  display: flex;
  pointer-events: none;
`;

export const SearchInput = styled.input`
  width: 300px;
  max-width: 100%;
  padding: 11px 14px 11px 40px !important;
  border-radius: 12px;
  border: 1px solid #1e2d47;
  background: rgba(10, 14, 26, 0.7);
  color: #e8edf5;
  font-size: 13.5px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: #64748b;
  }

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
  }
`;

export const DatePill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 12.5px;
  color: #94a3b8;
  background: rgba(22, 29, 47, 0.6);
  border: 1px solid #1e2d47;
  white-space: nowrap;
  text-transform: capitalize;
`;

export const StatsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
`;

export const StatCard = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 22px;
  border-radius: 16px;
  background: rgba(22, 29, 47, 0.7);
  border: 1px solid #1e2d47;
  overflow: hidden;
  animation: ${fadeInUp} 0.45s ease both;
  transition: transform 0.2s ease, box-shadow 0.3s ease, border-color 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 90% 10%, ${(p) => p.$accent}14, transparent 60%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: -40px;
    right: -40px;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    filter: blur(44px);
    opacity: 0.25;
    background: ${(p) => p.$accent};
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-3px);
    border-color: #273651;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  }
`;

export const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  background: ${(p) => p.$accent}18;
  color: ${(p) => p.$accent};
`;

export const StatInfo = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

export const StatValue = styled.span`
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1;
`;

export const StatLabel = styled.span`
  color: #94a3b8;
  font-size: 12px;
  font-weight: 500;
  margin-top: 4px;
`;

export const Layout = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;

  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 18px;
  }
`;

export const Content = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const QuickNav = styled.nav`
  position: sticky;
  top: 12px;
  z-index: 20;
  flex-shrink: 0;
  width: ${(p) => (p.$collapsed ? '66px' : '216px')};
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: ${(p) => (p.$collapsed ? '12px 8px' : '14px 12px')};
  border-radius: 14px;
  background: rgba(14, 20, 32, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid #1e2d47;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  animation: ${fadeIn} 0.4s ease;
  transition: width 0.2s ease, padding 0.2s ease;

  @media (max-width: 1200px) {
    position: relative;
    top: 0;
    width: 100%;
    padding: 12px;
  }
`;

export const QuickNavHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(p) => (p.$collapsed ? 'center' : 'space-between')};
  gap: 8px;
  min-height: 24px;
  overflow: hidden;

  @media (max-width: 1200px) {
    display: none;
  }
`;

export const QuickNavTitle = styled.span`
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #64748b;
  padding-left: 4px;
  white-space: nowrap;
`;

export const QuickNavToggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  padding: 0 !important;
  border-radius: 7px;
  cursor: pointer;
  color: #94a3b8;
  background: rgba(10, 14, 26, 0.6);
  border: 1px solid #1e2d47;
  transition: all 0.18s ease;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    color: #e8edf5;
    border-color: #273651;
  }

  &:active {
    transform: scale(0.94);
  }
`;

export const QuickNavScroll = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: calc(100vh - 180px);
  overflow-y: auto;
  padding-right: 2px;
  scrollbar-width: thin;
  scrollbar-color: #273651 transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #273651;
    border-radius: 100px;
  }

  @media (max-width: 1200px) {
    flex-direction: row;
    gap: 8px;
    max-height: none;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 2px;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const QuickNavItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: ${(p) => (p.$collapsed ? 'center' : 'flex-start')};
  gap: 9px;
  width: 100%;
  flex-shrink: 0;
  padding: ${(p) => (p.$collapsed ? '10px 0 !important' : '8px 11px !important')};
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  text-align: left;
  color: ${(p) => p.$accent || '#94a3b8'};
  background: ${(p) =>
    p.$active
      ? hexToRgba(p.$accent || defaultAccent, 0.2)
      : hexToRgba(p.$accent || defaultAccent, 0.08)};
  border: 1px solid
    ${(p) =>
      p.$active ? hexToRgba(p.$accent || defaultAccent, 0.55) : 'transparent'};
  transition: all 0.18s ease;
  -webkit-tap-highlight-color: transparent;

  &::before {
    content: '';
    flex-shrink: 0;
    width: 7px;
    height: 7px;
    border-radius: 2px;
    background: ${(p) => p.$accent || defaultAccent};
    box-shadow: ${(p) =>
      p.$active
        ? `0 0 10px 1px ${hexToRgba(p.$accent || defaultAccent, 0.85)}`
        : `0 0 8px ${hexToRgba(p.$accent || defaultAccent, 0.6)}`};
    transform: ${(p) => (p.$active ? 'scale(1.25)' : 'scale(1)')};
    transition: transform 0.18s ease, box-shadow 0.18s ease;
  }

  &:hover {
    background: ${(p) => hexToRgba(p.$accent || defaultAccent, 0.18)};
    border-color: ${(p) => hexToRgba(p.$accent || defaultAccent, 0.4)};
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 1200px) {
    width: auto;
    justify-content: flex-start;
    padding: 7px 13px !important;
    border-radius: 100px;
    background: ${(p) => hexToRgba(p.$accent || defaultAccent, 0.1)};
    border-color: ${(p) =>
      p.$active
        ? hexToRgba(p.$accent || defaultAccent, 0.55)
        : hexToRgba(p.$accent || defaultAccent, 0.25)};
  }
`;

export const QuickNavLabel = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const QuickNavCount = styled.span`
  flex-shrink: 0;
  margin-left: auto;
  font-size: 10.5px;
  font-weight: 700;
  padding: 1px 7px;
  border-radius: 100px;
  color: ${(p) => p.$accent || '#818cf8'};
  background: ${(p) => hexToRgba(p.$accent || defaultAccent, 0.18)};

  @media (max-width: 1200px) {
    margin-left: 0;
  }
`;

export const Section = styled.section`
  scroll-margin-top: 90px;
  border-radius: 16px;
  background: rgba(22, 29, 47, 0.55);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid ${(p) => (p.$accent ? `${p.$accent}40` : 'rgba(255, 255, 255, 0.06)')};
  box-shadow: ${(p) =>
    p.$accent
      ? `0 0 0 1px ${p.$accent}14, 0 0 40px ${hexToRgba(p.$accent, 0.08)}`
      : 'none'};
  padding: 24px;
  animation: ${fadeInUp} 0.5s ease both;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
`;

export const SectionRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const CategorySearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 11px;
    color: #64748b;
    pointer-events: none;
  }
`;

export const CategoryInput = styled.input`
  width: 200px;
  max-width: 100%;
  padding: 7px 12px 7px 32px !important;
  border-radius: 10px;
  border: 1px solid #1e2d47;
  background: rgba(10, 14, 26, 0.7);
  color: #e8edf5;
  font-size: 12.5px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: #64748b;
  }

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 700;
  margin: 0;
  color: #ffffff;
`;

export const SectionDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background: linear-gradient(135deg, ${(p) => p.$accent || defaultAccent}, ${(p) => p.$accent || defaultAccent});
  box-shadow: 0 0 12px ${(p) => hexToRgba(p.$accent || defaultAccent, 0.5)};
`;

export const SectionBadge = styled.span`
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
  color: ${(p) => p.$accent || '#818cf8'};
  background: ${(p) => hexToRgba(p.$accent || defaultAccent, 0.12)};
  border: 1px solid ${(p) => hexToRgba(p.$accent || defaultAccent, 0.25)};
  white-space: nowrap;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 18px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 14px;
  background: rgba(22, 29, 47, 0.7);
  border: 1px solid #1e2d47;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease;
  animation: ${scaleIn} 0.4s ease both;

  &:hover {
    transform: translateY(-3px);
    border-color: ${(p) => p.$accent || '#273651'};
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.28), 0 0 30px ${(p) =>
      hexToRgba(p.$accent || defaultAccent, 0.08)};
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 13px 16px;
  border-bottom: 1px solid #1e2d47;
`;

export const CardTitle = styled.strong`
  font-size: 13.5px;
  font-weight: 700;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const RouteTag = styled.code`
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 600;
  color: #94a3b8;
  background: rgba(10, 14, 26, 0.7);
  border: 1px solid #1e2d47;
  border-radius: 6px;
  padding: 3px 8px;
  font-family: 'SFMono-Regular', Consolas, monospace;
`;

export const Preview = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
  background-color: #0e1420;
  background-image:
    radial-gradient(circle at 20% 20%, ${(p) => hexToRgba(p.$accent || defaultAccent, 0.08)} 0%, transparent 45%),
    radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.05) 0%, transparent 45%),
    linear-gradient(${(p) => hexToRgba(p.$accent || defaultAccent, 0.04)} 1px, transparent 1px),
    linear-gradient(90deg, ${(p) => hexToRgba(p.$accent || defaultAccent, 0.04)} 1px, transparent 1px);
  background-size: auto, auto, 24px 24px, 24px 24px;
`;

export const PreviewFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  border: none;
  transform-origin: top left;
  pointer-events: none;
  transform: scale(${(p) => p.$scale || 1});
`;

export const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 13px 16px;
  border-top: 1px solid #1e2d47;
`;

export const ParamsRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const ParamInput = styled.input`
  flex: 1;
  min-width: 120px;
  padding: 7px 12px !important;
  border-radius: 8px;
  border: 1px solid #1e2d47;
  background: rgba(10, 14, 26, 0.7);
  color: #e8edf5;
  font-size: 12.5px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: #64748b;
  }

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const buttonBase = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex: 1;
  padding: 9px 14px !important;
  border-radius: 10px;
  font-size: 12.5px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;

  &:active {
    transform: scale(0.97);
  }
`;

export const PrimaryButton = styled.button`
  ${buttonBase}
  border: 1px solid #6366f1;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);

  &:hover {
    background: linear-gradient(135deg, #6366f1, #4338ca);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
  }
`;

export const GhostButton = styled.button`
  ${buttonBase}
  border: 1px solid #1e2d47;
  background: rgba(10, 14, 26, 0.5);
  color: #94a3b8;

  &:hover {
    color: #e8edf5;
    border-color: #273651;
    background: rgba(10, 14, 26, 0.8);
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 56px 0;
  color: #64748b;
  font-size: 13.5px;
  text-align: center;
  animation: ${fadeIn} 0.3s ease;
`;

export const Placeholder = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: ${(p) => p.$accent || defaultAccent};
  background: rgba(10, 14, 26, 0.55);

  svg {
    opacity: 0.8;
  }

  span {
    font-size: 12.5px;
    font-weight: 700;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }

  small {
    color: #64748b;
    font-size: 12px;
  }
`;