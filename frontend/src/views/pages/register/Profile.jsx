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
import React, { useContext, useEffect, useState } from 'react'
import Icon from 'react-icons-kit'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { eye } from 'react-icons-kit/feather/eye'
import { useNavigate } from 'react-router-dom'
import profile from '../../../assets/images/profile.png'
import { AuthContext } from './AuthProvider'

const Profile = () => {

  const [user, setUser] = useState({
    image:null,
    fullName:'',
    password:'',
    contactNumber:'',
    gender:'',
    birthday:''
  })

  const [visible, setVisible] = useState(false); 
  const [error, setError] = useState('')
  const [isValid, setIsValid] = useState(true);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate()

  const { userDetails } = useContext(AuthContext);

  useEffect(() => {
    axios(`http://localhost:6431/profile/${userDetails.id}`, {
      method:'GET'
    }).then(res => {
      setUser(res.data.profile)
      setPreview(res.data.profile.image);
    }).catch(err => {
      // alert('There was an error fetching the user profile!')
      console.log(err)
    })
  }, [])

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

    // if(user.password) {
    //   if (user.password.length < 4 || user.password.length > 10) {
    //     setError('Password must be between 4 and 10 characters')
    //     setIsValid(false)
    //     return;
    //   }
    // }
   
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

      const formData = new FormData();
      formData.append('image', user.image)
      formData.append('fullName', user.fullName)
      formData.append('password', user.password)
      formData.append('contactNumber', user.contactNumber)
      formData.append('birthday', user.birthday)
      formData.append('gender', user.gender)

      axios(`http://localhost:6431/profile/${userDetails.id}`, {
        data: formData,
        method:'PUT'
      }).then(res => {
        if (res.data.statusCode === 201) {
          alert("Profile Updated successfully")
        } else {
          alert("Not profile updated successfully")
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setUser({...user, image: file});
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    } else {
        setUser({...user, image: null});
        setPreview(null);
    }
};

  const handleDivClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = handleImageChange;
    input.click();
};

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={9} lg={7} xl={6}>
          <CCard className="mx-4">
            <CCardBody className="p-4">
              <CForm onSubmit={handleSubmit}>
                <h1>Account Information</h1>
                <div
                    onClick={handleDivClick}
                    style={{
                        display: 'inline-block',
                        padding: '10px',
                        cursor: 'pointer',
                    }}
                >
                    {preview ? (
                        <img src={preview}
                            alt="Image Preview"
                            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                    ) : (
                        <img
                            src={profile} // replace with the URL of your default profile image
                            alt="Profile"
                            height={100}
                            width={100}
                        />
                    )}
                </div>
               
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
                    defaultValue={user.fullName}
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
                    defaultValue={user.contactNumber}
                  />
                </CInputGroup>
                {!isValid && error === 'Contact number must be exactly 10 digits' && <p>{error}</p>}
                {!isValid && error === 'Contact number is not in the correct format' && <p>{error}</p>}

                <CInputGroup className="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput 
                    id='Email'
                    type='email'
                    onChange={(e) => setUser({...user, email:e.target.value})}
                    readOnly
                    defaultValue={user.email}
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
                        value='MALE'
                        checked={user.gender === 'MALE'}
                        onChange={(e) => setUser({...user, gender:e.target.value})}
                    />
                    <CFormCheck 
                        inline 
                        type="radio" 
                        name="Female" 
                        id="Female" 
                        label="Female" 
                        value='FEMALE'
                        checked={user.gender === 'FEMALE'}
                        onChange={(e) => setUser({...user, gender:e.target.value})}
                    />
                    <CFormCheck 
                        inline 
                        type="radio" 
                        name="Other" 
                        id="Other" 
                        label="Other" 
                        value='OTHER'
                        checked={user.gender === 'OTHER'}
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
