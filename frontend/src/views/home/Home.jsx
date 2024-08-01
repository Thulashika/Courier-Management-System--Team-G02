// import React from 'react';
// import './Home.css'; 
// import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CFormLabel, CFormTextarea, CImage, CInputGroup, CInputGroupText, CRow } from '@coreui/react';
// import { Link } from 'react-router-dom';
// import CIcon from '@coreui/icons-react';
// import { cilLockLocked } from '@coreui/icons';
// import home from '../../assets/images/download.jpg'
// import contactUs from '../../assets/images/c1.png'
// import yoga from '../../assets/images/YT.png'

// const Home = () => {
   
//    const state = {
//       name: '',
//       email: '',
//       message: ''
//    };

//    const handleChange = (e) => {
//       this.setState({
//          [e.target.name]: e.target.value
//       });
//    }

//    const handleSubmit = (e) => {
//       e.preventDefault();
//       // Handle form submission logic (e.g., send data to backend)
//       console.log('Form submitted:', this.state);
//       // Clear form fields
//       this.setState({
//          name: '',
//          email: '',
//          phone: '',
//          message: ''
//       });
//    }

//    return (
//       // <div className="home-container">
//       //    {/* <img src={'/assets/images/homepage.jpg'} alt="Homepage" /> */}
//       //    <section className="hero-section">
//       //       <div className="hero-content">
//       //          <h1>Welcome to Our Courier Management System</h1>
//       //          <p>Efficient, reliable, and secure courier services at your doorstep.</p>
//       //          <button className="btn">Get Started</button>
//       //          <button className="btn">Pick-to-request</button>
              
//       //       </div>
//       //    </section>
//       //    <section className="features-section">
//       //       <div className="feature">
//                // <h2>Track Your Parcel</h2>
//                // <p>Real-time tracking of your parcels ensures you are always updated.</p>
//       //       </div>
//       //       <div className="feature">
//       //          <h2> Shipping</h2>
//       //          <p>Efficient shipping services , delivering your parcels on time.</p>
//       //       </div>
//       //       <div className="feature">
//       //          <h2>Secure Packaging</h2>
//       //          <p>Safe and secure packaging to protect your valuable items during transit.</p>
               
//       //       </div>
//       //    </section>
//       // </div>
      
//       <CContainer>
//          <CRow>
//             <CCol>
//                <h2>
//                   <strong>
//                      <CImage src={yoga} height={75} width={75}/>
//                      Yoga Transport
//                   </strong>
//                </h2>
//             </CCol>
//             <CCol>
//                <div className="d-grid gap-2 mx-auto d-md-flex justify-content-md-end">
//                   <CButton href='/login' className="me-md-2" color='dark' size='lg' shape="rounded-pill" >Login</CButton>
//                </div>
//             </CCol>
//          </CRow>
         
//          <CRow className="justify-content-center">
//           <CCol md={10}>
//             <CCard className="p-4">
//                <CRow>
//                   <CCol>
//                      <CCardBody>
//                         <h1>Welcome to Our Courier Management System</h1>
//                         <p>Efficient, reliable, and secure courier services at your doorstep.</p>
//                      </CCardBody>
//                   </CCol>
//                   <CCol>
//                      <div className="text-center">
//                         <CImage rounded src={home} width={200} height={200} />
//                      </div>
//                   </CCol>
//                </CRow>
//             </CCard>

//             <CCard className="p-4 align-items-center">
//                <CRow><strong>SERVICES</strong></CRow>
//                <CRow><h4>Our services for you</h4></CRow>
//                <CRow className='mb-3'>
//                <CCol md={4}>
//                   <h2>Track Your Parcel</h2>
//                   <p>Real-time tracking of your parcels ensures you are always updated.</p>
//                </CCol>
//                <CCol md={4}>
//                   <h2> Shipping</h2>
//                   <p>Efficient shipping services , delivering your parcels on time.</p>
//                </CCol>
//                <CCol md={4}>
//                   <h2>Secure Packaging</h2>
//                   <p>Safe and secure packaging to protect your valuable items during transit.</p>
//                </CCol>
//                </CRow>
//             </CCard>

//             <CCard className="p-4">
//                <CRow className='mb-3'>
//                   <CCol className='mb-3'>
//                      <div className="text-center">
//                         <CImage rounded src={contactUs} width={200} height={200} />
//                      </div>
//                      <div className="text-center">
//                         <p>
//                            <h4>REQUEST A CALLBACK.</h4>
//                            <b>We will Contact in the shortest time.</b>
//                         </p>
//                      </div>
//                   </CCol>
//                   <CCol>
//                   {/* <form onSubmit={handleSubmit}>
//                      <div className="form-group">
//                         <label>
//                            Name
//                            <input type="text" name="name"  required />
//                         </label>
//                      </div>
//                      <div className="form-group">
//                         <label>
//                            Email
//                            <input type="email" name="email" required />
//                         </label>
//                      </div>
//                      <div className="form-group">
//                         <label>
//                            Phone Number
//                            <input type="tel" name="phone" />
//                         </label>
//                      </div>
//                      <div className="form-group">
//                         <label>
//                            Message
//                            <textarea name="message" rows="4" required></textarea>
//                         </label>
//                      </div>
//                      <button type="submit">Submit</button>
//                      <div className="feature">

//                         <p>
//                            <h4>REQUEST A CALLBACK.</h4>
//                            We will Contact in the shortest time.
//                         </p>

//                         <p>Do not have an account? <Link to="/user">Registration</Link></p>
//                      </div>
//                   </form> */}
//                   <CRow><h3>Contact Us:</h3></CRow>
//                   <CForm onSubmit={handleSubmit}>
//                      <div className="form-group">
//                         <CFormLabel>
//                            Name
//                            <CFormInput type="text" name="name"  required />
//                         </CFormLabel>
//                      </div>
//                      <div className="form-group">
//                         <CFormLabel>
//                            Email
//                            <CFormInput type="email" name="email" required />
//                         </CFormLabel>
//                      </div>
//                      <div className="form-group">
//                         <CFormLabel>
//                            Phone Number
//                            <CFormInput type="tel" name="phone" />
//                         </CFormLabel>
//                      </div>
//                      <div className="form-group">
//                         <CFormLabel>
//                            Message
//                            <CFormTextarea name="message" rows="4" required></CFormTextarea>
//                         </CFormLabel>
//                      </div>
//                      <CButton type="submit" color='primary'>Submit</CButton>
//                      <p>Do not have an account? <Link to="/user">Registration</Link></p>
//                   </CForm>
//                   </CCol>
//                </CRow>
//             </CCard>
//           </CCol>
//         </CRow>
//       </CContainer>
//    );
// };

// export default Home;

// import React from 'react';
// import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CFormLabel, CFormTextarea, CImage, CRow } from '@coreui/react';
// import { Link } from 'react-router-dom';
// //import home from '../../assets/images/download.jpg';
// import Track from '../../assets/images/parcel.jpg';
// import Shipping from '../../assets/images/service_17.jpg';
// import Packing from '../../assets/images/service_20.jpg';
// import contactUs from '../../assets/images/c1.png';
// import yoga from '../../assets/images/YT.png';
// import service from '../../assets/images/service_4.jpg'; // Import the background image
// import serviceBackground from '../../assets/images/Company.jpg'; // Import the new background image

// const Home = () => {
//    const state = {
//       name: '',
//       email: '',
//       message: ''
//    };

//    const handleChange = (e) => {
//       this.setState({
//          [e.target.name]: e.target.value
//       });
//    };

//    const handleSubmit = (e) => {
//       e.preventDefault();
//       // Handle form submission logic (e.g., send data to backend)
//       console.log('Form submitted:', this.state);
//       // Clear form fields
//       this.setState({
//          name: '',
//          email: '',
//          phone: '',
//          message: ''
//       });
//    };

//    // Inline style for the background image
//    const backgroundStyle = {
//       backgroundImage: `url(${service})`,
      
//       backgroundSize: 'cover', // Ensure the image covers the entire section
//       backgroundPosition: 'center', // Center the image
//       padding: '20px', // Add padding for better spacing
//       color: 'white' // Ensure text is readable on the background
//    };

//     // Inline style for the service background image
//     const serviceBackgroundStyle = {
//       backgroundImage: `url(${serviceBakground})`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       padding: '20px',
//       color: 'white'
//    };
//    return (
//       <CContainer>
//          <CRow>
//             <CCol>
//                <h2>
//                   <strong>
//                      <CImage src={yoga} height={75} width={75}/>
//                      Yoga Transport
//                   </strong>
//                </h2>
//             </CCol>
//             <CCol>
//                <div className="d-grid gap-2 mx-auto d-md-flex justify-content-md-end">
//                   <CButton href='/login' className="me-md-2" color='dark' size='lg' shape="rounded-pill">Login</CButton>
//                </div>
//             </CCol>
//          </CRow>
         
//          <CRow className="justify-content-center">
//             <CCol md={10}>
//                <CCard className="p-4" style={backgroundStyle}>
//                   <CRow>
//                      <CCol>
//                         <CCardBody>
//                            <h1>Welcome to Our Courier Service</h1>
//                            <p>Efficient, reliable, and secure courier services at your doorstep.</p>
//                         </CCardBody>
//                      </CCol>
//                      {/* <CCol>
//                         <div className="text-center">
//                            <CImage rounded src={home} width={200} height={200} />
//                         </div>
//                      </CCol> */}
//                   </CRow>
//                </CCard>

//                <CCard className="p-4 align-items-center" style={serviceBackgroundStyle}>
               
               
//                   <CRow><strong>SERVICES</strong></CRow>
//                   <CRow><h4>Our services for you</h4></CRow>
//                   <CRow className='mb-3'>
//                      <CCol md={4}>
//                         <h2>Track Your Parcel</h2>
//                         <p>Real-time tracking of your parcels ensures you are always updated.</p>
//                          { <CCol>
//                         <div className="text-center">
//                            <CImage rounded src={Track} width={300} height={200} />
//                         </div>
//                      </CCol> }
//                      </CCol>
//                      <CCol md={4}>
//                         <h2> Shipping</h2>
//                         <p>Efficient shipping services , delivering your parcels on time.</p>
//                          {<CCol>
//                         <div className="text-center">
//                            <CImage rounded src={Shipping} width={300} height={200} />
//                         </div>
//                      </CCol> }
//                      </CCol>
//                      <CCol md={4}>
//                         <h2>Secure Packaging</h2>
//                         <p>Safe and secure packaging to protect your valuable items during transit.</p>
//                          {<CCol>
//                         <div className="text-center">
//                            <CImage rounded src={Packing} width={300} height={200} />
//                         </div>
//                      </CCol> }
//                      </CCol>
//                   </CRow>
//                </CCard>

//                <CCard className="p-4">
//                   <CRow className='mb-3'>
//                      <CCol className='mb-3'>
//                         <div className="text-center">
//                            <CImage rounded src={contactUs} width={200} height={200} />
//                         </div>
//                         <div className="text-center">
//                            <p>
//                               <h4>REQUEST A CALLBACK.</h4>
//                               <b>We will Contact in the shortest time.</b>
//                            </p>
//                         </div>
//                      </CCol>
//                      <CCol>
//                         <CRow><h3>Contact Us:</h3></CRow>
//                         <CForm onSubmit={handleSubmit}>
//                            <div className="form-group">
//                               <CFormLabel>
//                                  Name
//                                  <CFormInput type="text" name="name"  required />
//                               </CFormLabel>
//                            </div>
//                            <div className="form-group">
//                               <CFormLabel>
//                                  Email
//                                  <CFormInput type="email" name="email" required />
//                               </CFormLabel>
//                            </div>
//                            <div className="form-group">
//                               <CFormLabel>
//                                  Phone Number
//                                  <CFormInput type="tel" name="phone" />
//                               </CFormLabel>
//                            </div>
//                            <div className="form-group">
//                               <CFormLabel>
//                                  Message
//                                  <CFormTextarea name="message" rows="4" required></CFormTextarea>
//                               </CFormLabel>
//                            </div>
//                            <CButton type="submit" color='primary'>Submit</CButton>
//                            <p>Do not have an account? <Link to="/user">Registration</Link></p>
//                         </CForm>
//                      </CCol>
//                   </CRow>
//                </CCard>
//             </CCol>
//          </CRow>
//       </CContainer>
//    );
// };

// export default Home;

import React, { useState } from 'react'; // Added useState import for state management
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CFormLabel, CFormTextarea, CImage, CRow } from '@coreui/react';
import { Link } from 'react-router-dom';
//import home from '../../assets/images/download.jpg';
import Track from '../../assets/images/parcel.jpg';
import Shipping from '../../assets/images/service_17.jpg';
import Packing from '../../assets/images/service_20.jpg';
import contactUs from '../../assets/images/c1.png';
import yoga from '../../assets/images/YT.png';
import service from '../../assets/images/CourierHome_3.jpg'; // Import the background image
import serviceBackground from '../../assets/images/Company.png'; // Correct import path for the new background image
import ServiceBackground from '../../assets/images/TB.jpg'; // Correct import path for the new background image


const Home = () => {
   const [state, setState] = useState({
      name: '',
      email: '',
      phone: '',
      message: ''
   });

   const handleChange = (e) => {
      setState({
         ...state,
         [e.target.name]: e.target.value
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic (e.g., send data to backend)
      console.log('Form submitted:', state);
      // Clear form fields
      setState({
         name: '',
         email: '',
         phone: '',
         message: ''
      });
   };

   // Inline style for the background image
   const backgroundStyle = {
      backgroundImage: `url(${service})`,
      backgroundSize: 'cover', // Ensure the image covers the entire section
      backgroundPosition: 'center', // Center the image
      padding: '20px', // Add padding for better spacing
      color: 'white' // Ensure text is readable on the background
   };

   // Inline style for the service background image
   const serviceBackgroundStyle = {
      backgroundImage: `url(${serviceBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '20px',
      color: 'white'
   };
   const ServiceBackgroundStyle = {
      backgroundImage: `url(${ServiceBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '10px',
      color: 'white'
   };


   return (
      <CContainer>
         <CRow>
            <CCol>
               <h2>
                  <strong>
                     <CImage src={yoga} height={75} width={75}/>
                     Yoga Transport
                  </strong>
               </h2>
            </CCol>
            <CCol>
               <div className="d-grid gap-2 mx-auto d-md-flex justify-content-md-end">
                  <CButton href='/login' className="me-md-2" color='dark' size='lg' shape="rounded-pill">Login</CButton>
               </div>
            </CCol>
         </CRow>
         
         <CRow className="justify-content-center">
            <CCol md={10}>
               <CCard className="p-4" style={backgroundStyle}>
                  <CRow>
                     <CCol>
                        <CCardBody>
                           <h1>Welcome to Our Courier Service</h1>
                           <p>Efficient, reliable, and secure courier services at your doorstep.</p>
                        </CCardBody>
                     </CCol>
                  </CRow>
               </CCard>

               <CCard className="p-4 align-items-center" style={serviceBackgroundStyle}>
                  <CRow><strong>SERVICES</strong></CRow>
                  <CRow><h4>Our services for you</h4></CRow>
                  <CRow className='mb-3'>
                     <CCol md={4}>
                        <h2>Track Your Parcel</h2>
                        <p>Real-time tracking of your parcels ensures you are always updated.</p>
                        <div className="text-center">
                           <CImage rounded src={Track} width={300} height={200} />
                        </div>
                     </CCol>
                     <CCol md={4}>
                        <h2>Shipping</h2>
                        <p>Efficient shipping services, delivering your parcels on time.</p>
                        <div className="text-center">
                           <CImage rounded src={Shipping} width={300} height={200} />
                        </div>
                     </CCol>
                     <CCol md={4}>
                        <h2>Secure Packaging</h2>
                        <p>Safe and secure packaging to protect your valuable items during transit.</p>
                        <div className="text-center">
                           <CImage rounded src={Packing} width={300} height={200} />
                        </div>
                     </CCol>
                  </CRow>
               </CCard>

               <CCard className="p-4 align-items-center" style={ServiceBackgroundStyle}>
                  <CRow className='mb-3'>
                     <CCol className='mb-3'>
                        <div className="text-center">
                           <CImage rounded src={contactUs} width={300} height={200} />
                        </div>
                        <div className="text-center">
                           <p>
                              <h4>REQUEST A CALLBACK.</h4>
                              <b>We will Contact in the shortest time.</b>
                           </p>
                        </div>
                     </CCol>
                     <CCol>
                        <CRow><h3>Contact Us:</h3></CRow>
                        <CForm onSubmit={handleSubmit}>
                           <div className="form-group">
                              <CFormLabel>
                                 Name
                                 <CFormInput type="text" name="name" value={state.name} onChange={handleChange} required />
                              </CFormLabel>
                           </div>
                           <div className="form-group">
                              <CFormLabel>
                                 Email
                                 <CFormInput type="email" name="email" value={state.email} onChange={handleChange} required />
                              </CFormLabel>
                           </div>
                           <div className="form-group">
                              <CFormLabel>
                                 Phone Number
                                 <CFormInput type="tel" name="phone" value={state.phone} onChange={handleChange} />
                              </CFormLabel>
                           </div>
                           <div className="form-group">
                              <CFormLabel>
                                 Message
                                 <CFormTextarea name="message" rows="4" value={state.message} onChange={handleChange} required></CFormTextarea>
                              </CFormLabel>
                           </div>
                           <CButton type="submit" color='primary'>Submit</CButton>
                           <p>Do not have an account? <Link to="/user">Registration</Link></p>
                        </CForm>
                     </CCol>
                  </CRow>
               </CCard>
            </CCol>
         </CRow>
      </CContainer>
   );
};

export default Home;
