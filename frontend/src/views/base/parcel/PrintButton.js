import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { CButton, CImage, CTooltip } from '@coreui/react';
import BarCodeGenerator from './BarCodeGenerator';
import PropTypes from 'prop-types'; 
import { QRCode } from 'react-qrcode-logo';
import Barcode from 'react-barcode';
import dowIcon from '../../../assets/images/qr-code.gif'

const PrintButton = ({ id }) => {
  const ref = useRef(QRCode)
  // const ref = useRef(Barcode)

  return (
    <div>
      <ReactToPrint
        trigger={() => (
          <CTooltip content='QR Code' placement='bottom'>
          <CButton color="secondary" size="sm" variant="ghost">
            <CImage src={dowIcon} alt='view' height={25} width={25} />
          </CButton>
          </CTooltip>
        )}
        content={() => ref.current.download()}
      />
     
      <div style={{ display: 'none' }}>
        <BarCodeGenerator ref={ref} id={id} />
      </div>     
    </div>
  );
};

PrintButton.propTypes = {
    id: PropTypes.number.isRequired,  // Adjust the type based on what `id` should be
};

export default PrintButton;
