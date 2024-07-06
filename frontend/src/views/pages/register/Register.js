import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
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
import validator from 'validator';


const Register = () => {

  const [user, setUser] = useState({
    fullName:'',
    role:'',
    contactNumber:'',
    email:'',
    password:'',
    showPassword:'',
    confirmPassword:'',
    staffId:''
  })

  // const [values, setValues] = {
  //   password:'',
  //   showPassword:''
  // }

  const [errors, setErrors] = useState({ 
    contactNumber:'',
    password: '', 
    confirmPassword: '' 
  });

  const [isValid, setIsValid] = useState({ 
    contactNumber: true,
    password: true, 
    confirmPassword: true 
  });

  const navigate = useNavigate()

  const validate = (password, confirmPassword) => {
    let passwordError = '';
    let confirmPasswordError = '';
    let passwordValid = true;
    let confirmPasswordValid = true;

    // if(contactNumber.length < 10) {
    //   contactNumberError = 'Contact Number must be equal to 10 characters';
    //   contactNumberValid = false;
    // }

    // const pattern = /^\d{10}$/;

    // if (!pattern.test(contactNumber)) {
    //   contactNumberError = 'Contact number must be exactly 10 digits';
    //   contactNumberValid = false;
    // }

    if (!password || password.length < 4 || password.length > 10) {
      passwordError = 'Password must be between 4 and 10 characters';
      passwordValid = false;
    }
    if (confirmPassword !== password) {
      confirmPasswordError = 'Passwords do not match';
      confirmPasswordValid = false;
    }

    setErrors({ password: passwordError, confirmPassword: confirmPasswordError });
    setIsValid({ password: passwordValid, confirmPassword: confirmPasswordValid });
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    // const contactNumber = e.target.value;
    // const pattern = /^\d{10}$/;
    // validate(pattern.test(contactNumber));
    // setUser({ ...user, contactNumber });

    const password = e.target.value || '';
    setUser({ ...user, password });
    validate(password, user.confirmPassword);

    const confirmPassword = e.target.value || '';
    setUser({ ...user, confirmPassword });
    validate(user.password, confirmPassword);

    if (isValid.password && isValid.confirmPassword) {
      console.log('Form submitted', user)
      // Handle form submission
    }

    const contactNumber = e.target.value || '';
    setUser({ ...user, contactNumber });

    // Validate contact number
    if (!validator.isMobilePhone(contactNumber, 'any', { strictMode: true })) {
      setErrors((prevErrors) => ({ ...prevErrors, contactNumber: 'Invalid contact number' }));
      setIsValid((prevIsValid) => ({ ...prevIsValid, contactNumber: false }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, contactNumber: '' }));
      setIsValid((prevIsValid) => ({ ...prevIsValid, contactNumber: true }));
    }

    axios('http://localhost:6431/user', {
      data: user,
      method:'POST'
    }).then(res => {
      if (res.data.statusCode === 201) {
        navigate('/')
      } else {
        alert("Not created successfully")
      }
    }).catch(err => {
      alert("Not created successfully")
    })
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
                      required={true}
                      />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText as="label"><CIcon icon={cilUser} /></CInputGroupText>
                    <CFormSelect 
                      id="role" 
                      name="role"
                      required={true} 
                      onChange={(e) => setUser({...user, role:e.target.value})}>
                      <option value=""> Select Role</option>
                      <option value="CUSTOMER">Customer</option>
                      <option value="STAFF">Staff</option>
                    </CFormSelect>
                  </CInputGroup>
                  
                  {
                    user.role === "STAFF" ?
                    <CInputGroup className="mb-3">
                      <CInputGroupText as="label"><CIcon icon={cilUser} /></CInputGroupText>
                      <CFormInput
                        id='Staff Id'
                        type='text' 
                        placeholder="Staff Id" 
                        autoComplete="Staff Id" 
                        onChange={(e) => setUser({...user, staffId:e.target.value})}
                        required={true}/>
                    </CInputGroup> : null
                  }
                  
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      id='Contact Number'
                      type='text' 
                      // value={contactNumber}
                      placeholder="Contact Number" 
                      autoComplete="Contact Number" 
                      onChange={(e) => setUser({...user, contactNumber:e.target.value})}
                      required={true}
                      // pattern='/^\d{10}$/'
                      // valid={isValid}
                      // invalid={!isValid}
                    />
                    {!isValid.contactNumber && <CFormFeedback invalid>{errors.contactNumber}</CFormFeedback>}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput 
                      id='Email'
                      type='email'
                      placeholder="Email" 
                      autoComplete="email"  
                      onChange={(e) => setUser({...user, email:e.target.value})}
                      required={true}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      id='Password'
                      type={user.showPassword ? 'text' : 'password'}
                      value={user.password}
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={(e) => setUser({...user, password:e.target.value})}
                      required={true}
                      minLength={4}
                      maxLength={10}
                      // valid={isValid.password}
                      // invalid={!isValid.password}
                      />
                      <CInputGroupText>
                        <CButton 
                        onClick={() => setUser({...user, showPassword:!user.showPassword})}
                        onMouseDown={(e) => (e.preventDefault)}
                        >
                          {/* <CIcon icon={user.showPassword ?}/> */}
                        </CButton>
                      </CInputGroupText>
                      {!isValid.password && <CFormFeedback invalid>{errors.password}</CFormFeedback>}
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      id='ConfirmPassword'
                      type="password"
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                      onChange={(e) => setUser({...user, confirmPassword:e.target.value})}
                      required={true}
                      minLength={4}
                      maxLength={10}
                      // valid={isValid.confirmPassword}
                      // invalid={!isValid.confirmPassword}
                      />
                      {!isValid.confirmPassword && <CFormFeedback invalid>{errors.confirmPassword}</CFormFeedback>}
                  </CInputGroup>
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
