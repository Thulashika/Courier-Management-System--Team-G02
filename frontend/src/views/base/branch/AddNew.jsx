import React, { useContext, useState } from 'react'

import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CCardBody,
  CImage,
} from '@coreui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BRANCH_ERRORS } from '../../../const'
import { AuthContext } from '../../pages/register/AuthProvider'
import background1 from '../../../assets/images/AB.png'
import CIcon from '@coreui/icons-react'
import { cibDell, cilCheck, cilCheckAlt, cilContrast, cilSave, cilX } from '@coreui/icons'

const AddNew = () => {

  const [branch, setBranch] = useState({
    branchCode:'',
    branchName:'',
    branchAddress:'',
    city:'',
    contactNumber:'',
    zipCode:''
  })

  const navigate = useNavigate()

  const { branchCount } = useContext(AuthContext);
  
  const [error, setError] = useState('')
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setIsValid(true)

    // const BCregex = /^(?:Br)?[A-z]{2}?[0-9]{2}$/;  
    const BCregex = /^(?:BR)?[0-9]{3}$/;  

    if(branch.branchCode.length !== 5) {
      setError(BRANCH_ERRORS.CODE_LENGTH_VALIDATION)
      setIsValid(false)
      return
    }

    if (!BCregex.test(branch.branchCode)){
      setError(BRANCH_ERRORS.CODE_FORMAT_VALIDATION);
      setIsValid(false);
      return;
    }

    const CNregex = /^(?:0)?[7][01245678][0-9]{7}$/;
    
    if (branch.contactNumber.length !== 10) {
      setError(BRANCH_ERRORS.CONTACTNUMBER_LENGTH_VALIDATION);
      setIsValid(false);
      return;
    }

    if (!CNregex.test(branch.contactNumber)){
      setError(BRANCH_ERRORS.CONTACTNUMBER_FORMAT_VALIDATION);
      setIsValid(false);
      return;
    }

    // Validate zip code (assuming it should be a 5-digit number)
    const ZCodeRegex = /^[0-9]{5}$/;

    if(branch.zipCode.length !== 5) {
      setError(BRANCH_ERRORS.ZIPCODE_LENGTH_VALIDATION);
      setIsValid(false);
      return;
    }

    if (!ZCodeRegex.test(branch.zipCode)){
      setError(BRANCH_ERRORS.ZIPCODE_FORMAT_VALIDATION);
      setIsValid(false);
      return;;
    }

    const confirmSubmit = window.confirm('Are you sure you want to submit this form?');

    if(isValid && confirmSubmit) {
      axios('http://localhost:6431/branch', {
        data:branch,
        method:'POST'
      }).then(res => {
        if (res.data.statusCode === 201) {
          // branchCount(res.data.id)
          navigate('/branch')
        } else {
          alert("Not created successfully")
        }
      }).catch(err => {
        if(err.response?.data?.statusCode === 500) {
          alert(err.response.data.statusMessage)
          return
        }
        alert("Created not successfully")
      })
    }

  }

  return (
    <CRow>
      <CCol>
        <CCard style={{ width: '840px' }}>
          <CCardHeader>
            <strong>New Branch</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
            <CCol xs={6}>
              <CForm className="row g-3" onSubmit={handleSubmit}>
                <CRow className="mb-5"></CRow>

                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputCode">Branch Code</CFormLabel>
                  <CCol xs="auto">
                    <CFormInput 
                      type='text' 
                      id='code' 
                      className='form-control'
                      onChange={(e) => setBranch({ ...branch, branchCode: e.target.value })}
                      required
                    />
                  </CCol>
                  {!isValid && error === BRANCH_ERRORS.CODE_LENGTH_VALIDATION && <p>{error}</p>}
                  {!isValid && error === BRANCH_ERRORS.CODE_FORMAT_VALIDATION && <p>{error}</p>}
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputCode">Branch Name</CFormLabel>
                  <CCol xs="auto">
                    <CFormInput 
                      type='text' 
                      id='name' 
                      className='form-control'
                      onChange={(e) => setBranch({ ...branch, branchName: e.target.value })}
                      required
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputAddress">Branch Address</CFormLabel>
                  <CCol xs="auto">
                    <CFormInput 
                      type='text' 
                      id='address'
                      className='form-control'
                      onChange={(e) => setBranch({ ...branch, branchAddress: e.target.value })}
                      required
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputCity">City</CFormLabel>
                  <CCol xs="auto">
                    <CFormInput 
                      type='text' 
                      id='city'
                      className='form-control'
                      onChange={(e) => setBranch({ ...branch, city: e.target.value })}
                      required
                    />
                  </CCol>
                </CRow>
                
                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputAddress">Contact Number</CFormLabel>
                  <CCol xs="auto">
                    <CFormInput 
                      type='text' 
                      id='contactNumber'
                      className='form-control'
                      onChange={(e) => setBranch({ ...branch, contactNumber: e.target.value })}
                      required
                    />
                  </CCol>
                  {!isValid && error === BRANCH_ERRORS.CONTACTNUMBER_LENGTH_VALIDATION && <p>{error}</p>}
                  {!isValid && error === BRANCH_ERRORS.CONTACTNUMBER_FORMAT_VALIDATION && <p>{error}</p>}
                </CRow>
                
                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputAddress">Zip Code/ Postal Code</CFormLabel>
                  <CCol xs="auto">
                    <CFormInput 
                      type='text' 
                      id='zipCode'
                      className='form-control'
                      onChange={(e) => setBranch({ ...branch, zipCode: e.target.value })}
                      required
                    />
                  </CCol>
                  {!isValid && error === BRANCH_ERRORS.ZIPCODE_LENGTH_VALIDATION && <p>{error}</p>}
                  {!isValid && error === BRANCH_ERRORS.ZIPCODE_FORMAT_VALIDATION && <p>{error}</p>}
                </CRow>


                <CRow className="mb-3">
                  <CCol xs='auto'>
                    <CButton 
                      color='primary' 
                      type='submit' 
                      className='mb-3'
                    >
                      <CIcon icon={cilCheckAlt}/>
                      Save
                    </CButton>
                  </CCol>
                  <CCol xs='auto'>
                    <CButton 
                      color='secondary' 
                      type='submit' 
                      className='mb-3'
                      onClick={() => window.confirm('Are you sure you want to cancel this form?') ? navigate('/branch') : ''}
                    >
                      <CIcon icon={cilX}/>
                      Cancel
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCol>
            <CCol xs={6}>
                <CImage rounded src={background1} width={200} height={200} />
            </CCol>
            </CRow>
        </CCardBody>
        </CCard>
      </CCol>
    </CRow>

  )
}

export default AddNew
