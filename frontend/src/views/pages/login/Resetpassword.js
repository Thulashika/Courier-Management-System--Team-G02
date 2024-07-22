import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
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
import { toast } from 'react-toastify'
import { LOGIN_ERRORS } from '../../../const'

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


    // if (!password) {
    //   setError(LOGIN_ERRORS.PASSWORD_VALIDATION);
    //   setIsValid(false)
    //   return;
    // }

    // if (!confirmPassword) {
    //     setError(LOGIN_ERRORS.CONFIRM_PASSWORD_VALIDATION);
    //     setIsValid(false)
    //     return;
    // }

    if(isValid) {
      axios('http://localhost:6431/reset-password', {
        // data: { password: password, confirmPassword: confirmPassword, token: query.get('token') },
        method: 'POST'
      }).then(res => {
        if(res.data.statusCode === 200) {
          alert('Reset password success')
          navigate('/')
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
                            <CFormInput
                                type='password'
                                label="New Password"
                                className="form-control"
                                id="recipient-password"
                                autoComplete="off"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <CFormInput
                                type={'password'}
                                label="Confirm Password"
                                className="form-control"
                                id="recipient-confirm-password"
                                autoComplete="off"
                                // value={confirmPassword}
                                // onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />

                            <CButton
                                type='submit' 
                                color='secondary'
                                onClick={() => window.confirm('Are you sure you want to cancel this form?') ? navigate('/login') : ''}
                            >
                                Close
                            </CButton>

                            <CButton
                            type='submit' 
                            color='primary'
                            >
                                Update
                            </CButton>
                        </CForm>
                    </CCardBody>
                </CCard>

              {/* <CModal
                alignment='center'
                visible={Rvisible}
                onClose={() => {
                  setRVisible(false)
                }}
                aria-labelledby='ToggleBetweenModalsExample2'
              >
                <CModalHeader>
                  <CModalTitle id="ToggleBetweenModalsExample2">Reset Password</CModalTitle>
                </CModalHeader>

                <CModalBody>
                <CForm onClick={handleResetPassword}>
                    <CFormInput
                      type={Rvisible ? 'text' : 'password'}
                      label="New Password"
                      className="form-control"
                      id="recipient-password"
                      autoComplete="off"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <CFormInput
                      type={Rvisible ? 'text' : 'password'}
                      label="Confirm Password"
                      className="form-control"
                      id="recipient-confirm-password"
                      autoComplete="off"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </CForm>
                  <CModalFooter>
                    <CButton
                      type='button' 
                      color='secondary' 
                      onClick={() => {
                        setFVisible(true)
                        setRVisible(false)
                      }}
                    >
                      Close
                    </CButton>

                    <CButton
                      type='submit' 
                      color='primary'
                      onClick={() => {
                        setRVisible(false)
                      }}
                    >
                        Update
                    </CButton>
                  </CModalFooter>
                </CModalBody>
              </CModal> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Resetpassword
