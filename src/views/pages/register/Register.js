import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  const [user, setUser] = useState({
    fullName:'',
    role:'',
    contactNumber:'',
    email:'',
    password:'',
    confirmPassword:'',
    staffId:''
  })

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    axios('http://localhost:6431/user', {
      data: user,
      method:'POST'
    }).then(res => {
      alert(res.data)
      navigate('/')
    })
  }

  const [role,setRole] = useState([])

  const handleRole = (e) => {
    setRole(e.target.value)
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput 
                      placeholder="Full Name" 
                      autoComplete="full name" 
                      onChange={(e) => setUser({...user, fullName:e.target.value})}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText as="label" htmlFor="inputGroupSelect01"><CIcon icon={cilUser} /></CInputGroupText>
                    <CFormSelect 
                      id="inputGroupSelect01" 
                      name="role"
                      required 
                      onChange={handleRole}>
                      <option value=""> Select Role</option>
                      <option value="customer">Customer</option>
                      <option value="staff">Staff</option>
                    </CFormSelect>
                  </CInputGroup>
                  
                  {
                    role === "staff" ?
                    <CInputGroup className="mb-3">
                      <CInputGroupText as="label" htmlFor="inputGroupSelect01"><CIcon icon={cilUser} /></CInputGroupText>
                      <CFormInput 
                      placeholder="Staff Id" 
                      autoComplete="Staff Id" 
                      onChange={(e) => setUser({...user, staffId:e.target.value})}/>
                    </CInputGroup> : null
                  }
                  
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput 
                    placeholder="Contact Number" 
                    autoComplete="Contact Number" 
                    onChange={(e) => setUser({...user, contactNumber:e.target.value})}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput 
                    placeholder="Email" 
                    autoComplete="email"  
                    onChange={(e) => setUser({...user, email:e.target.value})}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={(e) => setUser({...user, password:e.target.value})}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                      onChange={(e) => setUser({...user, confirmPassword:e.target.value})}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success">Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
