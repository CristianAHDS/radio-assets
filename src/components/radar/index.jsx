
import { Card } from './radar.styled.jsx';


const Radar = () => {
  return (
    <Card>
      <iframe
        src="https://embed.windy.com/embed2.html?lat=-30.0&lon=-51.0&zoom=6&overlay=rain&product=radar&calendar=now&play=1&loop=1"
        style={{ width: '1920px', height: '1080px', border: 'none' }}
        allowTransparency="true"
        loading="lazy"
      />
    </Card>
  );
};

export default Radar;
