const modules = import.meta.glob('../../assets/Programas/*.png', {
  eager: true,
  import: 'default',
});

const normalize = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');

const logos = {};

for (const [path, url] of Object.entries(modules)) {
  const fileName = path.split('/').pop() || '';
  const name = fileName
    .replace(/\.png$/i, '')
    .replace(/^\d+\s*-\s*/, '')
    .replace(/_prancheta.*$/i, '')
    .replace(/\s+novo$/i, '');
  logos[normalize(name)] = url;
}

logos.PASSADOALIMPO = logos.PASSADOALPHACORESA;

export const getLogoByName = (name) => {
  if (!name) return undefined;
  return logos[normalize(name)];
};
