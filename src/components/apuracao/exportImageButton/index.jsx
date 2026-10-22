import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FiDownload, FiLoader } from 'react-icons/fi';
import { Wrap, Button, Erro } from './exportImageButton.styled';
import { exportNodeAsPng } from './exportNodeAsPng';

const ExportImageButton = ({
  targetRef,
  fileName = 'apuracao.png',
  label = 'Exportar imagem',
}) => {
  const [exportando, setExportando] = useState(false);
  const [erro, setErro] = useState(false);

  const handleExport = async () => {
    if (exportando) return;

    setErro(false);
    setExportando(true);

    try {
      await exportNodeAsPng(targetRef?.current, { fileName });
    } catch {
      setErro(true);
    } finally {
      setExportando(false);
    }
  };

  const conteudo = (
    <Wrap data-export-ignore="true">
      <Button
        type="button"
        onClick={handleExport}
        disabled={exportando}
        title={label}
        aria-label={label}
      >
        {exportando ? (
          <FiLoader size={16} className="spin" />
        ) : (
          <FiDownload size={16} />
        )}
      </Button>
      {erro && <Erro>Não foi possível gerar a imagem</Erro>}
    </Wrap>
  );

  if (typeof document === 'undefined') return null;

  return createPortal(conteudo, document.body);
};

export default ExportImageButton;
