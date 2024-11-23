// import React, { useState } from 'react'; // Import for state management
// import {
//   CButton, CCard, CCardBody, CCol, CContainer, CForm,
//   CFormInput, CFormLabel, CFormTextarea, CImage, CRow
// } from '@coreui/react';
// import { Link } from 'react-router-dom';
// import Track from '../../assets/images/parcel.jpg';
// import Shipping from '../../assets/images/service_17.jpg';
// import Packing from '../../assets/images/service_20.jpg';
// import contactUs from '../../assets/images/c1.png';
// import yoga from '../../assets/images/YT.png';
// import service from '../../assets/images/CourierHome_3.jpg';
// import serviceBackground from '../../assets/images/Company.png';
// import ServiceBackground from '../../assets/images/TB.jpg';

// const Home = () => {
//   const [state, setState] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     message: ''
//   });

//   // Handle input change
//   const handleChange = (e) => {
//     setState({
//       ...state,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', state);
//     // Reset form fields
//     setState({
//       name: '',
//       email: '',
//       phone: '',
//       message: ''
//     });
//   };

//   // Styles for background images and elements
//   const backgroundStyle = {
//     backgroundImage: `url(${service})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     padding: '20px',
//     color: 'white'
//   };

//   const serviceBackgroundStyle = {
//     backgroundImage: `url(${serviceBackground})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     padding: '20px',
//     color: 'white'
//   };

//   const ServiceBackgroundStyle = {
//     backgroundImage: `url(${ServiceBackground})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     padding: '10px',
//     color: 'white'
//   };

//   return (
//     <CContainer>
//       <CRow>
//         <CCol>
//           <h2>
//             <strong>
//               <CImage src={yoga} height={75} width={75} alt="Yoga Transport Logo" />
//               Yoga Transport
//             </strong>
//           </h2>
//         </CCol>
//         <CCol>
//           <div className="d-grid gap-2 mx-auto d-md-flex justify-content-md-end">
//             <CButton href='/login' className="me-md-2" color='dark' size='lg' shape="rounded-pill">Login</CButton>
//           </div>
//         </CCol>
//       </CRow>

//       <CRow className="justify-content-center">
//         <CCol md={10}>
//           {/* Welcome Section */}
//           <CCard className="p-4" style={backgroundStyle}>
//             <CRow>
//               <CCol>
//                 <CCardBody>
//                   <h1>Welcome to Our Courier Service</h1>
//                   <p>Efficient, reliable, and secure courier services at your doorstep.</p>
//                 </CCardBody>
//               </CCol>
//             </CRow>
//           </CCard>

//           {/* Services Section */}
//           <CCard className="p-4 align-items-center" style={serviceBackgroundStyle}>
//             <CRow><strong>SERVICES</strong></CRow>
//             <CRow><h4>Our services for you</h4></CRow>
//             <CRow className='mb-3'>
//               <CCol md={4}>
//                 <h2>Track Your Parcel</h2>
//                 <p>Real-time tracking of your parcels ensures you are always updated.</p>
//                 <div className="text-center">
//                   <CImage rounded src={Track} width={300} height={200} alt="Track Your Parcel" />
//                 </div>
//               </CCol>
//               <CCol md={4}>
//                 <h2>Shipping</h2>
//                 <p>Efficient shipping services, delivering your parcels on time.</p>
//                 <div className="text-center">
//                   <CImage rounded src={Shipping} width={300} height={200} alt="Shipping Service" />
//                 </div>
//               </CCol>
//               <CCol md={4}>
//                 <h2>Secure Packaging</h2>
//                 <p>Safe and secure packaging to protect your valuable items during transit.</p>
//                 <div className="text-center">
//                   <CImage rounded src={Packing} width={300} height={200} alt="Secure Packaging" />
//                 </div>
//               </CCol>
//             </CRow>
//           </CCard>

//           {/* Contact Us Section */}
//           <CCard className="p-4 align-items-center" style={ServiceBackgroundStyle}>
//             <CRow className='mb-3'>
//               <CCol className='mb-3'>
//                 <div className="text-center">
//                   <CImage rounded src={contactUs} width={300} height={200} alt="Contact Us" />
//                 </div>
//                 <div className="text-center">
//                   <p>
//                     <h4>REQUEST A CALLBACK.</h4>
//                     <b>We will contact you in the shortest time.</b>
//                   </p>
//                 </div>
//               </CCol>
//               <CCol>
//                 <CRow><h3>Contact Us:</h3></CRow>
//                 <CForm onSubmit={handleSubmit}>
//                   <div className="form-group">
//                     <CFormLabel>
//                       Name
//                       <CFormInput
//                         type="text"
//                         name="name"
//                         value={state.name}
//                         onChange={handleChange}
//                         required
//                       />
//                     </CFormLabel>
//                   </div>
//                   <div className="form-group">
//                     <CFormLabel>
//                       Email
//                       <CFormInput
//                         type="email"
//                         name="email"
//                         value={state.email}
//                         onChange={handleChange}
//                         required
//                       />
//                     </CFormLabel>
//                   </div>
//                   <div className="form-group">
//                     <CFormLabel>
//                       Phone Number
//                       <CFormInput
//                         type="tel"
//                         name="phone"
//                         value={state.phone}
//                         onChange={handleChange}
//                       />
//                     </CFormLabel>
//                   </div>
//                   <div className="form-group">
//                     <CFormLabel>
//                       Message
//                       <CFormTextarea
//                         name="message"
//                         rows="4"
//                         value={state.message}
//                         onChange={handleChange}
//                         required
//                       />
//                     </CFormLabel>
//                   </div>
//                   <CButton type="submit" color='primary'>Submit</CButton>
//                   <p>Don&apos;t have an account? <Link to="/user">Register here</Link></p>
//                 </CForm>
//               </CCol>
//             </CRow>
//           </CCard>
//         </CCol>
//       </CRow>
//     </CContainer>
//   );
// };

// export default Home;
