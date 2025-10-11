import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  GcTop,

  TextContainerTop,
  TextMirror,

  Logo,
} from './gc.styled.jsx';


const Gc = () => {
  const [searchParams] = useSearchParams();
  const nome = searchParams.get('nome'); // pega ?nome=XXX

  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [fromUrl, setFromUrl] = useState(false); // flag para controlar se veio da URL

  const mirrorTopRef = useRef(null);
  const topRef = useRef(null);
  const mirrorBottomRef = useRef(null);
  const bottomRef = useRef(null);

  const adjustWidth = (mirrorRef, inputRef, text) => {
    if (mirrorRef.current && inputRef.current) {
      mirrorRef.current.textContent = text || ' ';
      inputRef.current.style.width = mirrorRef.current.offsetWidth + 'px';
    }
  };

  // Carrega valor inicial
  useEffect(() => {
    const savedTop = localStorage.getItem('gcMusic');
    const savedBottom = localStorage.getItem('gcBottomText');

    if (nome && nome.trim() !== '') {
      setTopText(nome.toUpperCase());
      setFromUrl(true); // veio pela URL
    } else if (savedTop && savedTop.trim() !== '') {
      setTopText(savedTop);
    } else {
      setTopText('EDITAR');
      localStorage.setItem('gcMusic', 'EDITAR');
    }

    if (savedBottom && savedBottom.trim() !== '') {
      setBottomText(savedBottom);
    } else {
      setBottomText('EDITAR');
      localStorage.setItem('gcBottomText', 'EDITAR');
    }
  }, [nome]);

  useEffect(() => {
    adjustWidth(mirrorTopRef, topRef, topText);
    // Só salva no localStorage se não veio da URL
    if (!fromUrl && topText && topText.trim() !== '') {
      localStorage.setItem('gcMusic', topText);
    }
  }, [topText, fromUrl]);

  useEffect(() => {
    adjustWidth(mirrorBottomRef, bottomRef, bottomText);
    if (bottomText && bottomText.trim() !== '') {
      localStorage.setItem('gcBottomText', bottomText);
    }
  }, [bottomText]);

 const logoImage = 'https://i.imgur.com/gXyrBvU.gif';

  return (
    <Container>
      <GcTop>
        <Logo src={logoImage} alt="Logo" />
        <TextMirror ref={mirrorTopRef} />
        <TextContainerTop
          ref={topRef}
          spellCheck="false"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
        />
      </GcTop>


    </Container>
  );
};

export default Gc;
