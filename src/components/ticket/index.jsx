import {
  TicketContainer,
  LeftSide,
  RightSide,
  QrCode,
} from './ticket.styled.jsx';

let code =
  'https://upload.wikimedia.org/wikipedia/commons/f/fa/Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg';
const Ticket = () => {
  return (
    <TicketContainer>
      <LeftSide>
        <QrCode src={code} alt="qrcode" />
      </LeftSide>

      <RightSide></RightSide>
    </TicketContainer>
  );
};

export default Ticket;
