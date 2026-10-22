import { toPng } from 'html-to-image';

const ESTILO_CAPTURA_ID = 'export-capture-style';

const injetarEstiloCaptura = () => {
  if (document.getElementById(ESTILO_CAPTURA_ID)) return;

  const style = document.createElement('style');
  style.id = ESTILO_CAPTURA_ID;
  style.textContent = `
    [data-export-capture="true"],
    [data-export-capture="true"] * {
      animation: none !important;
      transition: none !important;
      caret-color: transparent !important;
    }
  `;
  document.head.appendChild(style);
};

export const exportNodeAsPng = async (
  node,
  {
    fileName = 'apuracao.png',
    backgroundColor = 'transparent',
    pixelRatio = 2,
  } = {},
) => {
  if (!node) {
    throw new Error('Elemento de exportação não encontrado');
  }

  injetarEstiloCaptura();
  node.setAttribute('data-export-capture', 'true');

  try {
    const dataUrl = await toPng(node, {
      cacheBust: true,
      pixelRatio,
      backgroundColor,
      filter: (el) => !(el instanceof HTMLElement && el.dataset.exportIgnore),
    });

    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataUrl;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    link.remove();
  } finally {
    node.removeAttribute('data-export-capture');
  }
};
