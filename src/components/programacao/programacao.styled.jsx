import styled from 'styled-components';

const NAVY = '#062B63';
const NAVY_ALT = '#07346F';
const BLUE = '#0A4A91';
const WHITE = '#FFFFFF';
const GRAY_BG = '#F5F5F5';
const GRAY_DARK = '#4A4A4A';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat', 'Inter', system-ui, sans-serif;
  background: transparent;
  box-sizing: border-box;
`;

export const Block = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  max-width: 1200px;
  height: clamp(44px, 7.5vh, 84px);
  margin: 0 24px;

  overflow: hidden;
  border-radius: 2px;
`;

export const Bar = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  max-width: 1200px;
  height: clamp(44px, 7.5vh, 84px);
  margin: 0 24px;

  overflow: hidden;
  border-radius: 2px;

  --p-navy: ${(p) => p.$colors?.navy || NAVY};
  --p-navy-alt: ${(p) => p.$colors?.navyAlt || NAVY_ALT};
  --p-blue: ${(p) => p.$colors?.blue || BLUE};
  --p-white: ${(p) => p.$colors?.white || WHITE};
  --p-gray-bg: ${(p) => p.$colors?.grayBg || GRAY_BG};
  --p-gray-dark: ${(p) => p.$colors?.grayDark || GRAY_DARK};
`;

export const LabelBlock = styled.div`
  flex: 0 0 auto;
  min-width: 150px;
  padding: 0 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--p-navy);
  color: var(--p-white);
  text-align: center;
  border-left: solid 8px var(--p-blue);
  width: 145px;
`;

export const LabelText = styled.span`
  font-weight: 800;
  font-size: clamp(15px, 2.4vh, 26px);
  line-height: 1;
  letter-spacing: 2px;
  text-transform: uppercase;
  white-space: nowrap;
  font-family: inherit;
`;

export const LabelDot = styled.span`
  display: inline-block;
  width: clamp(8px, 1.4vh, 14px);
  height: clamp(8px, 1.4vh, 14px);
  margin-right: 10px;
  border-radius: 50%;
  background: #ff3b30;
  box-shadow: 0 0 10px rgba(255, 59, 48, 0.7);
  animation: livePulse 1.6s ease-in-out infinite;

  @keyframes livePulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.45;
      transform: scale(0.85);
    }
  }
`;

export const ProgramBlock = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  background: var(--p-white);
  color: var(--p-navy);
  text-align: center;
  position: relative;
  overflow: hidden;

  width: 300px;
`;

export const NextProgramBlock = styled(ProgramBlock)`
  background: var(--p-gray-bg);
  color: var(--p-gray-dark);
  width: 300px;
`;

export const AccentRule = styled.div`
  width: 26px;
  height: 3px;
  margin-bottom: 6px;
  background: var(--p-blue);
  opacity: 0.85;
`;

export const ProgramName = styled.strong`
  display: block;
  font-weight: 800;
  font-size: clamp(25px, 2.6vh, 30px);
  line-height: 1.05;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  font-family: inherit;
`;

export const ProgramTime = styled.span`
  margin-top: 5px;
  font-size: clamp(9px, 1.5vh, 14px);
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0.75;
  white-space: nowrap;
  font-family: inherit;
`;

export const NextLabelBlock = styled(LabelBlock)`
  background: var(--p-navy-alt);
  border-left: 2px solid var(--p-white);
  border-right: 2px solid var(--p-white);
`;

export const TimeLabel = styled.span`
  display: inline-block;
  font-weight: 700;
  font-size: clamp(10px, 1.6vh, 15px);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 4px;
  opacity: 0.9;
  white-space: nowrap;
  font-family: inherit;
`;