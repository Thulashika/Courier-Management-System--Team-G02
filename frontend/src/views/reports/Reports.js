import React, { useState } from 'react'
import { 
  CCard, 
  CCardBody, 
  CCol, 
  CCardHeader, 
  CRow, 
  CButton, 
  CTable, 
  CTableBody, 
  CTableHead, 
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormLabel,
  CFormSelect,
  CFormInput,
  CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CContainer,
  CCarousel,
  CCarouselItem,
  CCardImageOverlay
} from '@coreui/react'
import "react-datepicker/dist/react-datepicker.css";
import CIcon from '@coreui/icons-react';
import { cilPrint } from '@coreui/icons';
import axios from 'axios';
import NFPR from '../../assets/images/NFPR.avif'
import background1 from '../../assets/images/R2.jpg'

const Reports = () => {

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [status, setStatus] = useState('All')
  const [data, setData] = useState([]);
  const [showReport, setShowReport] = useState(false);
  // const [visible, setVisible] = useState(false)

  const handleViewReport = (e) => {
    // setVisible(!visible)
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

  return (
    <CContainer className='mb-4'>
      <CCarousel>
        <CCarouselItem>
          <CCard className='justify-content-center'>
            <CImage className="d-block w-100" src={background1} alt="slide 1" />
            <CCardImageOverlay> 
              <CCard className='mb-4'>
                <CCardHeader>Reports</CCardHeader>
                <CCardBody>
                  <CRow className="mb-3">
                    <CCol xs={3}>
                      <CFormLabel >Status</CFormLabel>
                      {/* className="col-sm-2 col-form-label" */}
                      <CFormSelect 
                      type='select'
                        className="mb-3" 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option>All</option>
                        <option value='ACCEPTED'>Accepted</option>
                        <option value='COLLECTED'>Collected</option>
                        <option value='SHIPPED'>Shipped</option>
                        <option value='IN-TRANSIT'>In-Transit</option>
                        <option value='DELIVERED'>Delivered</option>
                      </CFormSelect>
                    </CCol>

                    <CCol xs={3}>
                      <CFormInput 
                        label='From' 
                        type='date' 
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                      />
                    </CCol>

                    <CCol xs={3}>
                      <CFormInput 
                        label='To' 
                        type='date'
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        min={fromDate}
                      />
                    </CCol>

                    <CCol xs={3}>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <CButton 
                        color="info"
                        onClick={() => handleViewReport()}>
                          View Report
                      </CButton>
                      </div>
                    </CCol>
                  </CRow>
                </CCardBody>
              
                {showReport && (
                  <CCardBody>
                  <CRow className="mb-3">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <CButton 
                        color='success' 
                        className="me-md-2"
                        onClick={() => window.print()}>
                        <CIcon icon={cilPrint} />
                        Print
                      </CButton>
                    </div>
                  </CRow>

                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope='col'>Id</CTableHeaderCell>
                        <CTableHeaderCell scope='col'>Date</CTableHeaderCell>
                        <CTableHeaderCell scope='col'>Sender</CTableHeaderCell>
                        <CTableHeaderCell scope='col'>Recipient</CTableHeaderCell>
                        <CTableHeaderCell scope='col'>Amount</CTableHeaderCell>
                        <CTableHeaderCell scope='col'>Status</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {data.length > 0 ? (
                        data.map((report,index) => (
                          <CTableRow key={index}>
                          <CTableDataCell> {index+1} </CTableDataCell>
                          <CTableDataCell> {`from ${report.senderDate} to ${report.recipientDate}`} </CTableDataCell>
                          <CTableDataCell> {`${report.senderFirstName} ${report.senderLastName}`} </CTableDataCell>
                          <CTableDataCell> {`${report.recipientFirstName} ${report.recipientLastName}`}</CTableDataCell>
                          <CTableDataCell> {report.parcelTotalAmount} </CTableDataCell>
                          <CTableDataCell> {report.status} </CTableDataCell>
                        </CTableRow>
                        ))
                        ):(
                          <CTableRow>
                          <CTableDataCell colSpan="9">
                          {/* <CModal
                            alignment="center"
                            visible={visible}
                            onClose={() => setVisible(false)}
                            aria-labelledby="VerticallyCenteredExample"
                          >
                            <CModalBody>
                              Not Found Parcel !!!
                              <div>
                                <CButton color="secondary" onClick={() => setVisible(false)}>
                                  Close
                                </CButton>
                              </div>        
                            </CModalBody>
                          </CModal> */}

                            <CImage rounded src={NFPR} width={200} height={200} align="center"/>
                          </CTableDataCell>
                        </CTableRow>
                        )}                
                    </CTableBody>
                  </CTable>
                </CCardBody>
                )}
              
              </CCard>
            </CCardImageOverlay>
          </CCard>
        </CCarouselItem>
      </CCarousel>
    </CContainer>
  )
}

export default Reports
