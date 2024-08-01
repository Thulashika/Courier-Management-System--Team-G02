import React, { useState, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilArrowThickToBottom } from '@coreui/icons';
import BarCodeGenerator from './BarCodeGenerator';
import PropTypes from 'prop-types'; 
import { QRCode } from 'react-qrcode-logo';
import Barcode from 'react-barcode';

const PrintButton = ({ id }) => {
  const ref = useRef(QRCode)
  // const ref = useRef(Barcode)

  return (
    <div>
      <ReactToPrint
        trigger={() => (
          <CButton color="secondary" size="sm" variant="ghost">
            <CIcon icon={cilArrowThickToBottom} />
          </CButton>
        )}
        content={() => ref.current.download()}
      />
     
      <div style={{ display: 'none' }}>
        <BarCodeGenerator ref={ref} id={id} />
      </div>

      {/* <div>
        recipientDetails:
      </div> */}
      
    </div>
  );
};

PrintButton.propTypes = {
    id: PropTypes.number.isRequired,  // Adjust the type based on what `id` should be
};

export default PrintButton;
