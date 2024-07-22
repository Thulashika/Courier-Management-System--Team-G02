import { cilBirthdayCake, cilLockLocked, cilPhone, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { 
    CButton, 
    CCard, 
    CCardBody, 
    CCol, 
    CContainer, 
    CForm, 
    CFormCheck, 
    CFormInput, 
    CInputGroup,
    CInputGroupText, 
    CRow 
} from '@coreui/react'
import axios from 'axios'
import React, { useState } from 'react'
import Icon from 'react-icons-kit'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { eye } from 'react-icons-kit/feather/eye'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

  const [user, setUser] = useState({
    fullName:'',
    password:'',
    contactNumber:'',
    email:'',
    gender:'',
    birthday:''
  })

  const [visible, setVisible] = useState(false); 
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

    if (!user.password || user.password.length < 4 || user.password.length > 10) {
        setError('Password must be between 4 and 10 characters')
        setIsValid(false)
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

    const validGender = ['MALE', 'FEMALE', 'OTHER'];

    if(!validGender.includes(user.gender)){
      setError('Invalid gender');
      setIsValid(false);
      return;
    }

    if(isValid) {
      axios('http://localhost:6431/profile', {
        data: user,
        method:'PUT'
      }).then(res => {
        if (res.data.statusCode === 201) {
          alert("Update profile successfully")
          navigate('/')
        } else {
          alert("Not update profile successfully")
        }
      }).catch(err => {
        if(err.response?.data?.statusCode === 500) {
          alert(err.response.data.statusMessage)
          return
        }
        alert("Update profile not successfully")
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
                <h1>Account Information</h1>

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
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    id='setPassword'
                    type={visible ? 'text' : 'password'}
                    placeholder="Set Password"
                    autoComplete="new-password"
                    // pattern='/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/'
                    onChange={(e) => setUser({...user, password:e.target.value})}
                    required
                    minLength={4}
                    maxLength={10}
                  />
                  <CInputGroupText>
                    <CButton onClick={() => setVisible(!visible)}>
                      {visible ? <Icon icon={eye} size={20} /> : <Icon icon={eyeOff} size={20} />} 
                    </CButton>
                  </CInputGroupText>
                </CInputGroup>
                {!isValid && error === 'Password must be between 4 and 10 characters' && <p>{error}</p>}
                
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilPhone} />
                  </CInputGroupText>
                  <CFormInput
                    id='Add Mobile'
                    type='text' 
                    placeholder="Add Mobile" 
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
                  <CInputGroupText as="label"><CIcon icon={cilUser} /></CInputGroupText>
                    <CFormCheck 
                        inline 
                        type="radio" 
                        name="Male" 
                        id="Male" 
                        label="Male" 
                        value='Male'
                        onChange={(e) => setUser({...user, gender:e.target.value})}
                    />
                    <CFormCheck 
                        inline 
                        type="radio" 
                        name="Female" 
                        id="Female" 
                        label="Female" 
                        value='Female'
                        onChange={(e) => setUser({...user, gender:e.target.value})}
                    />
                    <CFormCheck 
                        inline 
                        type="radio" 
                        name="Other" 
                        id="Other" 
                        label="Other" 
                        value='Other'
                        onChange={(e) => setUser({...user, gender:e.target.value})}
                    />
                </CInputGroup>
                {!isValid && error === 'Invalid gender' && <p>{error}</p>}

                <CInputGroup className="mb-3">
                  <CInputGroupText><CIcon icon={cilBirthdayCake}/></CInputGroupText>
                  <CFormInput 
                    id='Birthday'
                    type='date'
                    placeholder="Birthday" 
                    autoComplete="birthday"  
                    onChange={(e) => setUser({...user, birthday:e.target.value})}
                    required
                  />
                </CInputGroup>

                <div className="d-grid">
                  <CButton color="success" type='submit'>Update Account</CButton>
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

export default Profile
