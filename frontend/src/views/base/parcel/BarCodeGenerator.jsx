import React, { forwardRef } from 'react';
import Barcode from 'react-barcode';
import { reference } from '@popperjs/core';
import { QRCode } from 'react-qrcode-logo';
import PropTypes from 'prop-types'; 

const BarCodeGenerator = forwardRef(( { id }, ref) => {

  return (
    <div>
        <div>
            {/* <Barcode value={parcel}></Barcode> */}
            {/* <span><Barcode ref={ref} value={`http://localhost:3000/parcels/${id}`}/></span> */}
        </div>
        <div>
            <span><QRCode ref={ref} value={`http://localhost:3000/parcels?id=${id}`}/></span>
            {/* <span><QRCode ref={ref} value={`${import.meta.env.REACT_APP_BACKEND_BASEURL}/parcels?id=${id}`}/></span> */}
            {/* <span> 
                <div> {`Recipient: ${parcel.recipientDetails.firstName} ${parcel.recipientDetails.lastName}`}</div>
                <div> {`${parcel.senderDetails.firstName} ${parcel.senderDetails.lastName}`}</div>
            </span> */}
        </div>
    </div>
  );
});

BarCodeGenerator.displayName = 'BarCodeGenerator';

BarCodeGenerator.propTypes = {
    id: PropTypes.number.isRequired,
};

export default BarCodeGenerator;
