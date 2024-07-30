
import React from 'react';
import { CContainer, CRow, CCol, CCard, CCardBody } from '@coreui/react';
import './Findus.css'; // Import CSS for additional styling

const Findus = () => {
   return (
      <CContainer className="find-us-container">
         <div className="find-us-header">
            <h2>Find Us</h2>
         </div>
         <CRow>
            <CCol xs={12} md={6}>
               <div className="location-card">
                  <div className="location">
                     <h3>Main Office</h3>
                     <p>123 Main Street</p>
                     <p>New York, NY 10001</p>
                     <p>Phone: (123) 456-7890</p>
                  </div>
               </div>
            </CCol>
            <CCol xs={12} md={6}>
               <div className="location-card">
                  <div className="location">
                     <h3>Branch Office</h3>
                     <p>456 Branch Avenue</p>
                     <p>Los Angeles, CA 90001</p>
                     <p>Phone: (456) 789-0123</p>
                  </div>
               </div>
            </CCol>
         </CRow>
      </CContainer>
   );
};

export default Findus;
