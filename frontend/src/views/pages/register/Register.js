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
import { cilLockLocked, cilPhone, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

const Register = () => {

  const [user, setUser] = useState({
    fullName:'',
    role:'',
    staffId:'null',
    contactNumber:'',
    email:'',
    password:'',
    confirmPassword:''
  })

  const [Pvisible, setPVisible] = useState(false); 
  const [PCvisible, setPCVisible] = useState(false); 
  const [error, setError] = useState('')
  const [isValid, setIsValid] = useState(true);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()    
    setError('')
    setIsValid(true)

    const namePattern = /^[a-zA-Z]+(?:[ |.][a-zA-Z]+)*$/;

    if (!namePattern.test(user.fullName)) {
      setError('Full name is not in the correct format');
      setIsValid(false);
      return;
    }

    const validRole = ['CUSTOMER', 'STAFF'];

    if(!validRole.includes(user.role)){
      setError('Invalid role');
      setIsValid(false);
      return;
    }

    const SIdPattern = /^(?:Y)?[AMSD][0-9]{3}$/;

    if(user.role ==='STAFF' && user.staffId.length !==5 ) {
      setError('Staff Id must be exactly 5 digits');
      setIsValid(false);
      return;
    }
   

    if (user.role ==='STAFF' && !SIdPattern.test(user.staffId)) {
      setError('Staff Id is not in the correct format');
      setIsValid(false);
      return;
    }

    const CNMPpattern = /^(?:0)?([7][01245678][0-9]{7})$/;
    // const CNLPpattern = /^(?:0)(?:11|21|41|21|22|23|24|25|26|27|28|31|32|33|34|35|36|37|38|41)\d{7}$/;

    if (user.contactNumber.length !== 10) {
      setError('Contact number must be exactly 10 digits');
      setIsValid(false);
      return;
    }
    
    if (!CNMPpattern.test(user.contactNumber)) {
      setError('Contact number is not in the correct format');
      setIsValid(false);
      return;
    }

    if (!user.password || user.password.length < 4 || user.password.length > 10) {
      setError('Password must be between 4 and 10 characters')
      setIsValid(false)
      return;
    }

    if (user.confirmPassword !== user.password) {
      setError('Passwords do not match')
      setIsValid(false)
      return;
    }

    if(isValid) {
      axios('http://localhost:6431/userRegister', {
        data: user,
        method:'POST'
      }).then(res => {
        if (res.data.statusCode === 201) {
          alert("Created successfully")
          navigate('/')
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
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      id='full name'
                      type='text' 
                      placeholder="Full Name" 
                      autoComplete="full name" 
                      onChange={(e) => setUser({...user, fullName:e.target.value})}
                      required
                      />
                  </CInputGroup>
                  {!isValid && error === 'Full name is not in the correct format' && <p>{error}</p>}

                  <CInputGroup className="mb-3">
                    <CInputGroupText as="label"><CIcon icon={cilUser} /></CInputGroupText>
                    <CFormSelect 
                      id="role" 
                      name="role"
                      required 
                      onChange={(e) => setUser({...user, role:e.target.value})}
                    >
                      <option value=""> Select Role</option>
                      <option value="CUSTOMER">Customer</option>
                      <option value="STAFF">Staff</option>
                    </CFormSelect>
                  </CInputGroup>
                  {!isValid && error === 'Invalid role' && <p>{error}</p>}
                  
                  {
                    user.role === "STAFF" ? <>
                    <CInputGroup className="mb-3">
                      <CInputGroupText as="label"><CIcon icon={cilUser} /></CInputGroupText>
                      <CFormInput
                        id='Staff Id'
                        type='text' 
                        placeholder="Staff Id" 
                        autoComplete="Staff Id" 
                        onChange={(e) => setUser({...user, staffId:e.target.value})}
                        required
                      />
                    </CInputGroup>
                      {!isValid && error === 'Staff Id must be exactly 5 digits' && <p>{error}</p>}
                      {!isValid && error === 'Staff Id is not in the correct format' && <p>{error}</p>}</>
                     : null
                  }
                 
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      id='Contact Number'
                      type='text' 
                      placeholder="Contact Number" 
                      autoComplete="Contact Number" 
                      onChange={(e) => setUser({...user, contactNumber:e.target.value})}
                      required
                      
                    />
                  </CInputGroup>
                  {!isValid && error === 'Contact number must be exactly 10 digits' && <p>{error}</p>}
                  {!isValid && error === 'Contact number is not in the correct format' && <p>{error}</p>}

                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput 
                      id='Email'
                      type='email'
                      placeholder="Email" 
                      autoComplete="email"  
                      onChange={(e) => setUser({...user, email:e.target.value})}
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      id='Password'
                      type={Pvisible ? 'text' : 'password'}
                      placeholder="Password"
                      autoComplete="new-password"
                      // pattern='/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/'
                      onChange={(e) => setUser({...user, password:e.target.value})}
                      required
                      minLength={4}
                      maxLength={10}
                    />
                    <CInputGroupText>
                      <CButton onClick={() => setPVisible(!Pvisible)}>
                        {Pvisible ? <Icon icon={eye} size={20} /> : <Icon icon={eyeOff} size={20} />} 
                      </CButton>
                    </CInputGroupText>
                  </CInputGroup>
                  {!isValid && error === 'Password must be between 4 and 10 characters' && <p>{error}</p>}

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      id='ConfirmPassword'
                      type={PCvisible ? 'text' : 'password'}
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                      // pattern='/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/'
                      onChange={(e) => setUser({...user, confirmPassword:e.target.value})}
                      required
                      minLength={4}
                      maxLength={10}
                    />
                    <CInputGroupText>
                      <CButton onClick={() => setPCVisible(!PCvisible)}>
                        {PCvisible ? <Icon icon={eye} size={20} /> : <Icon icon={eyeOff} size={20} />} 
                      </CButton>
                    </CInputGroupText>
                  </CInputGroup>
                  {!isValid && error === 'Passwords do not match' && <p>{error}</p>}

                  <div className="d-grid">
                    <CButton color="success" type='submit'>Create Account</CButton>
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
