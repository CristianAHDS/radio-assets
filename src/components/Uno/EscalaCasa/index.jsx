const Uno = () => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // ajuste da área útil (crop)
  const cropWidth = 800;
  const cropHeight = 1080;

  const scale = Math.min(vw / (cropWidth * 2), vh / cropHeight);

  const width = cropWidth * scale;
  const height = cropHeight * scale;

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'transparent',
        overflow: 'hidden',
      }}
    >
      {/* iframe 1 */}
      <div
        style={{
          width,
          height,
          overflow: 'hidden',
        }}
      >
        <iframe
          src="https://app.overlays.uno/output/7Icadnw3JuKo5VDVWgs7I9"
          style={{
            width: 1920,
            height: 1080,
            border: 'none',
            transform: `scale(${scale}) translateX(0px)`,
            transformOrigin: 'top left',
          }}
        />
      </div>

      {/* iframe 2 */}
      <div
        style={{
          width,
          height,
          overflow: 'hidden',
        }}
      >
        <iframe
          src="https://app.overlays.uno/output/7Icadnw3JuKo5VDVWgs7I9"
          style={{
            width: 1920,
            height: 1080,
            border: 'none',
            transform: `scale(${scale}) translateX(0px)`,
            transformOrigin: 'top left',
          }}
        />
      </div>
    </div>
  );
};

export default Uno;
