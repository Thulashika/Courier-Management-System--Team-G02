 import React, { Component } from 'react';
 import { Link } from 'react-router-dom';
 import './Contactus.css';
 import { CCard, CCardBody, CCol, CForm, CFormInput, CFormLabel, CFormTextarea, CImage, CRow, CContainer } from '@coreui/react';
 import ContactUs_1 from '../../assets/images/ContactUs_1.jpg';

 class Contactus extends Component {
  state = {
      name: '',
      email: '',
       phone: '',
       message: ''
   };

   handleChange = (e) => {
       this.setState({
          [e.target.name]: e.target.value
      });
   }

    handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic (e.g., send data to backend)
       console.log('Form submitted:', this.state);
     // Clear form fields
      this.setState({
         name: '',
          email: '',
         phone: '',
        message: ''
       });
    }

   render() {
     return (
        <CContainer style={{ width: '80%', margin: '0 auto' }}>
            <CRow className='align-items-center'>
                <CCol xs={12} md={6}>
                  <CCard style={{ width: '100%', padding: '0.5rem', minHeight: '200px' }}>
                     <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}><strong>Contact Us</strong></h2>
                    <CCardBody style={{ padding: '0.5rem' }}>
                        <CForm className="row g-2" onSubmit={this.handleSubmit}>
                          <CRow className='mb-2'>
                              <CCol xs={12}>
                                  <CFormLabel style={{ marginBottom: '0.1rem', fontSize: '0.8rem' }}>
                                  Name:
                                 </CFormLabel>
                                 <CFormInput 
                                   type='text' 
                                    name="name" 
                                   value={this.state.name} 
                                    onChange={this.handleChange} 
                                    required 
                                    style={{ marginBottom: '0.3rem', fontSize: '0.8rem', padding: '0.25rem' }} 
                                />
                              </CCol>
                              <CCol xs={12}>
                                  <CFormLabel style={{ marginBottom: '0.1rem', fontSize: '0.8rem' }}>
                                     Email:
                                  </CFormLabel>
                                  <CFormInput 
                                     type='email' 
                                     name="email" 
                                     value={this.state.email} 
                                     onChange={this.handleChange} 
                                     required 
                                     style={{ marginBottom: '0.3rem', fontSize: '0.8rem', padding: '0.25rem' }} 
                                  />
                               </CCol>
                               <CCol xs={12}>
                                  <CFormLabel style={{ marginBottom: '0.1rem', fontSize: '0.8rem' }}>
                                     Phone Number:
                                </CFormLabel>                                  <CFormInput 
                                     type='tel' 
                                     name="phone" 
                                     value={this.state.phone} 
                                     onChange={this.handleChange} 
                                     style={{ marginBottom: '0.3rem', fontSize: '0.8rem', padding: '0.25rem' }} 
                                  />
                               </CCol>
                               <CCol xs={12}>
                                  <CFormLabel style={{ marginBottom: '0.1rem', fontSize: '0.8rem' }}>
                                     Message:
                                  </CFormLabel>
                                  <CFormTextarea
                                     name="message"
                                     value={this.state.message}
                                     onChange={this.handleChange}
                                     placeholder="Leave a comment here"
                                     id="floatingTextarea2"
                                     style={{ height: '50px', marginBottom: '0.3rem', fontSize: '0.8rem', padding: '0.25rem' }}
                                     required
                                  />
                               </CCol>
                              <CCol xs={12}>
                                <button type="submit" className="btn btn-primary mt-1" style={{ fontSize: '0.8rem', padding: '0.3rem 0.5rem' }}>Submit</button>
                               </CCol>
                           </CRow>
                        </CForm>
                    </CCardBody>
                   </CCard>
              </CCol>
        <CCol xs={12} md={6} className="d-flex align-items-center justify-content-center">
                  <CImage src={ContactUs_1} width={300} />
               </CCol>
             </CRow>
          </CContainer>
      );
   }
}

 export default Contactus;

