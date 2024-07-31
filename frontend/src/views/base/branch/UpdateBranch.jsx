import React, { useEffect, useState } from 'react'

import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
} from '@coreui/react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { BRANCH_ERRORS } from '../../../const'

function useQuery() {
    const {search} = useLocation()
    return React.useMemo(() => new URLSearchParams(search), [search])
}

const UpdateBranch = () => {

    const query = useQuery()

    const [branch, setBranch] = useState({
      branchName:'',
      branchAddress:'',
      city:'',
      contactNumber:'',
      zipCode:''
    })

    const navigate = useNavigate()

    const [error, setError] = useState('')
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
      axios(`http://localhost:6431/branch/${query.get('id')}`, {
        method:'get'
    }).then(res => {
      setBranch(res.data)
    })
  }, [])

  const handleUpdate = (e) => {
    e.preventDefault()
    setError('')
    setIsValid(true)

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

    const confirmUpdate = window.confirm('Are you sure you want to update this form?');

    if(isValid && confirmUpdate) {
      axios(`http://localhost:6431/branch/${query.get('id')}`, {
        data:branch,
        method:'PUT'
      }).then(res => {
        if (res.data.statusCode === 201) {
          navigate('/branch')
        } else {
          alert("Not Updated successfully")
        }
      }).catch(err => {
        if(err.response?.data?.statusCode === 500) {
          alert(err.response.data.statusMessage)
          return
        }
        alert("Updated not successfully")
      })
    }
  }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <strong>Update Branch</strong>
          </CCardHeader>
          <CForm className="row g-3" onSubmit={handleUpdate}>
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
                  readOnly = {true}
                  defaultValue={branch?.branchCode}
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
                  defaultValue={branch?.branchName}
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
                  defaultValue={branch?.branchAddress}
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
                  defaultValue={branch?.city}
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
                  defaultValue={branch?.contactNumber}
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
                  defaultValue={branch?.zipCode}
                />
              </CCol>
              {console.log(branch?.zipCode)}
              {!isValid && error === BRANCH_ERRORS.ZIPCODE_LENGTH_VALIDATION && <p>{error}</p>}
              {!isValid && error === BRANCH_ERRORS.ZIPCODE_FORMAT_VALIDATION && <p>{error}</p>}
            </CRow>


            <CRow>
              <CCol xs='auto'>
                <CButton color='success' type='submit' className='mb-3'>Update</CButton>
              </CCol>
              <CCol xs='auto'>
                <CButton 
                  color='secondary' 
                  type='submit' 
                  className='mb-3'
                  onClick={() => window.confirm('Are you sure you want to cancel this update form?') ? navigate('/branch') : ''} 
                >
                  Cancel
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UpdateBranch
