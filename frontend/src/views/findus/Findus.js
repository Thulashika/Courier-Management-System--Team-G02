import React from 'react';
import { CContainer, CRow } from '@coreui/react';
import backgroundImage from '../../assets/images/background_1.jpg'; // Update with the correct path

const FindUs = () => {
   // Inline style for the background image
   const backgroundStyle = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover', // Ensure the image covers the entire section
      backgroundPosition: 'center', // Center the image
      padding: '20px', // Add padding for better spacing
      color: 'white', // Ensure text is readable on the background
   };

   const headerStyle = {
      marginBottom: '2rem',
      textAlign: 'center',
      color: 'black',
      fontSize: '3rem',
      fontFamily: 'Georgia, serif',
      fontWeight: 'bold',
   };

   const locationStyle = {
      background: 'transparent',
      border: 'none',
      boxShadow: 'none',
      marginBottom: '1rem',
      padding: '1rem',
   };

   const locationHeaderStyle = {
      marginTop: '0',
      color: '#003366', // Dark blue color
      fontSize: '1.5rem',
      textAlign: 'center', // Center align header
      fontFamily: 'Georgia, serif',
   };

   const locationParagraphStyle = {
      margin: '0',
      color: '#333333', // Dark gray color
      fontSize: '1.2rem',
      textAlign: 'center', // Center align text
      fontFamily: 'Open Sans, sans-serif',
   };

   return (
      <CContainer fluid style={backgroundStyle}>
         <CRow className="justify-content-center">
            <div style={headerStyle}>
               <h2>Find Us</h2>
            </div>
         </CRow>
         <CRow className="justify-content-center">
            <div style={locationStyle}>
               <h3 style={locationHeaderStyle}>Main Office</h3>
               <p style={locationParagraphStyle}>123 Main Street</p>
               <p style={locationParagraphStyle}>New York, NY 10001</p>
               <p style={locationParagraphStyle}>Phone: (123) 456-7890</p>
            </div>
            <div style={locationStyle}>
               <h3 style={locationHeaderStyle}>Branch Office</h3>
               <p style={locationParagraphStyle}>456 Branch Avenue</p>
               <p style={locationParagraphStyle}>Los Angeles, CA 90001</p>
               <p style={locationParagraphStyle}>Phone: (456) 789-0123</p>
            </div>
         </CRow>
      </CContainer>
   );
};

export default FindUs;
