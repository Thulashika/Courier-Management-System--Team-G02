import React, { useRef } from 'react';
import { CButton, CImage, CTooltip } from '@coreui/react';
import PropTypes from 'prop-types'; 
import { QRCode } from 'react-qrcode-logo';
import dowIcon from '../../../assets/images/qr-code.gif';

const PrintButton = ({ id }) => {
  const qrRef = useRef(null); 

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector('canvas'); 
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png'); 
      link.download = `QRCode-${id}.png`; 
      link.click(); 
    } else {
      console.error('Canvas not found in QRCode');
    }
  };

  return (
    <div>
      <CTooltip content="Download QR Code" placement="bottom">
        <CButton color="secondary" size="sm" variant="ghost" onClick={handleDownload}>
          <CImage src={dowIcon} alt="download" height={25} width={25} />
        </CButton>
      </CTooltip>

      <div ref={qrRef} style={{ display: 'none' }}>
        <QRCode value={`http://localhost:3000/qrDetails?id=${id}`} />
      </div>
    </div>
  );
};

PrintButton.propTypes = {
  id: PropTypes.number.isRequired,
};

export default PrintButton;
