import React, { useState, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilArrowThickToBottom } from '@coreui/icons';
import BarCodeGenerator from './BarCodeGenerator';
import PropTypes from 'prop-types'; 

const PrintButton = ({ id }) => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => (
          <CButton color="secondary" size="sm" variant="ghost">
            <CIcon icon={cilArrowThickToBottom} />
          </CButton>
        )}
        content={() => componentRef.current}
      />
     
     <div style={{ display: 'none' }}>
          <BarCodeGenerator ref={componentRef} id={id} />
        </div>
      
    </div>
  );
};

PrintButton.propTypes = {
    id: PropTypes.number.isRequired,  // Adjust the type based on what `id` should be
};

export default PrintButton;
