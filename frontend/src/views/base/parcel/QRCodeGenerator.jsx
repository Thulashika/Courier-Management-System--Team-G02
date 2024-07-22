import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { reference } from '@popperjs/core';

const QRCodeGenerator = () => {

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
        parcelDetails: [{
          referenceNumber: '',
          weight: '',
          deliveryCharge: '',
          totalAmount: '',
          dueAmount: '',
          paymentMethod:'',
          status:''
        }]
    })

  return (
    <div>
      <QRCode value={parcel} />
    </div>
  );
};

export default QRCodeGenerator;
