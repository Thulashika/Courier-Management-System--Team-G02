import React, { useState } from 'react'
import { 
  CCard, 
  CCol,
  CCardHeader, 
  CRow, 
  CButton, 
  CFormLabel, 
  CFormInput
} from '@coreui/react'

const Track = () => {

  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingStatus, setTrackingStatus] = useState([]);
  const [error, setError] = useState('');

  const handleSearchClick = () => {
    if (trackingNumber.trim() === '') {
      setError('Please enter a valid tracking number');
      return;
    }

    setError('');
    
    // Simulate fetching data
    const simulatedData = [
      { status: 'Item accepted by Courier', date: '2024-07-17 10:00:00' },
      { status: 'Collected', date: '2024-07-17 12:00:00' },
      { status: 'Shipped', date: '2024-07-17 15:00:00' },
      { status: 'In-Transit', date: '2024-07-18 08:00:00' },
      { status: 'Delivered', date: '2024-07-18 13:00:00' }
    ];

    setTrackingStatus(simulatedData);
  };

  return (
    <CCard >
      <CRow className="mb-3">
        <CCol xs={12}>
          <CCardHeader>
            <strong>Track</strong>
          </CCardHeader>
          <CRow className="mb-3"/>
          <CRow className="mb-3 text-center">
            <CFormLabel htmlFor="inputTrackingNumber" className="col-sm-4 col-form-label">Enter Tracking Number</CFormLabel>
            <CCol sm={4}>
              <CFormInput 
                type="text" 
                id="inputTrackingNumber"
                value={trackingNumber} 
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </CCol>
            <CCol sm={4}>
              <CButton color='primary' onClick={handleSearchClick}>Search</CButton>
            </CCol>
          </CRow>
          {/* <CRow className="mb-3 text-center">
            <p>Item accepted by Courier</p>
          </CRow>
          <CRow className="mb-3 text-center">
            <p>Collected</p>
          </CRow>
          <CRow className="mb-3 text-center">
            <p>Shipped</p>
          </CRow>
          <CRow className="mb-3 text-center">
            <p>In-Transit</p>
          </CRow>
          <CRow className="mb-3 text-center">
            <p>Delivered</p>
          </CRow> */}

          {error && (
            <CRow className="mb-3 text-center">
              <p style={{ color: 'red' }}>{error}</p>
            </CRow>
          )}
          {trackingStatus.length > 0 && trackingStatus.map((status, index) => (
            <CRow key={index} className="mb-3 text-center">
              <p>{status.status} - {status.date}</p>
            </CRow>
          ))}
        </CCol>
      </CRow>
    </CCard>
  )
}

export default Track
