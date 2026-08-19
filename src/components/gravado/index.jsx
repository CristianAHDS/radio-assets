import { GravaCard, GravaCardTop, GravaLogo } from './grava.styled';

const Gravado = () => {
  const logoImage = 'https://i.imgur.com/gXyrBvU.gif';

  return (
    <GravaCard>
      <GravaCardTop>
        Conteúdo gravado <GravaLogo src={logoImage} alt="Logo" />
      </GravaCardTop>
    </GravaCard>
  );
};

export default Gravado;