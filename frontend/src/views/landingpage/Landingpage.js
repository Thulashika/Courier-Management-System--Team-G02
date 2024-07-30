// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Landingpage.css';
// function Land() {
//   return (
//     <div>
//         <div className="landing-container">
//     <h1>Courier Management System</h1>
//     <div className="buttons">
//       <Link to="/home" className="btn">Courier Management System</Link>
//       {/* <Link to="/registion" className="btn">User</Link> */}
//       <Link to="/login" className="btn">Login</Link>
//     </div>
//   </div>
//   </div>
//   )
// }

// export default Land

import { 
  CButton,
  CCard, 
  CCardImage, 
  CCardImageOverlay, 
  CCardText, 
  CCardTitle, 
  CRow} from '@coreui/react'
import React from 'react'
import CourierServicesImg from '../../assets/images/delivery-courier.jpg'

function Landingpage() {
  return (
    <CCard className="mb-3 bg-dark text-black">
      <CCardImage 
        src={CourierServicesImg} 
        style={{width:'100%', 
                height: '50%', 
                background:'linear-gradient(rgba(4,0,50,0.5), rgba(4,0,50,0.3))',
                backgroundSize:'hover', 
                backgroundPosition:'center'
              }}
      />
      <CCardImageOverlay>
        <CRow>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <CButton href='/login' className='me-md-2' color='warning'  size='lg' shape="rounded-pill" >Login</CButton>
          </div>
        </CRow>

        <CRow className="mb-4 ">
          <CCardTitle className="text-center">
            <strong className="d-grid gap-2 d-md-flex justify-content-md-start">Yoga Transport</strong>
          </CCardTitle>
        </CRow>
        
        <CRow className="mb-4">
          <CCardText className="text-center">
          <CRow className="mb-2"/>
            <h1 className="d-grid gap-2 d-md-flex justify-content-center">Courier Service in Srilanka</h1>
          </CCardText>
        </CRow>      
      </CCardImageOverlay>
    </CCard>
  )
}

export default Landingpage