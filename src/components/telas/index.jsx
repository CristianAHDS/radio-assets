import { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useParams } from 'react-router-dom';
import { TELAS } from './config';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 100%;
  }
`;

const CenterWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ScrollWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
`;

const ScreenWrap = styled.div`
  flex-shrink: 0;
  width: ${(props) => props.$w}px;
  height: ${(props) => props.$h}px;
  overflow: hidden;
`;

const Screen = styled.div`
  position: relative;
  width: 1920px;
  height: 1080px;
  overflow: hidden;
  transform-origin: top left;
`;

const Placeholder = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-family: 'Montserrat', sans-serif;
  font-size: 32px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const useScale = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setScale(Math.min(w / 1920, h / 1080));
    };

    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return scale;
};

const ScreenView = ({ tela, scale }) => (
  <ScreenWrap $w={1920 * scale} $h={1080 * scale}>
    <Screen style={{ transform: `scale(${scale})` }}>
      {tela.components.map((comp, i) => {
        const { type, ...pos } = comp;
        return (
          <iframe
            key={`${tela.id}-${type}-${i}`}
            title={`${tela.name} - ${type}`}
            src={`${window.location.origin}${comp.src || `/${type}`}`}
            scrolling="no"
            style={{
              position: 'absolute',
              border: 'none',
              overflow: 'hidden',
              width: comp.width || 'auto',
              height: comp.height || 'auto',
              ...pos,
            }}
          />
        );
      })}
    </Screen>
  </ScreenWrap>
);

const Telas = () => {
  const { id } = useParams();
  const scale = useScale();
  const single = id ? TELAS.find((t) => t.id === id) : null;
  const screens = single ? [single] : TELAS;

  return (
    <>
      <GlobalStyle />
      {single ? (
        <CenterWrapper>
          <ScreenView tela={single} scale={scale} />
        </CenterWrapper>
      ) : (
        <ScrollWrapper>
          {screens.length === 0 ? (
            <Placeholder>Configuração das telas em breve</Placeholder>
          ) : (
            screens.map((tela) => (
              <ScreenView key={tela.id} tela={tela} scale={scale} />
            ))
          )}
        </ScrollWrapper>
      )}
    </>
  );
};

export default Telas;