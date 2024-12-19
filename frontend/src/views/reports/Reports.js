import React, { useState } from 'react'
import { 
  CCard, 
  CCardBody, 
  CCol, 
  CRow, 
  CButton, 
  CFormLabel,
  CFormSelect,
  CFormInput,
  CImage,
  CContainer,
  CCardTitle,
  CCardText
} from '@coreui/react'
import "react-datepicker/dist/react-datepicker.css";
import CIcon from '@coreui/icons-react';
import { cilPrint } from '@coreui/icons';
import axios from 'axios';
import NFPR from '../../assets/images/NoData.png'
import reportImage from '../../assets/images/click.gif'

const Reports = () => {

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [status, setStatus] = useState('All')
  const [data, setData] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const handleViewReport = (e) => {
    if (!fromDate || !toDate || !status) {
      alert("Please select a date range and status.");
      return;
    }

    axios('http://localhost:6431/report', {
      method: 'GET',
      params: {
        fromDate,
        toDate,
        status,
      },
    }).then(res => {
      setData(res.data)
      setShowReport(true)
    }).catch(err => {
      console.error('Error fetching data:', err)
    })
}

const getStatus = (status) => {
  switch (status) {
    case 'Processed_and_Ready_to_Ship':
      return 'info'
    case 'ACCEPTED':
      return 'primary'
    case 'SHIPPING':
      return 'warning'
    case 'DELIVERED':
      return 'success' 
    default:
      return 'danger'
  }
}

  return (
    <CContainer className='mb-4'>
          <CCard className='justify-content-center'>
                <h3><strong>Reports</strong></h3> 
                  <CRow className="mb-3">
                    <CCol xs={3}>
                      <CFormLabel>Status</CFormLabel>
                      <CFormSelect 
                        type='select'
                        className="mb-3" 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)}
                        style={{ backgroundColor: 'transparent' }}
                      >
                        <option>---Select---</option>
                        <option>All</option>
                        <option value='ACCEPTED'>Accepted</option>
                        <option value='Processed_and_Ready_to_Ship'>Processed_and_Ready_to_Ship</option>
                        <option value='SHIPPING'>Shipping</option>
                        <option value='DELIVERED'>Delivered</option>
                      </CFormSelect>
                    </CCol>

                    <CCol xs={3} >
                      <CFormInput                        
                        label='From' 
                        type='date' 
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        style={{ backgroundColor: 'transparent' }}
                      />
                    </CCol>

                    <CCol xs={3} >
                      <CFormInput
                        label='To' 
                        type='date'
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        style={{ backgroundColor: 'transparent'}}
                        min={fromDate}
                      />
                    </CCol>

                    <CCol xs={3}>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <CButton 
                        color="primary"
                        variant='outline'
                        onClick={() => handleViewReport()}>
                          <CImage src={reportImage} height={25} width={25}/>
                          View Report
                      </CButton>
                      </div>
                    </CCol>
                  </CRow>
              
                {showReport && (
                  <CRow>
                    <CRow className="mb-3">
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CButton 
                          color='primary' 
                          className="me-md-2"
                          onClick={() => window.print()}>
                          <CIcon icon={cilPrint} />
                          Print
                        </CButton>
                      </div>
                    </CRow>

                    <style>
                            {`
                              .transparent-card {
                                background-color: rgba(255, 255, 255, 0.5) !important; /* White background with 50% opacity */
                                border: 1px solid rgba(0, 0, 0, 0.1); /* Light border */
                                border-radius: 8px; /* Rounded corners */
                              }

                              /* Adjust text color for better contrast */
                              .transparent-card .card-title,
                              .transparent-card .card-text {
                                color: #333; /* Darker text color for visibility */
                              }
                            `}
                    </style>


                    <CRow>
                      {data.length > 0 ? (
                        data.map((report, index) => (
                          <CCol xs="12" sm="6" md="4" key={index}>
                            <CCard className={`mb-3 transparent-card bg-${getStatus(report.status)} `}>
                              <CCardBody>
                                <CCardTitle><h6>{`Report ${index + 1}`}</h6></CCardTitle>
                                <CCardText>
                                  <h6><strong>Date: {`from ${report.senderDate} to ${report.recipientDate}`}</strong></h6><br />
                                  <h6><strong>Sender: {`${report.senderFirstName} ${report.senderLastName}`}</strong></h6><br />
                                  <h6><strong>Recipient: {`${report.recipientFirstName} ${report.recipientLastName}`}</strong></h6><br />
                                  <h6><strong>Amount: {report.parcelTotalAmount}</strong></h6><br />
                                  <h6><strong>Status:<span className={`badge bg-${getStatus(report.status)}`}>{report.status}</span></strong> </h6>
                                </CCardText>
                              </CCardBody>
                            </CCard>
                          </CCol>
                        ))
                      ) : (
                          <CCol xs="12" className="text-center">
                            <CImage rounded style={{ background: 'transparent', backgroundColor: 'gray' }}  src={NFPR} width={200} height={200} align="center" />
                            <h4 className="text-danger">No reports found!</h4>
                          </CCol>
                      )}
                    </CRow>

                  </CRow>
                )}
          </CCard>
    </CContainer>
  )
}

export default Reports
