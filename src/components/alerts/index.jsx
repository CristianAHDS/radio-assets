import { useState, useEffect } from 'react';
import { Card } from './alert.styled.jsx';

import { LuBellRing } from 'react-icons/lu';

const Alert = (props) => {
  return (
    <Card>
      <LuBellRing style={{ marginRight: 10, fontSize: 28 }} />
      {props.text}
    </Card>
  );
};

export default Alert;
