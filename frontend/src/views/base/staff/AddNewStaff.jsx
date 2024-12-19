import React, { useContext, useEffect, useState } from 'react'
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
  CImage
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { STAFF_ERRORS } from '../../../const'
import background1 from '../../../assets/images/AS.jpg'
import saveImage from '../../../assets/images/check.gif'
import cancelImage from '../../../assets/images/delete.gif'
import { AuthContext } from '../../pages/register/AuthProvider'

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

        const BCregex = /^(?:Y)?[AMSD][0-9]{3}$/;

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

        if(isValid) {
        axios('http://localhost:6431/staff', {
            data:staff,
            method:'POST'
        }).then(res => {
            if (res.data.statusCode === 201) {
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

    const { userDetails } = useContext(AuthContext)

    return (
        <CRow className='mb-3'>
            <CCol xs={12}>
                <CCard style={{ width: '640px' }}>
                    <CCardHeader>
                        <strong>New Staff</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                        <CCol xs={6}>
                            <CForm className="row g-3" onSubmit={handleSubmit}>
                                <CRow className="mb-3"></CRow>

                                <CRow className="mb-3">
                                    <CCol xs="auto">
                                        <CFormInput
                                            id='staffId'
                                            type='text'
                                            label='Staff Id'
                                            onChange={(e) => setStaff({...staff,staffId:e.target.value})}
                                        />
                                    </CCol>
                                    {!isValid && error === STAFF_ERRORS.ID_LENGTH_VALIDATION && <p style={{ color: 'red' }}>{error}</p>}
                                    {!isValid && error === STAFF_ERRORS.ID_FORMAT_VALIDATION && <p style={{ color: 'red' }}>{error}</p>}
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
                                            {userDetails.position === "MANAGER" ? (
                                                <option value={userDetails.branchCode}>{userDetails.branchCode}</option>
                                            ) : (
                                                <>
                                                    <option value="BR001">BR001</option>
                                                    <option value="BR002">BR002</option>
                                                    <option value="BR003">BR003</option>
                                                </>
                                            )}
                                        </CFormSelect>
                                    </CCol>
                                </CRow>
                                
                                <CRow className="mb-3">
                                    <CCol xs="auto">
                                        <CFormSelect
                                            type='text'
                                            label='Position'
                                            id='Position'
                                            onChange={(e) => setStaff({...staff, position: e.target.value})}
                                        >
                                            <option selected='' value=''>
                                                Open this select menu
                                            </option>
                                            { userDetails.position === 'MANAGER' ?
                                                <>
                                                    <option value='STAFF'>Staff</option>                                
                                                    <option value='DELIVERY_PERSON'>Delivery Person</option>
                                                </>
                                                :
                                                <>
                                                    <option value='ADMIN'>Admin</option>
                                                    <option value='MANAGER'>Manager</option>
                                                    <option value='STAFF'>Staff</option>                                
                                                    <option value='DELIVERY_PERSON'>Delivery Person</option>
                                                </>
                                            }
                                        </CFormSelect>
                                    </CCol>
                                </CRow>

                                <CRow className="mb-3">
                                    <CCol xs='auto' className='position-relative'>
                                        <CButton color='success' type='submit' variant='outline'>
                                            <CImage src={saveImage} width={25} height={25}/>
                                            {'  '}
                                            Save
                                        </CButton>
                                    </CCol>
                                    <CCol xs='auto' className='position-relative'>
                                        <CButton 
                                            color='secondary' 
                                            variant='outline'
                                            type='submit'
                                            onClick={() => window.confirm('Are you sure you want to cancel this form?') ? navigate('/staff') : ''}
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

export default AddNewStaff
