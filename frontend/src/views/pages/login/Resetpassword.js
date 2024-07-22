import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import { RESET_PASSWORD_ERRORS } from '../../../const'

function useQuery() {
    const {search} = useLocation()
    return React.useMemo(() => new URLSearchParams(search), [search])
}

const Resetpassword = () => {

  const [user, setUser] = useState({
    password:'',
    confirmPassword:''
  })

  const [error, setError] = useState('')
  const [isValid, setIsValid] = useState(true);

  const navigate = useNavigate(); 

  const query = useQuery()

  useEffect(() => {
    query.get('token')
  },[])

  const handleResetPassword = (e) => {
    e.preventDefault()
    setError('')
    setIsValid(true)


    if (!user.password) {
      setError(RESET_PASSWORD_ERRORS.PASSWORD_VALIDATION);
      setIsValid(false)
      return;
    }

    if (user.password.length < 4 || user.password.length > 10) {
      setError(RESET_PASSWORD_ERRORS.PASSWORD_LENGTH_VALIDATION)
      setIsValid(false)
      return;
    }

    if (!user.confirmPassword) {
        setError(RESET_PASSWORD_ERRORS.CONFIRM_PASSWORD_VALIDATION);
        setIsValid(false)
        return;
    }

    if (user.confirmPassword.length < 4 || user.confirmPassword.length > 10) {
      setError(RESET_PASSWORD_ERRORS.CONFIRM_PASSWORD_LENGTH_VALIDATION)
      setIsValid(false)
      return;
    }

    if(isValid) {
      axios('http://localhost:6431/reset-password', {
        data: { password: user.password, confirmPassword: user.confirmPassword, token: query.get('token') },
        method: 'POST'
      }).then(res => {
        if(res.data.statusCode === 200) {
          alert('Reset password success')
          navigate('/login')
        } else {
          alert('Not success reset password')
        }
      }).catch(err => {
        alert('Reset password not success')
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
                        <CForm onSubmit={handleResetPassword}>
                            <h3>Reset Password</h3>
                            <CRow className="mb-3">
                              <CFormInput
                                  type='password'
                                  label="New Password"
                                  className="form-control"
                                  id="recipient-password"
                                  autoComplete="off"
                                  onChange={(e) => setUser({...user, password:e.target.value})}
                                  required
                              />
                              {!isValid && error === RESET_PASSWORD_ERRORS.PASSWORD_FORMAT_VALIDATION && <p>{error}</p>}
                              {!isValid && error === RESET_PASSWORD_ERRORS.PASSWORD_LENGTH_VALIDATION && <p>{error}</p>}
                            </CRow>
                           
                            <CRow className="mb-3">
                              <CFormInput
                                  type='password'
                                  label="Confirm Password"
                                  className="form-control"
                                  id="recipient-confirm-password"
                                  autoComplete="off"
                                  onChange={(e) => setUser({...user, confirmPassword:e.target.value})}
                                  required
                              />
                              {!isValid && error === RESET_PASSWORD_ERRORS.CONFIRM_PASSWORD_FORMAT_VALIDATION && <p>{error}</p>}
                              {!isValid && error === RESET_PASSWORD_ERRORS.CONFIRM_PASSWORD_LENGTH_VALIDATION && <p>{error}</p>}
                            </CRow>

                            <CRow className="mb-3">
                              <CCol xs="auto">
                                <CButton
                                  type='submit' 
                                  color='secondary'
                                  onClick={() => window.confirm('Are you sure you want to cancel this form?') ? navigate('/login') : ''}
                                >
                                  Close
                                </CButton>
                              </CCol>
                            
                              <CCol xs="auto">
                                <CButton
                                  type='submit' 
                                  color='primary'
                                >
                                  Update
                                </CButton>
                              </CCol>
                            </CRow>                            
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Resetpassword
