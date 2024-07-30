import { CCard, CCardBody, CCol, CContainer, CRow  } from '@coreui/react'
import React from 'react'

const Details = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={9} lg={7} xl={6}>
          <CCard className="mx-4">
            <CCardBody className="p-4">
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
    </div>
  )
}

export default Details