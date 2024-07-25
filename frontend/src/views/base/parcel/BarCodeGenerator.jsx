import React, { forwardRef, useEffect, useState,  } from 'react';
import Barcode from 'react-barcode';
import { reference } from '@popperjs/core';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';
import PropTypes from 'prop-types'; 

const BarCodeGenerator = forwardRef(( { id }, ref) => {

    const [parcel, setParcel] = useState({
        senderDetails: {
          firstName: '',
          lastName: '',
          address: '',
          contactNumber: '',
          NIC:'',
          date: '',
          branchProcessed: ''
        },
        recipientDetails: {
          firstName: '',
          lastName: '',
          address: '',
          contactNumber: '',
          NIC:'',
          date: '',
          branchProcessed: ''
        },
        parcelDetails: {
          referenceNumber: '',
          weight: '',
          deliveryCharge: '',
          totalAmount: '',
          dueAmount: '',
          paymentMethod:'',
          status:''
        }
      });

    useEffect(() => {
        axios(`http://localhost:6431/parcel/${id}`, {
          method: 'get'
        }).then(res => {
          const data = res.data;
          if (Array.isArray(data.parcelDetails)) {
            setParcel(data);
          } else {
            setParcel({
              ...data,
              parcelDetails: parcel.parcelDetails // or handle the error accordingly
            });
          }
        });
      }, []);

  return (
    <div ref={ref}>
        <div>
            {/* <Barcode value={parcel}></Barcode> */}
        </div>
        <div>
            <span><QRCode value={parcel} /></span>
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
    id: PropTypes.number.isRequired,  // Adjust the type based on what `id` should be
};

export default BarCodeGenerator;
