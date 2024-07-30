import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked} from '@coreui/icons'
import axios from 'axios'
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { LOGIN_ERRORS } from '../../../const'
import { AuthContext } from '../register/AuthProvider'


const Login = () => {

  const [visible, setVisible] =  useState(false)
  const [Fvisible, setFVisible] =  useState(false)
  const [error, setError] = useState('')
  const [isValid, setIsValid] = useState(true);

  const [user, setUser] = useState({
    email:'',
    password:'',
    id: 0
  })

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = (e)=> {
    e.preventDefault()
    setError('')
    setIsValid(true)

    if (!user.password || user.password.length < 4 || user.password.length > 10) {
      setError('Password must be between 4 and 10 characters')
      setIsValid(false)
      return;
    }

    if(isValid) {
      axios(`http://localhost:6431/userLogin`, {
        data: user,
        method: 'POST',
        withCredentials: true
      }).then(res => {
        if(res.data.statusCode === 200){
          alert("Login succesfully")
          login(res.data.email, res.data.id, res.data.role, res.data.fullName, res.data.image);
          navigate('/')
          // dispatch({type: 'SET_DETAILS', payload: {email: user.email, id: res.data.id}})
          // localStorage.setItem('token', res.data.token)
          // localStorage.removeItem('token')
        } else {
          alert("Not Login successfully")
        }
      }).catch(err => {
        alert("Login not successfully")
      })

      // const result = response.json();
      // if (response.ok) {
      //   // Handle successful login, e.g., store token
      //   console.log(result);
      // } else {
      //   // Handle login error
      //   console.error(result.message);
      // }
    }
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    setError('')
    setIsValid(true)


    if (!user.email) {
      setError(LOGIN_ERRORS.EMAIL_VALIDATION);
      setIsValid(false)
      return;
    }

    setFVisible(false)

    if(isValid) {
      axios('http://localhost:6431/forgot-password', {
        data: { email: user.email },
        method: 'POST'
      }).then(res => {
        if(res.data.statusCode === 200) {
          alert('Password reset email sent')
          // navigate('/reset-password')
        } else {
          alert('Not password reset email sent')
        }
      }).catch(err => {
        alert('Password reset email not sent')
      })
    }
  }

  return (
    
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput 
                        id='Email'
                        type='email' 
                        placeholder="Email" 
                        autoComplete="email" 
                        required
                        onChange={(e) => setUser({...user, email:e.target.value})}
                        />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type={visible ? 'text' : 'password'}
                        placeholder="Password"
                        autoComplete="current-password"
                        required
                        onChange={(e) => setUser({...user, password:e.target.value})}
                      />
                      <CInputGroupText>
                      <CButton onClick={() => setVisible(!visible)}>
                        {visible ? <Icon icon={eye} size={20} /> : <Icon icon={eyeOff} size={20} />} 
                      </CButton>
                    </CInputGroupText>
                    </CInputGroup>
                    {!isValid && error === 'Password must be between 4 and 10 characters' && <p>{error}</p>}

                    <CRow>
                      <CCol xs={6}>
                        <CButton type='submit' color='primary' className='px-4'>
                          Login
                        </CButton>
                      </CCol>
                      
                      <CCol xs={6} className='text-right'>
                        <CButton 
                          color='link'
                          onClick={() => setFVisible(!Fvisible)}
                        >
                          Forgot password?
                        </CButton>                       
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

              <CModal 
                alignment='center'
                visible={Fvisible}
                onClose={() => setFVisible(false)}
                aria-labelledby='ToggleBetweenModalsExample1'
              >
                <CModalHeader>
                  <CModalTitle id='ToggleBetweenModalsExample1'>Update Password</CModalTitle>
                </CModalHeader>

                <CModalBody>
                  <CForm onSubmit={handleForgotPassword}>
                    <CFormInput
                      label="Email"
                      type="email"
                      className="form-control"
                      id="recipient-email"
                      autoComplete="off"
                      value={user.email}
                      onChange={(e) => setUser({...user, email: e.target.value})}
                      required
                    />
                    {!isValid && error === LOGIN_ERRORS.EMAIL_VALIDATION && <p>{error}</p>}
                  
                    <CModalFooter>
                      <CButton
                        type='button' 
                        color='secondary' 
                        onClick={() => {
                          setFVisible(false)
                        }}
                      >
                        Close
                      </CButton>

                      <CButton
                        type='submit' 
                        color='primary'
                      >
                          Send Reset Link
                      </CButton>
                    </CModalFooter>
                  </CForm>
                </CModalBody>                 
              </CModal>

              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login;
