// import { CButton, CCard, CCardHeader, CCol, CForm, CFormInput, CRow } from '@coreui/react'
// import axios from 'axios'
// import React, { useState } from 'react'

// function ForgotPassword() {

//     const [email, setEmail] = useState('')


//     const handleSubmit = (e) => {
//         e.preventDefault()

//         //send the email to the backend to initiate the password reset process
//         try {
//             axios('http://localhost:6431', {
//                 method:'POST',
//                 headers:{
//                     "Content-Type":"application/json",
//                 },
//                 data:JSON.stringify({email})
//             }).then(res => {
//                 if(res.ok) {
//                     alert('Password reset email sent!')
//                 } else {
//                     alert('Error sending password reset email')
//                 }
//             })
//         }catch(error) {
//             console.error('Error:', error)
//             alert('Error sending password reset email')
//         }
//     }

//   return (
//     <CRow className='bg-body-tertiary min-vh-100 d-flex flex-row align-items-center justify-content-center'>
//         <CCard style={{ width: '25rem', height: '15rem' }} >
//             <CRow className='mb-3'>
//                 <CCardHeader>
//                     <strong>Forgot Password</strong>
//                 </CCardHeader>
//             </CRow>
//             <CRow className='mb-3'>
//                 <CCol xs={6}>
//                     <CForm className="row g-3" onSubmit={handleSubmit}>
//                         <CFormInput
//                             type="email"
//                             value={email}
//                             className='form-control'
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder="Enter your email"
//                             required
//                         />
//                         <CButton type="submit" color="primary" className="px-4">Send Reset Link</CButton>
//                     </CForm>
//                 </CCol>
//             </CRow>
//         </CCard>
//     </CRow>
//   )
// }

// export default ForgotPassword