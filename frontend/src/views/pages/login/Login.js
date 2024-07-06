import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'

function useQuery() {
  const {search} = useLocation()
  return React.useMemo (() => new URLSearchParams(search), [search])
}

const Login = () => {

  const [user, setUser] = useState({
    email:'',
    password:''
  })

  const query = useQuery()


  const navigate = useNavigate();

  const handleSubmit = (e)=> {
    e.preventDefault()

    axios(`http://localhost:6431/userLogin/${query.get('id')}`, {
      data: user,
      method: 'POST'
    }).then(res => {
      if(res.ok){
        console.log(res.json)
        navigate('/')
      }
      else {
        console.error(res.json.message)
        // alert("Not Login successfully")
      }
    }).catch(err => {
      alert("Not Login successfully")
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
                        type='email' 
                        placeholder="Email" 
                        autoComplete="email" 
                        required
                        onChange={(e) => setUser({...user, email:e.target.value})}
                        />
                      {/* <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput type='text' placeholder="User name" autoComplete="userName" required/> */}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        required
                        onChange={(e) => setUser({...user, password:e.target.value})}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type='submit' color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
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

export default Login
