import styled from 'styled-components';

export const TicketContainer = styled.div`
  width: 600px;
  height: 220px;
  display: flex;
  position: relative;
  font-family: sans-serif;
  overflow: hidden;
  background: #fff;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  -webkit-clip-path: path(
    'M20,0 
     H580 
     a20,20 0 0 1 20,20 
     V200 
     a20,20 0 0 1 -20,20 
     H20 
     a20,20 0 0 1 -20,-20 
     V20 
     a20,20 0 0 1 20,-20 
     z
     M0,40 
     a20,20 0 0 0 20,-20 
     V20 
     a20,20 0 0 0 -20,20 
     z
     M600,40 
     a20,20 0 0 1 -20,-20 
     V20 
     a20,20 0 0 1 20,20 
     z
     M0,180 
     a20,20 0 0 1 20,20 
     V200 
     a20,20 0 0 1 -20,-20 
     z
     M600,180 
     a20,20 0 0 0 -20,20 
     V200 
     a20,20 0 0 0 20,-20 
     z'
  );
  clip-path: path(
    'M20,0 
     H580 
     a20,20 0 0 1 20,20 
     V200 
     a20,20 0 0 1 -20,20 
     H20 
     a20,20 0 0 1 -20,-20 
     V20 
     a20,20 0 0 1 20,-20 
     z
     M0,40 
     a20,20 0 0 0 20,-20 
     V20 
     a20,20 0 0 0 -20,20 
     z
     M600,40 
     a20,20 0 0 1 -20,-20 
     V20 
     a20,20 0 0 1 20,20 
     z
     M0,180 
     a20,20 0 0 1 20,20 
     V200 
     a20,20 0 0 1 -20,-20 
     z
     M600,180 
     a20,20 0 0 0 -20,20 
     V200 
     a20,20 0 0 0 20,-20 
     z'
  );
`;

export const LeftSide = styled.div`
  width: 35%;
  height: 100%;
  background-color: #fff;
  border-right: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RightSide = styled.div`
  width: 65%;
  background-color: white;
  padding: 24px;
  position: relative;
  background-image: url('https://images.sympla.com.br/670a7089b2fd2.png');
  background-position: center;
  background-size: cover;
`;

export const QrCode = styled.img`
  width: 80%;
`;
