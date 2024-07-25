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
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { STAFF_ERRORS } from '../../../const'

const AddNewStaff = () => {

    const navigate = useNavigate()

    const [staff, setStaff] = useState({
        staffId:'',
        branch:'',
        position:''
    })

    const [allBranches, setAllBranches] = useState([])

    useEffect(() => {
        axios('http://localhost:6431/branch', {
            method:'get'
        }).then(res => {
            setAllBranches(res.data)
        })       
    }, [])

    const [error, setError] = useState('')
    const [isValid, setIsValid] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        setIsValid(true)

        const BCregex = /^(?:S)?[0-9]{4}$/;  

        if(staff.staffId.length !== 5) {
        setError(STAFF_ERRORS.ID_LENGTH_VALIDATION)
        setIsValid(false)
        return
        }

        if (!BCregex.test(staff.staffId)){
        setError(STAFF_ERRORS.ID_FORMAT_VALIDATION);
        setIsValid(false);
        return;
        }

        const confirmSubmit = window.confirm('Are you sure you want to submit this form?');

        if(isValid && confirmSubmit) {
        axios('http://localhost:6431/staff', {
            data:staff,
            method:'POST'
        }).then(res => {
            if (res.data.statusCode === 201) {
                alert("Successfully created")
                navigate('/staff')
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
            <CCol xs={12}>
                <CCard style={{ width: '18rem' }}>
                    <CCardHeader>
                        <strong>New Staff</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            <CRow className="mb-3"></CRow>

                            <CRow className="mb-3">
                                <CFormInput
                                    id='staffId'
                                    type='text'
                                    label='Staff Id'
                                    onChange={(e) => setStaff({...staff,staffId:e.target.value})}
                                />
                                {!isValid && error === STAFF_ERRORS.ID_LENGTH_VALIDATION && <p>{error}</p>}
                                {!isValid && error === STAFF_ERRORS.ID_FORMAT_VALIDATION && <p>{error}</p>}
                            </CRow>
                    
                            <CRow className="mb-3">
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
                                    {Array.isArray(allBranches) && allBranches.map((branch, index) => (
                                        <option key={index} value={branch.branchCode}>
                                            {branch.branchName}
                                        </option>
                                    ))}
                            </CFormSelect>
                            </CRow>
                            
                            <CRow className="mb-3">
                                <CFormSelect
                                    type='text'
                                    label='Position'
                                    id='Position'
                                    onChange={(e) => setStaff({...staff, position: e.target.value})}
                                >
                                    <option selected='' value=''>
                                        Open this select menu
                                    </option>
                                    <option value='ADMIN'>Admin</option>
                                    <option value='MANAGER'>Manager</option>
                                    <option value='STAFF'>Staff</option>                                
                                    <option value='DELIVERY_PERSON'>Delivery Person</option>
                                </CFormSelect>
                            </CRow>

                            <CRow className="mb-3">
                                <CCol xs={4} className='position-relative'>
                                    <CButton color='primary' type='submit'>
                                        Save
                                    </CButton>
                                </CCol>
                                <CCol xs={4} className='position-relative'>
                                    <CButton 
                                        color='secondary' 
                                        type='submit'
                                        onClick={() => window.confirm('Are you sure you want to cancel this form?') ? navigate('/staff') : ''}
                                    >
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

export default AddNewStaff
