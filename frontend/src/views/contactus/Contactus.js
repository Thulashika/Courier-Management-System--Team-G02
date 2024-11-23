import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CImage,
} from '@coreui/react'
import axios from 'axios'
import NFB from '../../assets/images/NoData.png'

const Contactus = () => {

  const [data,setData] = useState([])

  useEffect(() => {
    getAll()
  },[])

  const getAll = () => {
    axios('http://localhost:6431/contactus', {
      method:'GET',
      withCredentials: true,
    }).then(res => {
        console.log(res.data)
      setData(res.data)
    }).catch((err) => {
      console.error('Error fetching contactus:', err);
    });
  }

  return (

    <CRow>
      <CCol>
        <CCard className='mb-4'>
          <CHeader>
            <strong>All Contact us</strong>
            </CHeader>
            <CCardBody>
                <CRow className="mb-3">
                  <CTable className="table" bordered hover>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {Array.isArray(data) && data.length > 0 ? (
                        data.map((contactus, index) => (
                          <CTableRow key={index}>
                            <CTableDataCell>{contactus.name}</CTableDataCell>
                            <CTableDataCell>{contactus.email}</CTableDataCell>
                            <CTableDataCell>{contactus.phoneNumber}</CTableDataCell>
                            <CTableDataCell>{contactus.message}</CTableDataCell>
                          </CTableRow>
                        ))
                      ) : (
                        <CTableRow>
                          <CTableDataCell colSpan="7">
                            <CImage rounded src={NFB} width={300} height={300} align="center" />
                          </CTableDataCell>
                        </CTableRow>
                      )}
                    </CTableBody>
                  </CTable>
                </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Contactus

