import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { STAFF_ERRORS } from '../../../const'
import CIcon from '@coreui/icons-react'
import { cilCheckAlt, cilX } from '@coreui/icons'

function useQuery() {
    const {search} = useLocation()
    return React.useMemo(() => new URLSearchParams(search), [search])
}

const UpdateStaff = () => {

  const navigate = useNavigate()
  const query = useQuery()

  const [staff, setStaff] = useState({
    fullName:'',
    branch:'',
    contactNumber:'',
    position:'',
    email:'',
    password:''
})

const [allBranches, setAllBranches] = useState([])

    const [error, setError] = useState('')
    const [isValid, setIsValid] = useState(true);

    const getById = () =>{
        axios(`http://localhost:6431/staff/${query.get('id')}`, {
            method:'get'
        }).then(res => {
          setStaff(res.data)
        })
    }

    const getAllBranches = () => {
        axios('http://localhost:6431/branch', {
            method:'get'
        }).then(res => {
            setAllBranches(res.data)
        })
    }

    useEffect(() => {
        getById()
        getAllBranches()        
    }, [])

    const handleUpdate = (e) => {
        e.preventDefault()
        setError('')
        setIsValid(true)

        const CNregex = /^(?:0)?[7][01245678][0-9]{7}$/;
    
        if (staff.contactNumber.length !== 10) {
        setError(STAFF_ERRORS.CONTACTNUMBER_LENGTH_VALIDATION);
        setIsValid(false);
        return;
        }

        if (!CNregex.test(staff.contactNumber)){
        setError(STAFF_ERRORS.CONTACTNUMBER_FORMAT_VALIDATION);
        setIsValid(false);
        return;
        }

        const confirmSubmit = window.confirm('Are you sure you want to update this form?');

        if(isValid && confirmSubmit) {
        axios(`http://localhost:6431/staff/${query.get('id')}`, {
            data:staff,
            method:'PUT'
        }).then(res => {
            if (res.data.statusCode === 201) {
            navigate('/staff')
            } else {
            alert("Not updated successfully")
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
        <CCol xs={12}>
            <CCard style={{ width: '24rem' }}>
                <CCardHeader>
                    <strong>Update Staff</strong>
                </CCardHeader>
                <CCardBody>
                    <CForm className="row g-3" onSubmit={handleUpdate}>
                        <CRow className="mb-3"></CRow>
                        <CRow className="mb-3">
                            <CCol xs="auto">
                                <CFormInput
                                    id='staffId'  
                                    type='text'
                                    label='Staff Id'
                                    onChange={(e) => setStaff({...staff, staffId:e.target.value})}
                                    required
                                    defaultValue={staff?.staffId}
                                    readOnly
                                />
                            </CCol>
                        </CRow>

                        <CRow className="mb-3">
                            <CCol xs="auto">
                                <CFormInput
                                    id='fullName'
                                    type='text'
                                    label='Full Name'
                                    onChange={(e) => setStaff({...staff,fullName:e.target.value})}
                                    required
                                    defaultValue={staff?.fullName}
                                />
                            </CCol>
                        </CRow>

                        <CRow className="mb-3">
                            <CCol xs="auto">
                                <CFormSelect
                                    id='Branch'
                                    type='text'
                                    label='Branch'
                                    required
                                    onChange={(e) => setStaff({...staff, branch: e.target.value})}
                                    value={staff?.branch}
                                >
                                        <option selected='' value=''>
                                            Open this select menu
                                        </option>
                                        <option value='BR001'>BR001</option>
                                        <option value='BR002'>BR002</option>
                                </CFormSelect>
                            </CCol>
                        </CRow>

                        <CRow className="mb-3">
                            <CCol xs="auto">
                                <CFormInput
                                    type='text'
                                    label='Contact Number'
                                    id='Contact Number'
                                    onChange={(e) => setStaff({...staff,contactNumber:e.target.value})}
                                    required
                                    defaultValue={staff?.contactNumber}
                                />
                            </CCol>
                            {!isValid && error === STAFF_ERRORS.CONTACTNUMBER_LENGTH_VALIDATION && <p>{error}</p>}
                            {!isValid && error === STAFF_ERRORS.CONTACTNUMBER_FORMAT_VALIDATION && <p>{error}</p>}
                        </CRow>

                        <CRow className="mb-3">
                            <CCol xs="auto">
                                <CFormSelect
                                    type='text'
                                    label='Position'
                                    id='Position'
                                    required
                                    value={staff?.position}
                                >
                                    <option selected='' value=''>
                                        Open this select menu
                                    </option>
                                    <option value='ADMIN'>Admin</option>
                                    <option value='Manager'>Manager</option>
                                    <option value='Staff'>Staff</option>                                
                                    <option value='DELIVERY_PERSON'>Galle</option>
                                </CFormSelect>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs='auto' className='position-relative'>
                                <CButton color='success' type='submit'>
                                    <CIcon icon={cilCheckAlt}/>
                                    {'  '}
                                    Save
                                </CButton>
                            </CCol>
                            <CCol xs='auto' className='position-relative'>
                                <CButton 
                                    color='secondary' 
                                    type='submit'
                                    onClick={() => window.confirm('Are you sure you want to cancel this update form?') ? navigate('/staff') : ''}
                                >
                                    <CIcon icon={cilX}/>
                                    {'  '}
                                    Cancel
                                </CButton>
                            </CCol>
                        </CRow>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
  )
}

export default UpdateStaff
