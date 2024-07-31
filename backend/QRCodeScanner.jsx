// import React, { useState } from 'react';
// import QrReader from 'react-qr-reader';

// const QRCodeScanner = () => {
//   const [qrData, setQRData] = useState('');

//   const handleScan = (data) => {
//     if (data) {
//       setQRData(data);
//     }
//   };

//   const handleError = (err) => {
//     console.error(err);
//   };

//   return (
//     <div>
//       <QrReader
//         delay={300}
//         onError={handleError}
//         onScan={handleScan}
//         style={{ width: '100%' }}
//       />
//       <p>{qrData}</p>
//     </div>
//   );
// };

// export default QRCodeScanner;
