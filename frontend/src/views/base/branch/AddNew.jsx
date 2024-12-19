import React, { useState } from 'react'

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
import background1 from '../../../assets/images/AB.png'
import saveImage from '../../../assets/images/check.gif'
import cancelImage from '../../../assets/images/delete.gif'

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
  
  const [error, setError] = useState('')
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setIsValid(true)

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

    const CNregex = /^(07[01245678][0-9]{7}|011[0-9]{7}|021[0-9]{7})$/;
    
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

    if(isValid) {
      axios('http://localhost:6431/branch', {
        data:branch,
        method:'POST'
      }).then(res => {
        if (res.data.statusCode === 201) {
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
        <CCard style={{ width: '640px' }}>
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
                  {!isValid && error === BRANCH_ERRORS.CODE_LENGTH_VALIDATION && <p style={{ color: 'red' }}>{error}</p>}
                  {!isValid && error === BRANCH_ERRORS.CODE_FORMAT_VALIDATION && <p style={{ color: 'red' }}>{error}</p>}
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
                  {!isValid && error === BRANCH_ERRORS.CONTACTNUMBER_LENGTH_VALIDATION && <p style={{ color: 'red' }}>{error}</p>}
                  {!isValid && error === BRANCH_ERRORS.CONTACTNUMBER_FORMAT_VALIDATION && <p style={{ color: 'red' }}>{error}</p>}
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
                  {!isValid && error === BRANCH_ERRORS.ZIPCODE_LENGTH_VALIDATION && <p style={{ color: 'red' }}>{error}</p>}
                  {!isValid && error === BRANCH_ERRORS.ZIPCODE_FORMAT_VALIDATION && <p style={{ color: 'red' }}>{error}</p>}
                </CRow>


                <CRow className="mb-3" xs='12'>
                  <CCol xs='6'>
                    <CButton 
                      color='success' 
                      variant='outline'
                      type='submit' 
                      className='mb-3'
                    >
                      <CImage src={saveImage} width={25} height={25}/>
                      {'  '}
                      Save
                    </CButton>
                  </CCol>
                  <CCol xs='6'>
                    <CButton 
                      color='secondary' 
                      type='submit' 
                      className='mb-3'
                      variant='outline'
                      onClick={() => window.confirm('Are you sure you want to cancel this form?') ? navigate('/branch') : ''}
                    >
                      <CImage src={cancelImage} width={25} height={25}/>
                      {'  '}
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
